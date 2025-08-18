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

import { HMKKeyboardState } from "@/hooks/use-hmk-keyboard"
import { DataViewReader } from "@/lib/data-view-reader"
import {
  KeyboardGetGamepadButtonsOptions,
  KeyboardSetGamepadButtonsOptions,
} from "@/types/keyboard"
import { HMKCommand } from "@/types/libhmk"

const GET_GAMEPAD_BUTTONS_MAX_ENTRIES = 63

export async function getGamepadButtons(
  { device, metadata: { numKeys } }: HMKKeyboardState,
  { profile }: KeyboardGetGamepadButtonsOptions,
) {
  const ret: number[] = []
  for (let i = 0; i < numKeys; i += GET_GAMEPAD_BUTTONS_MAX_ENTRIES) {
    const reader = new DataViewReader(
      await device.sendCommand({
        command: HMKCommand.GET_GAMEPAD_BUTTONS,
        payload: [profile, i],
      }),
    )

    for (
      let j = 0;
      j < GET_GAMEPAD_BUTTONS_MAX_ENTRIES && i + j < numKeys;
      j++
    ) {
      ret.push(reader.getUInt8())
    }
  }

  return ret
}

const SET_GAMEPAD_BUTTONS_MAX_ENTRIES = 59

export async function setGamepadButtons(
  { device }: HMKKeyboardState,
  { profile, offset, buttons }: KeyboardSetGamepadButtonsOptions,
) {
  for (let i = 0; i < buttons.length; i += SET_GAMEPAD_BUTTONS_MAX_ENTRIES) {
    const part = buttons.slice(i, i + SET_GAMEPAD_BUTTONS_MAX_ENTRIES)
    await device.sendCommand({
      command: HMKCommand.SET_GAMEPAD_BUTTONS,
      payload: [profile, offset + i, part.length, ...part],
    })
  }
}
