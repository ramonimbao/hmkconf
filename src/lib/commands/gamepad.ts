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

import {
  COMMAND_PARTIAL_SIZE,
  HMK_GAMEPAD_BUTTON_SIZE,
  HMK_KEYMAP_SIZE,
} from "@/constants/libhmk"
import { HMKConnectedDevice } from "@/types/hmk-device"
import { HMKCommand, HMKGamepadOptions } from "@/types/libhmk"
import { sendCommandReport } from "../hid"

export async function getGamepadButtons(
  device: HMKConnectedDevice,
  profile: number,
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_GAMEPAD_BUTTON_SIZE, 0)

  const ret = []
  for (let i = 0; i < Math.ceil(device.metadata.numKeys / partialSize); i++) {
    const response = await sendCommandReport(
      device,
      HMKCommand.GET_GAMEPAD_BUTTONS,
      [profile, i],
    )

    for (let j = 0; j < partialSize; j++) {
      if (i * partialSize + j >= device.metadata.numKeys) {
        break
      }
      const offset = 1 + j * HMK_KEYMAP_SIZE
      ret.push(response.getUint8(offset))
    }
  }

  return ret
}

export async function setGamepadButtons(
  device: HMKConnectedDevice,
  profile: number,
  start: number,
  buttons: number[],
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_GAMEPAD_BUTTON_SIZE, 3)

  for (let i = 0; i < Math.ceil(buttons.length / partialSize); i++) {
    const partialButtons = buttons.slice(
      i * partialSize,
      Math.min(buttons.length, (i + 1) * partialSize),
    )

    await sendCommandReport(device, HMKCommand.SET_GAMEPAD_BUTTONS, [
      profile,
      start + i * partialSize,
      partialButtons.length,
      ...partialButtons,
    ])
  }
}

export async function getGamepadOptions(
  device: HMKConnectedDevice,
  profile: number,
) {
  const response = await sendCommandReport(
    device,
    HMKCommand.GET_GAMEPAD_OPTIONS,
    [profile],
  )

  const analogCurve = Array.from({ length: 4 }, (_, i) => ({
    x: response.getUint8(1 + i * 2),
    y: response.getUint8(2 + i * 2),
  }))
  const optionsRaw = response.getUint8(9)

  return {
    analogCurve,
    keyboardEnabled: (optionsRaw & 0x01) !== 0,
    gamepadOverride: (optionsRaw & 0x02) !== 0,
    squareJoystick: (optionsRaw & 0x04) !== 0,
    snappyJoystick: (optionsRaw & 0x08) !== 0,
  }
}

export async function setGamepadOptions(
  device: HMKConnectedDevice,
  profile: number,
  options: HMKGamepadOptions,
) {
  const buffer = [profile]
  for (const { x, y } of options.analogCurve) {
    buffer.push(x, y)
  }
  buffer.push(
    ((options.keyboardEnabled ? 1 : 0) << 0) |
      ((options.gamepadOverride ? 1 : 0) << 1) |
      ((options.squareJoystick ? 1 : 0) << 2) |
      ((options.snappyJoystick ? 1 : 0) << 3),
  )

  await sendCommandReport(device, HMKCommand.SET_GAMEPAD_OPTIONS, buffer)
}
