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
import { useSetGamepadOptions } from "@/api/use-set-gamepad-options"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GAMEPAD_ANALOG_CURVE_PRESETS } from "@/constants/gamepad"

export function GamepadCurvePresets() {
  const { profile } = useConfigurator()

  const { isSuccess, data: gamepadOptions } = useGetGamepadOptions(profile)
  const { mutate: setGamepadOptions } = useSetGamepadOptions(profile)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Presets
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {GAMEPAD_ANALOG_CURVE_PRESETS.map(({ name, curve }, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() =>
              isSuccess &&
              setGamepadOptions({ ...gamepadOptions, analogCurve: curve })
            }
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
