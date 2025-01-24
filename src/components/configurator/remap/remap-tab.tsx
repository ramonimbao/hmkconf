"use client"

import { useConfigurator } from "@/components/configurator-provider"
import { useGetKeymap } from "@/hooks/use-get-keymap"
import { KEYCODE_TO_METADATA } from "@/lib/keycodes"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
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

  const { isSuccess, data: keymap } = useGetKeymap(profileNum)

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout>
        <KeyboardEditorHeader>
          <LayerSelector />
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
