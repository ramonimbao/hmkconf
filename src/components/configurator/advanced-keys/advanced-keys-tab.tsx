"use client"

import { useGetKeymapWithAKC } from "@/api/use-get-keymap-with-akc"
import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { AKC_TYPE_TO_METADATA } from "@/constants/devices"
import { DeviceAKC, DeviceAKCType } from "@/types/devices"
import { Toggle } from "@radix-ui/react-toggle"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"
import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
  KeyboardEditorSkeleton,
} from "../common/keyboard-editor"
import { KeycodeButton } from "../common/keycode-button"
import { LayerSelector } from "../common/layer-selector"
import { AdvancedKeysCreate } from "./advanced-keys-create"
import { AdvancedKeysMenu } from "./advanced-keys-menu"
import { Loader } from "./loader"

type AdvancedKeys = {
  keymap: number[][]
  normalKeymap: number[][]
  akc: DeviceAKC[]
  akcIndices: (number | null)[][]
  newAKCType: DeviceAKCType
  newAKCKeys: [number | null, number | null]
  newAKCKeysIndex: number | null
  setNewAKCType: Dispatch<SetStateAction<DeviceAKCType>>
  setNewAKCKeys: Dispatch<SetStateAction<[number | null, number | null]>>
  setNewAKCKeysIndex: Dispatch<SetStateAction<number | null>>
}

const AdvancedKeysContext = createContext<AdvancedKeys>({} as AdvancedKeys)

export const useAdvancedKeys = () => useContext(AdvancedKeysContext)

export function AdvancedKeysTab() {
  const {
    profileNum,
    advancedKeys: { layer, akcIndex, setLayer, setAKCIndex },
  } = useConfigurator()
  const { isSuccess, keymap, normalKeymap, akc, akcIndices } =
    useGetKeymapWithAKC(profileNum)
  const { mutate: setAKC } = useSetAKC(profileNum)

  const [newAKCType, setNewAKCType] = useState(DeviceAKCType.AKC_NONE)
  const [newAKCKeys, setNewAKCKeys] = useState<[number | null, number | null]>([
    null,
    null,
  ])
  const [newAKCKeysIndex, setNewAKCKeysIndex] = useState<number | null>(null)

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <LayerSelector
            disabled={newAKCType !== DeviceAKCType.AKC_NONE}
            layer={layer}
            setLayer={setLayer}
          />
        </KeyboardEditorHeader>
        {!isSuccess ? (
          <KeyboardEditorSkeleton />
        ) : newAKCType === DeviceAKCType.AKC_NONE ? (
          <ToggleGroup
            type="single"
            value={akcIndex === null ? "" : akcIndex.toString()}
            onValueChange={(value) =>
              setAKCIndex(value === "" ? null : parseInt(value))
            }
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem
                  disabled={akcIndices[layer][key] === null}
                  value={
                    akcIndices[layer][key] === null
                      ? ""
                      : akcIndices[layer][key].toString()
                  }
                  onContextMenu={(e) => {
                    e.preventDefault()
                    const akcIndex = akcIndices[layer][key]
                    if (akcIndex !== null) {
                      setAKC(
                        produce(akc, (draft) =>
                          draft.filter((_, i) => i !== akcIndex),
                        ),
                      )
                      setAKCIndex(null)
                    }
                  }}
                  asChild
                >
                  <KeycodeButton
                    keycode={keymap[layer][key]}
                    className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  />
                </ToggleGroupItem>
              )}
            />
          </ToggleGroup>
        ) : (
          <KeyboardEditorKeyboard
            elt={(key) => (
              <Toggle
                disabled={
                  akcIndices[layer][key] !== null ||
                  (newAKCKeys.filter((key) => key !== null).length ===
                    AKC_TYPE_TO_METADATA[newAKCType].numKeys &&
                    !newAKCKeys.includes(key))
                }
                pressed={newAKCKeys.includes(key)}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    if (newAKCKeysIndex === null) {
                      return
                    }
                    const updatedKeys = produce(newAKCKeys, (draft) => {
                      draft[newAKCKeysIndex] = key
                    })
                    const updatedIndex = updatedKeys.indexOf(null)
                    setNewAKCKeys(updatedKeys)
                    setNewAKCKeysIndex(
                      updatedIndex === -1 ? null : updatedIndex,
                    )
                  } else {
                    const index = newAKCKeys.indexOf(key)
                    if (index !== -1) {
                      setNewAKCKeys(
                        produce(newAKCKeys, (draft) => {
                          draft[index] = null
                        }),
                      )
                      setNewAKCKeysIndex(index)
                    }
                  }
                }}
                asChild
              >
                <KeycodeButton
                  keycode={keymap[layer][key]}
                  className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                />
              </Toggle>
            )}
          />
        )}
      </KeyboardEditorLayout>
      {isSuccess ? (
        akcIndex === null ? (
          <AdvancedKeysContext.Provider
            value={{
              keymap,
              normalKeymap,
              akc,
              akcIndices,
              newAKCType,
              newAKCKeys,
              newAKCKeysIndex,
              setNewAKCType,
              setNewAKCKeys,
              setNewAKCKeysIndex,
            }}
          >
            {newAKCType === DeviceAKCType.AKC_NONE ? (
              <AdvancedKeysMenu />
            ) : (
              <AdvancedKeysCreate />
            )}
          </AdvancedKeysContext.Provider>
        ) : (
          <div></div>
        )
      ) : (
        <Loader />
      )}
    </KeyboardEditor>
  )
}
