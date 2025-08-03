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

import { useGetGamepadOptions } from "@/api/use-get-gamepad-options"
import { useGetOptions } from "@/api/use-get-options"
import { useSetGamepadOptions } from "@/api/use-set-gamepad-options"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Switch } from "../common/switch"
import { GamepadAnalogCurve } from "./gamepad-analog-curve"
import { GamepadButtonSelector } from "./gamepad-button-selector"
import { GamepadCurvePresets } from "./gamepad-curve-presets"

export function GamepadEditor() {
  const {
    profile,
    gamepad: { editorTab, setEditorTab },
  } = useConfigurator()

  const { isSuccess: isOptionsSuccess, data: options } = useGetOptions()
  const { isSuccess: isGamepadOptionsSuccess, data: gamepadOptions } =
    useGetGamepadOptions(profile)
  const { mutate: setGamepadOptions } = useSetGamepadOptions(profile)

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl gap-8 p-4",
        (!isOptionsSuccess || !options.xinputEnabled) &&
          "pointer-events-none opacity-50",
      )}
    >
      <div className="grid w-96 shrink-0 gap-4">
        <div className="flex flex-col">
          <p className="font-semibold leading-none tracking-tight">
            Gamepad Bindings
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a key to edit its gamepad binding. These bindings only apply
            to the first layer of your layout and will not override your keymap.
          </p>
          <GamepadButtonSelector className="mt-3" />
        </div>
      </div>
      <Tabs
        className="flex flex-1 flex-col"
        value={editorTab}
        onValueChange={(value) => setEditorTab(value)}
      >
        <div>
          <TabsList>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="analog">Analog</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="setup">
          <div className="flex flex-col gap-4 rounded-md border bg-card p-4 shadow-sm">
            <Switch
              disabled={!isGamepadOptionsSuccess}
              id="keyboard-enabled"
              title="Enable Keyboard Keys"
              description="Allow keyboard keys to be sent alongside gamepad buttons. Disable this option if keyboard inputs interfere with gamepad functionality."
              checked={
                isGamepadOptionsSuccess && gamepadOptions.keyboardEnabled
              }
              onCheckedChange={(keyboardEnabled) =>
                isGamepadOptionsSuccess &&
                setGamepadOptions({
                  ...gamepadOptions,
                  keyboardEnabled,
                })
              }
            />
            <Switch
              disabled={!isGamepadOptionsSuccess}
              id="gamepad-override"
              title="Gamepad Override"
              description="Disable keyboard keys for any keys that are bound to gamepad buttons."
              checked={
                isGamepadOptionsSuccess && gamepadOptions.gamepadOverride
              }
              onCheckedChange={(gamepadOverride) =>
                isGamepadOptionsSuccess &&
                setGamepadOptions({
                  ...gamepadOptions,
                  gamepadOverride,
                })
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="analog">
          <div className="flex flex-col gap-4 rounded-md border bg-card p-4 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold tracking-tight">Analog Curve</p>
                <GamepadCurvePresets />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Adjust how key press distance translates to analog values.
              </p>
              <GamepadAnalogCurve className="mt-3" />
            </div>
            <Switch
              disabled={!isGamepadOptionsSuccess}
              id="square-joystick"
              title="Joystick Square Mode"
              description="Remove the joystick's circular deadzone to allow maximum range of diagonal movement."
              checked={isGamepadOptionsSuccess && gamepadOptions.squareJoystick}
              onCheckedChange={(squareJoystick) =>
                isGamepadOptionsSuccess &&
                setGamepadOptions({
                  ...gamepadOptions,
                  squareJoystick,
                })
              }
            />
            <Switch
              disabled={!isGamepadOptionsSuccess}
              id="snappy-joystick"
              title="Snappy Joystick Mode"
              description="Use the maximum value from the joystick's opposite axes instead of combining them."
              checked={isGamepadOptionsSuccess && gamepadOptions.snappyJoystick}
              onCheckedChange={(snappyJoystick) =>
                isGamepadOptionsSuccess &&
                setGamepadOptions({
                  ...gamepadOptions,
                  snappyJoystick,
                })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
