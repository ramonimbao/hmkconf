/*
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

"use client"

import { useGetKeymapWithAdvancedKeys } from "@/api/use-get-keymap-with-advanced-keys"
import { useSetAdvancedKeys } from "@/api/use-set-advanced-keys"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { AK_TYPE_TO_METADATA } from "@/constants/devices"
import { DeviceAdvancedKey, DeviceAKType } from "@/types/devices"
import { Toggle } from "@radix-ui/react-toggle"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"
import { createContext, Dispatch, useContext, useState } from "react"
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
import { AdvancedKeysEditor } from "./advanced-keys-editor"
import { AdvancedKeysMenu } from "./advanced-keys-menu"
import { Loader } from "./loader"

type AdvancedKeys = {
  keymap: number[][]
  normalKeymap: number[][]
  advancedKeys: DeviceAdvancedKey[]
  akIndices: (number | null)[][]
  newAKType: DeviceAKType
  newAKKeys: [number | null, number | null]
  newAKKeysIndex: number | null
  setNewAKType: Dispatch<DeviceAKType>
  setNewAKKeys: Dispatch<[number | null, number | null]>
  setNewAKKeysIndex: Dispatch<number | null>
}

const AdvancedKeysContext = createContext<AdvancedKeys>({} as AdvancedKeys)

export const useAdvancedKeys = () => useContext(AdvancedKeysContext)

export function AdvancedKeysTab() {
  const {
    profile,
    advancedKeys: { layer, akIndex, setLayer, setAKIndex },
  } = useConfigurator()
  const { isSuccess, keymap, normalKeymap, advancedKeys, akIndices } =
    useGetKeymapWithAdvancedKeys(profile)
  const { mutate: setAdvancedKeys } = useSetAdvancedKeys(profile)

  const [newAKType, setNewAKType] = useState(DeviceAKType.NONE)
  const [newAKKeys, setNewAKKeys] = useState<[number | null, number | null]>([
    null,
    null,
  ])
  const [newAKKeysIndex, setNewAKKeysIndex] = useState<number | null>(null)

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <LayerSelector
            disabled={newAKType !== DeviceAKType.NONE || akIndex !== null}
            layer={layer}
            setLayer={setLayer}
          />
        </KeyboardEditorHeader>
        {!isSuccess ? (
          <KeyboardEditorSkeleton />
        ) : newAKType === DeviceAKType.NONE ? (
          <ToggleGroup
            type="single"
            value={akIndex === null ? "" : akIndex.toString()}
            onValueChange={(value) =>
              setAKIndex(value === "" ? null : parseInt(value))
            }
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem
                  disabled={
                    akIndices[layer][key] === null ||
                    (akIndex !== null && akIndices[layer][key] !== akIndex)
                  }
                  value={
                    akIndices[layer][key] === null
                      ? ""
                      : akIndices[layer][key].toString()
                  }
                  onContextMenu={(e) => {
                    e.preventDefault()
                    const akIndex = akIndices[layer][key]
                    if (akIndex !== null) {
                      setAdvancedKeys(
                        advancedKeys.filter((_, i) => i !== akIndex),
                      )
                      setAKIndex(null)
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
                  akIndices[layer][key] !== null ||
                  (newAKKeys.filter((key) => key !== null).length ===
                    AK_TYPE_TO_METADATA[newAKType].numKeys &&
                    !newAKKeys.includes(key))
                }
                pressed={newAKKeys.includes(key)}
                onPressedChange={(pressed) => {
                  if (pressed) {
                    if (newAKKeysIndex === null) {
                      return
                    }
                    const updatedKeys = produce(newAKKeys, (draft) => {
                      draft[newAKKeysIndex] = key
                    })
                    const updatedIndex = updatedKeys.indexOf(null)
                    setNewAKKeys(updatedKeys)
                    setNewAKKeysIndex(updatedIndex === -1 ? null : updatedIndex)
                  } else {
                    const index = newAKKeys.indexOf(key)
                    if (index !== -1) {
                      setNewAKKeys(
                        produce(newAKKeys, (draft) => {
                          draft[index] = null
                        }),
                      )
                      setNewAKKeysIndex(index)
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
        akIndex === null ? (
          <AdvancedKeysContext.Provider
            value={{
              keymap,
              normalKeymap,
              advancedKeys,
              akIndices,
              newAKType,
              newAKKeys,
              newAKKeysIndex,
              setNewAKType,
              setNewAKKeys,
              setNewAKKeysIndex,
            }}
          >
            {newAKType === DeviceAKType.NONE ? (
              <AdvancedKeysMenu />
            ) : (
              <AdvancedKeysCreate />
            )}
          </AdvancedKeysContext.Provider>
        ) : (
          <AdvancedKeysEditor />
        )
      ) : (
        <Loader />
      )}
    </KeyboardEditor>
  )
}
