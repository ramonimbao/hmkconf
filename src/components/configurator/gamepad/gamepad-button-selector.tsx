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

import { useSetGamepadButtons } from "@/api/use-set-gamepad-buttons"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { GAMEPAD_BUTTON_KEYCODES } from "@/constants/keycodes"
import { keycodeToGamepadButton } from "@/lib/gamepad"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { KeycodeButton } from "../common/keycode-button"
import { KeycodeButtonTooltip } from "../common/keycode-button-tooltip"

const BUTTON_SIZE = 64

export function GamepadButtonSelector({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const {
    profile,
    gamepad: { key, setKey },
  } = useConfigurator()

  const { mutate: setGamepadButtons } = useSetGamepadButtons(profile)

  const disabled = key === null

  return (
    <div
      className={cn(
        "flex w-full flex-wrap",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      {GAMEPAD_BUTTON_KEYCODES.map((keycode, i) => (
        <div
          key={i}
          className="p-0.5"
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
          }}
        >
          <KeycodeButtonTooltip keycode={keycode}>
            <KeycodeButton
              keycode={keycode}
              onClick={() => {
                if (key !== null) {
                  setGamepadButtons({
                    start: key,
                    buttons: [keycodeToGamepadButton(keycode)],
                  })
                  setKey(null)
                }
              }}
            />
          </KeycodeButtonTooltip>
        </div>
      ))}
    </div>
  )
}
