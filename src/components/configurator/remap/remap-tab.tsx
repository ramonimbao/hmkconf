"use client"

import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { useGetKeymap } from "@/hooks/use-get-keymap"
import { useSetKeymap } from "@/hooks/use-set-keymap"
import { KEYCODE_TO_METADATA } from "@/lib/keycodes"
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

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout>
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
                    className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  />
                </ToggleGroupItem>
              )}
            />
          </ToggleGroup>
        )}
      </KeyboardEditorLayout>
      <div></div>
    </KeyboardEditor>
  )
}
