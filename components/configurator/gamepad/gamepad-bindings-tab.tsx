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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { GAMEPAD_BUTTONS } from "@/constants/gamepad"
import { useDisplayGamepad } from "@/hooks/use-display-gamepad"
import { gamepadButtonToDisplay } from "@/lib/gamepad"
import { getUnitSizeCSS } from "@/lib/ui"
import { useSetGamepadButtons } from "@/queries/set-gamepad-buttons"
import { useSetGamepadOptions } from "@/queries/set-gamepad-options"

import { KeycodeButton, KeycodeButtonTooltip } from "../common/keycode-button"
import { Switch } from "../common/switch"

export function GamepadBindingsTab() {
  const {
    profile,
    gamepad: { key, setKey },
  } = useConfigurator()

  const { isSuccess, gamepadOptions } = useDisplayGamepad({
    profile,
  })
  const { mutate: setGamepadButtons } = useSetGamepadButtons({ profile })
  const { mutate: setGamepadOptions } = useSetGamepadOptions({ profile })

  return (
    <div className="grid size-full grid-cols-[minmax(0,1fr)_24rem]">
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-2 pr-4">
          <div className="grid text-sm">
            <span className="font-medium">Configure Controller Bindings</span>
            <span className="text-muted-foreground">
              Assign gamepad buttons to your keyboard.
            </span>
          </div>
          <div className="flex flex-wrap text-sm">
            {GAMEPAD_BUTTONS.map((button) => (
              <div key={button} className="p-0.5" style={getUnitSizeCSS()}>
                <KeycodeButtonTooltip keycode={gamepadButtonToDisplay(button)}>
                  <KeycodeButton
                    keycode={gamepadButtonToDisplay(button)}
                    onClick={() => {
                      if (key !== null) {
                        setGamepadButtons({ offset: key, buttons: [button] })
                        setKey(null)
                      }
                    }}
                  />
                </KeycodeButtonTooltip>
              </div>
            ))}
          </div>
        </div>
      </FixedScrollArea>
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-2 pl-4">
          <Switch
            checked={gamepadOptions?.keyboardEnabled}
            description="Allow keyboard inputs to be sent along with gamepad inputs."
            disabled={!isSuccess}
            id="keyboard-enabled"
            onCheckedChange={(keyboardEnabled) =>
              isSuccess &&
              setGamepadOptions({
                options: { ...gamepadOptions, keyboardEnabled },
              })
            }
            title="Enable Keyboard Inputs"
          />
          <Switch
            checked={gamepadOptions?.gamepadOverride}
            description="Disable keyboard inputs on keys bound to gamepad buttons."
            disabled={!isSuccess || !gamepadOptions.keyboardEnabled}
            id="gamepad-override"
            onCheckedChange={(gamepadOverride) =>
              isSuccess &&
              setGamepadOptions({
                options: { ...gamepadOptions, gamepadOverride },
              })
            }
            title="Gamepad Override"
          />
        </div>
      </FixedScrollArea>
    </div>
  )
}
