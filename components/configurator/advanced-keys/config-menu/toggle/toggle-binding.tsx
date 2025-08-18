import { Toggle } from "@radix-ui/react-toggle"

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { KeycodeButton } from "@/components/configurator/common/keycode-button"
import { getUnitSizeCSS } from "@/lib/ui"
import { Keycode } from "@/types/libhmk/keycodes"

import { useToggle } from "."
import { useAdvancedKeysConfig } from ".."

export function ToggleBinding() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action, bindingSelected, setBindingSelected } = useToggle()

  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="grid text-sm">
          <span className="font-medium">Configure Toggle Binding</span>
          <span className="text-muted-foreground">
            Assign a binding for the toggle action of the key.
          </span>
        </div>
        <div className="flex flex-col items-center text-base">
          <div className="p-0.5" style={getUnitSizeCSS()}>
            <Toggle
              asChild
              onPressedChange={setBindingSelected}
              pressed={bindingSelected}
            >
              <KeycodeButton
                keycode={action.keycode}
                onContextMenu={(e) => {
                  e.preventDefault()
                  updateAdvancedKey((advancedKey) => ({
                    ...advancedKey,
                    action: {
                      ...action,
                      keycode: Keycode.KC_NO,
                    },
                  }))
                }}
              />
            </Toggle>
          </div>
        </div>
      </div>
    </FixedScrollArea>
  )
}
