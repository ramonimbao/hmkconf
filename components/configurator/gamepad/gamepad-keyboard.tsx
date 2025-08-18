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

import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"

import { KeyboardEditorKeyboard } from "@/components/common/keyboard-editor"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { useDisplayGamepad } from "@/hooks/use-display-gamepad"
import { useSetGamepadButtons } from "@/queries/set-gamepad-buttons"
import { HMKGamepadButton } from "@/types/libhmk"

import { KeyButtonSkeleton } from "../common/key-button"
import { KeycodeButton, KeycodeButtonTooltip } from "../common/keycode-button"

export function GamepadKeyboard() {
  const {
    profile,
    gamepad: { key, setKey },
  } = useConfigurator()
  const {
    metadata: { layout },
  } = useKeyboard()

  const { isSuccess, gamepadKeymap, gamepadButtons } = useDisplayGamepad({
    profile,
  })
  const { mutate: setGamepadButtons } = useSetGamepadButtons({ profile })

  return (
    <ToggleGroup
      asChild
      onValueChange={(key) => setKey(key === "" ? null : parseInt(key))}
      type="single"
      value={key?.toString() ?? ""}
    >
      <KeyboardEditorKeyboard
        layout={layout}
        keyGenerator={(key) => {
          if (!isSuccess) {
            return <KeyButtonSkeleton />
          }

          if (gamepadButtons[key] === HMKGamepadButton.NONE) {
            return (
              <ToggleGroupItem asChild value={key.toString()}>
                <KeycodeButton keycode={gamepadKeymap[key]} />
              </ToggleGroupItem>
            )
          }

          return (
            <KeycodeButtonTooltip keycode={gamepadKeymap[key]}>
              <ToggleGroupItem asChild value={key.toString()}>
                <KeycodeButton
                  keycode={gamepadKeymap[key]}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    setGamepadButtons({
                      offset: key,
                      buttons: [HMKGamepadButton.NONE],
                    })
                  }}
                />
              </ToggleGroupItem>
            </KeycodeButtonTooltip>
          )
        }}
      />
    </ToggleGroup>
  )
}
