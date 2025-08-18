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

import { produce } from "immer"
import { useMemo } from "react"

import { gamepadButtonToDisplay } from "@/lib/gamepad"
import { useGetGamepadButtons } from "@/queries/get-gamepad-buttons"
import { useGetGamepadOptions } from "@/queries/get-gamepad-options"
import { useGetKeymap } from "@/queries/get-keymap"
import { HMKGamepadButton, HMKGamepadOptions } from "@/types/libhmk"
import { Keycode } from "@/types/libhmk/keycodes"

type DisplayGamepadProps = {
  gamepadKeymap: Keycode[]
  gamepadButtons: HMKGamepadButton[]
  gamepadOptions: HMKGamepadOptions
}

export function useDisplayGamepad(options: {
  profile: number
}):
  | ({ isSuccess: false } & Partial<DisplayGamepadProps>)
  | ({ isSuccess: true } & DisplayGamepadProps) {
  const { profile } = options

  const { isSuccess: gamepadButtonsSuccess, data: gamepadButtons } =
    useGetGamepadButtons({ profile })
  const { isSuccess: gamepadOptionsSuccess, data: gamepadOptions } =
    useGetGamepadOptions({ profile })
  const { isSuccess: keymapSuccess, data: keymap } = useGetKeymap({
    profile,
    layer: 0,
  })

  const isSuccess =
    gamepadButtonsSuccess && gamepadOptionsSuccess && keymapSuccess

  return useMemo(() => {
    if (!isSuccess) {
      return { isSuccess }
    }

    const gamepadKeymap = produce(keymap, (draft) => {
      for (let i = 0; i < keymap.length; i++) {
        if (gamepadButtons[i] !== HMKGamepadButton.NONE) {
          draft[i] = gamepadButtonToDisplay(gamepadButtons[i])
        }
      }
    })

    return {
      isSuccess,
      gamepadKeymap,
      gamepadButtons,
      gamepadOptions,
    }
  }, [gamepadButtons, gamepadOptions, isSuccess, keymap])
}
