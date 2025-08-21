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
import { useConfiguratorGlobal } from "@/components/providers/configurator-provider"
import { useDisplayGamepad } from "@/hooks/use-display-gamepad"
import { useSetGamepadOptions } from "@/queries/set-gamepad-options"

import { Switch } from "../common/switch"
import { GamepadAnalogCurve } from "./analog-curve"
import { GamepadAnalogCurvePresets } from "./gamepad-analog-curve-presets"

export function GamepadAnalogTab() {
  const { profile } = useConfiguratorGlobal()

  const { isSuccess, gamepadOptions } = useDisplayGamepad({ profile })
  const { mutate: setGamepadOptions } = useSetGamepadOptions({ profile })

  return (
    <div className="grid size-full grid-cols-[minmax(0,1fr)_24rem]">
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-2 pr-4">
          <div className="grid text-sm">
            <span className="font-medium">Configure Analog Curve</span>
            <span className="text-muted-foreground">
              Modify how keyboard analog values translate to gamepad analog
              inputs. You can manually adjust the analog curve or select a
              preset from below. These settings affect both joysticks and
              triggers.
            </span>
          </div>
          <GamepadAnalogCurve />
          <GamepadAnalogCurvePresets />
        </div>
      </FixedScrollArea>
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-2 pl-4">
          <Switch
            checked={gamepadOptions?.squareJoystick}
            description="Remove the circular boundaries of the joystick for full range of motion."
            disabled={!isSuccess}
            id="square-joystick"
            onCheckedChange={(squareJoystick) =>
              isSuccess &&
              setGamepadOptions({
                options: {
                  ...gamepadOptions,
                  squareJoystick,
                },
              })
            }
            title="Square Joystick Mode"
          />
          <Switch
            checked={gamepadOptions?.snappyJoystick}
            description="Use the maximum analog value between opposite joystick axes instead of combining them for more responsive movement."
            disabled={!isSuccess}
            id="snappy-joystick"
            onCheckedChange={(snappyJoystick) =>
              isSuccess &&
              setGamepadOptions({
                options: {
                  ...gamepadOptions,
                  snappyJoystick,
                },
              })
            }
            title="Snappy Joystick"
          />
        </div>
      </FixedScrollArea>
    </div>
  )
}
