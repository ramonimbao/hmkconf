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
  HMK_ADVANCED_KEYS_SIZE,
} from "@/constants/libhmk"
import { HMKConnectedDevice } from "@/types/hmk-device"
import { HMKAdvancedKey, HMKAKType, HMKCommand } from "@/types/libhmk"
import { sendCommandReport } from "../hid"

export async function getAdvancedKeys(
  device: HMKConnectedDevice,
  profile: number,
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_ADVANCED_KEYS_SIZE, 0)

  const ret: HMKAdvancedKey[] = []
  for (
    let i = 0;
    i < Math.ceil(device.metadata.numAdvancedKeys / partialSize);
    i++
  ) {
    const response = await sendCommandReport(
      device,
      HMKCommand.GET_ADVANCED_KEYS,
      [profile, i],
    )

    for (let j = 0; j < partialSize; j++) {
      if (i * partialSize + j >= device.metadata.numAdvancedKeys) {
        break
      }
      const offset = 1 + j * HMK_ADVANCED_KEYS_SIZE
      const layer = response.getUint8(offset)
      const key = response.getUint8(offset + 1)
      const type = response.getUint8(offset + 2)

      switch (type) {
        case HMKAKType.NULL_BIND:
          ret.push({
            layer,
            key,
            ak: {
              type: HMKAKType.NULL_BIND,
              secondaryKey: response.getUint8(offset + 3),
              behavior: response.getUint8(offset + 4),
              bottomOutPoint: response.getUint8(offset + 5),
            },
          })
          break

        case HMKAKType.DYNAMIC_KEYSTROKE:
          ret.push({
            layer,
            key,
            ak: {
              type: HMKAKType.DYNAMIC_KEYSTROKE,
              keycodes: Array.from({ length: 4 }, (_, j) =>
                response.getUint8(offset + 3 + j),
              ),
              bitmap: Array.from({ length: 4 }, (_, j) => {
                const mask = response.getUint8(offset + 7 + j)
                return Array.from(
                  { length: 4 },
                  (_, k) => (mask >> (k * 2)) & 3,
                )
              }),
              bottomOutPoint: response.getUint8(offset + 11),
            },
          })
          break

        case HMKAKType.TAP_HOLD:
          ret.push({
            layer,
            key,
            ak: {
              type: HMKAKType.TAP_HOLD,
              tapKeycode: response.getUint8(offset + 3),
              holdKeycode: response.getUint8(offset + 4),
              tappingTerm: response.getUint16(offset + 5, true),
              holdOnOtherKeyPress: response.getUint8(offset + 7) !== 0,
            },
          })
          break

        case HMKAKType.TOGGLE:
          ret.push({
            layer,
            key,
            ak: {
              type: HMKAKType.TOGGLE,
              keycode: response.getUint8(offset + 3),
              tappingTerm: response.getUint16(offset + 4, true),
            },
          })
          break

        case HMKAKType.NONE:
        default:
          ret.push({
            layer,
            key,
            ak: { type: HMKAKType.NONE },
          })
          break
      }
    }
  }

  return ret
}

export async function setAdvancedKeys(
  device: HMKConnectedDevice,
  profile: number,
  start: number,
  advancedKeys: HMKAdvancedKey[],
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_ADVANCED_KEYS_SIZE, 3)

  for (let i = 0; i < Math.ceil(advancedKeys.length / partialSize); i++) {
    const partialAdvancedKeys = advancedKeys.slice(
      i * partialSize,
      Math.min(advancedKeys.length, (i + 1) * partialSize),
    )

    await sendCommandReport(device, HMKCommand.SET_ADVANCED_KEYS, [
      profile,
      start + i * partialSize,
      partialAdvancedKeys.length,
      ...partialAdvancedKeys.flatMap(({ layer, key, ak }) => {
        const buffer = [layer, key, ak.type]

        switch (ak.type) {
          case HMKAKType.NULL_BIND:
            buffer.push(ak.secondaryKey, ak.behavior, ak.bottomOutPoint)
            break

          case HMKAKType.DYNAMIC_KEYSTROKE:
            buffer.push(
              ...ak.keycodes,
              ...ak.bitmap.map((actions) =>
                actions.reduce((acc, val, i) => acc | (val << (i * 2)), 0),
              ),
              ak.bottomOutPoint,
            )
            break

          case HMKAKType.TAP_HOLD:
            buffer.push(ak.tapKeycode, ak.holdKeycode)
            buffer.push(
              (ak.tappingTerm >> 0) & 0xff,
              (ak.tappingTerm >> 8) & 0xff,
            )
            buffer.push(ak.holdOnOtherKeyPress ? 1 : 0)
            break

          case HMKAKType.TOGGLE:
            buffer.push(ak.keycode)
            buffer.push(
              (ak.tappingTerm >> 0) & 0xff,
              (ak.tappingTerm >> 8) & 0xff,
            )
            break

          case HMKAKType.NONE:
          default:
            break
        }
        buffer.push(...Array(HMK_ADVANCED_KEYS_SIZE - buffer.length).fill(0))

        return buffer
      }),
    ])
  }
}
