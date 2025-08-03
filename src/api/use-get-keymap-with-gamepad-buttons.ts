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

import { useDevice } from "@/components/providers/device-provider"
import { gamepadButtonToKeycode } from "@/lib/gamepad"
import { GamepadButton } from "@/types/gamepad"
import { produce } from "immer"
import { useGetGamepadButtons } from "./use-get-gamepad-buttons"
import { useGetKeymap } from "./use-get-keymap"

type GetKeymapWithGamepadButtonsReturnType =
  | {
      isSuccess: false
      keymap?: undefined
      normalKeymap?: undefined
      gamepadButtons?: undefined
    }
  | {
      isSuccess: true
      keymap: number[][]
      normalKeymap: number[][]
      gamepadButtons: number[]
    }

export function useGetKeymapWithGamepadButtons(
  profile: number,
): GetKeymapWithGamepadButtonsReturnType {
  const { metadata } = useDevice()

  const { isSuccess: isKeymapSuccess, data: keymap } = useGetKeymap(profile)
  const { isSuccess: isGamepadButtonsSuccess, data: gamepadButtons } =
    useGetGamepadButtons(profile)

  if (!isKeymapSuccess || !isGamepadButtonsSuccess) {
    return { isSuccess: false }
  }

  const keymapWithGamepadButtons = produce(keymap, (draft) => {
    for (let i = 0; i < gamepadButtons.length; i++) {
      if (gamepadButtons[i] !== GamepadButton.GP_BUTTON_NONE) {
        for (let layer = 0; layer < metadata.numLayers; layer++) {
          draft[layer][i] = gamepadButtonToKeycode(gamepadButtons[i])
        }
      }
    }
  })

  return {
    isSuccess: true,
    keymap: keymapWithGamepadButtons,
    normalKeymap: keymap,
    gamepadButtons,
  }
}
