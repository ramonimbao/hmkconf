"use client"

import { useGetKeymap } from "@/api/use-get-keymap"
import { useSetKeymap } from "@/api/use-set-keymap"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { KEYCODE_TO_METADATA } from "@/constants/keycodes"
import { Keycode } from "@/types/keycodes"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"
import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
  KeyboardEditorSkeleton,
} from "../common/keyboard-editor"
import { KeycodeButton } from "../common/keycode-button"
import { KeycodeSelector } from "../common/keycode-selector"
import { LayerSelector } from "./layer-selector"

export function RemapTab() {
  const {
    profileNum,
    remap: { layer, key, setKey },
  } = useConfigurator()
  const { metadata } = useDevice()

  const { isSuccess, data: keymap } = useGetKeymap(profileNum)
  const { mutate: setKeymap } = useSetKeymap(profileNum)

  const resetThisLayerKeymap = () => {
    if (!isSuccess) {
      return
    }

    setKeymap(
      produce(keymap, (draft) => {
        draft[layer] = metadata.defaultKeymap[layer]
      }),
    )
    setKey(null)
  }

  const setKeycode = (key: number, keycode: number) => {
    if (!isSuccess) {
      return
    }

    setKeymap(
      produce(keymap, (draft) => {
        draft[layer][key] = keycode
      }),
    )
    setKey(null)
  }

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <LayerSelector />
          <Button
            variant="destructive"
            size="sm"
            onClick={resetThisLayerKeymap}
          >
            Reset This Layer
          </Button>
        </KeyboardEditorHeader>
        {!isSuccess ? (
          <KeyboardEditorSkeleton />
        ) : (
          <ToggleGroup
            type="single"
            value={key === null ? "" : key.toString()}
            onValueChange={(value) =>
              setKey(value === "" ? null : parseInt(value))
            }
            asChild
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem value={key.toString()} asChild>
                  <KeycodeButton
                    keycodeMetadata={KEYCODE_TO_METADATA[keymap[layer][key]]}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      setKeycode(key, Keycode.KC_NO)
                    }}
                    className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  />
                </ToggleGroupItem>
              )}
            />
          </ToggleGroup>
        )}
      </KeyboardEditorLayout>
      <KeyboardEditorLayout>
        <div className="mx-auto w-full max-w-7xl p-4">
          <KeycodeSelector
            disabled={!isSuccess || key === null}
            onKeycodeSelected={(keycode) =>
              key !== null && setKeycode(key, keycode)
            }
          />
        </div>
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
