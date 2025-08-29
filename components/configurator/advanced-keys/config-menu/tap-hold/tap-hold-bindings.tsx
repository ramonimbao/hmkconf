import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { KeycodeButton } from "@/components/configurator/common/keycode-button"
import { getUnitSizeCSS } from "@/lib/ui"
import { Keycode } from "@/types/libhmk/keycodes"

import { useTapHold } from "."
import { useAdvancedKeysConfig } from ".."

export function TapHoldBindings() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action, binding, setBinding } = useTapHold()

  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="grid text-sm">
          <span className="font-medium">Configure Tap-Hold Bindings</span>
          <span className="text-muted-foreground">
            Assign bindings for tap and hold actions of the key.
          </span>
        </div>
        <div className="flex flex-col items-center">
          <ToggleGroup
            className="flex"
            onValueChange={setBinding}
            type="single"
            value={binding}
          >
            <div className="flex flex-col items-center text-base">
              <div className="text-muted-foreground">Tap</div>
              <div className="p-0.5" style={getUnitSizeCSS()}>
                <ToggleGroupItem asChild value="tap">
                  <KeycodeButton
                    keycode={action.tapKeycode}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      updateAdvancedKey((advancedKey) => ({
                        ...advancedKey,
                        action: {
                          ...action,
                          tapKeycode: Keycode.KC_NO,
                        },
                      }))
                    }}
                  />
                </ToggleGroupItem>
              </div>
            </div>
            <div className="flex flex-col items-center text-base">
              <div className="text-muted-foreground">Hold</div>
              <div className="p-0.5" style={getUnitSizeCSS()}>
                <ToggleGroupItem asChild value="hold">
                  <KeycodeButton
                    keycode={action.holdKeycode}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      updateAdvancedKey((advancedKey) => ({
                        ...advancedKey,
                        action: {
                          ...action,
                          holdKeycode: Keycode.KC_NO,
                        },
                      }))
                    }}
                  />
                </ToggleGroupItem>
              </div>
            </div>
          </ToggleGroup>
        </div>
      </div>
    </FixedScrollArea>
  )
}
