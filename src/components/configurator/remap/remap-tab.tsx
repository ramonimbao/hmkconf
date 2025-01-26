"use client"

import { useGetKeymap } from "@/api/use-get-keymap"
import { useSetKeymap } from "@/api/use-set-keymap"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
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
import { LayerSelector } from "../common/layer-selector"

export function RemapTab() {
  const {
    profileNum,
    remap: { layer, key, setLayer, setKey },
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

  const setKeycode = (
    key: number,
    keycode: number,
    moveToNextKey?: boolean,
  ) => {
    if (!isSuccess) {
      return
    }

    setKeymap(
      produce(keymap, (draft) => {
        draft[layer][key] = keycode
      }),
    )
    if (moveToNextKey) {
      for (let i = 0; i < metadata.layout.length; i++) {
        for (let j = 0; j < metadata.layout[i].length; j++) {
          if (metadata.layout[i][j].key !== key) {
            continue
          }

          if (j + 1 < metadata.layout[i].length) {
            setKey(metadata.layout[i][j + 1].key)
          } else if (i + 1 < metadata.layout.length) {
            setKey(metadata.layout[i + 1][0].key)
          } else {
            setKey(null)
          }
          return
        }
      }
    } else {
      setKey(null)
    }
  }

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <LayerSelector layer={layer} setLayer={setLayer} />
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
                    keycode={keymap[layer][key]}
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
        <div className="mx-auto w-full max-w-5xl p-4">
          <KeycodeSelector
            disabled={!isSuccess || key === null}
            onKeycodeSelected={(keycode) =>
              key !== null && setKeycode(key, keycode, true)
            }
          />
        </div>
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
