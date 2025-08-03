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

import { useGetKeymapWithGamepadButtons } from "@/api/use-get-keymap-with-gamepad-buttons"
import { useGetOptions } from "@/api/use-get-options"
import { useSetGamepadButtons } from "@/api/use-set-gamepad-buttons"
import { useSetOptions } from "@/api/use-set-options"
import { useConfigurator } from "@/components/providers/configurator-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { GamepadButton } from "@/types/gamepad"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { Info } from "lucide-react"
import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
  KeyboardEditorSkeleton,
} from "../common/keyboard-editor"
import { KeycodeButton } from "../common/keycode-button"
import { Switch } from "../common/switch"
import { GamepadEditor } from "./gamepad-editor"

export function GamepadTab() {
  const {
    profile,
    gamepad: { key, setKey },
  } = useConfigurator()

  const { isSuccess, keymap } = useGetKeymapWithGamepadButtons(profile)
  const { isSuccess: isOptionsSuccess, data: options } = useGetOptions()
  const { mutate: setOptions } = useSetOptions()
  const { mutate: setGamepadButtons } = useSetGamepadButtons(profile)

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <div className="flex items-center gap-2">
            <Switch
              disabled={!isOptionsSuccess}
              id="xinput-enabled"
              title="XInput Gamepad"
              checked={isOptionsSuccess && options.xinputEnabled}
              onCheckedChange={(xinputEnabled) =>
                isOptionsSuccess && setOptions({ ...options, xinputEnabled })
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-4" />
                </TooltipTrigger>
                <TooltipContent className="max-w-56">
                  This is a global setting that affects all profiles. Please
                  restart the device for the changes to take effect.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </KeyboardEditorHeader>
        {!isSuccess || !isOptionsSuccess ? (
          <KeyboardEditorSkeleton />
        ) : (
          <ToggleGroup
            type="single"
            value={key === null ? "" : key.toString()}
            onValueChange={(value) =>
              setKey(value === "" ? null : Number(value))
            }
            asChild
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem value={key.toString()} asChild>
                  <KeycodeButton
                    disabled={!options.xinputEnabled}
                    keycode={keymap[0][key]}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      setGamepadButtons({
                        start: key,
                        buttons: [GamepadButton.GP_BUTTON_NONE],
                      })
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
        <GamepadEditor />
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
