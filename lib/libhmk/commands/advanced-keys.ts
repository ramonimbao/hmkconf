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
import { uInt16ToUInt8s } from "@/lib/utils"
import {
  KeyboardGetAdvancedKeysOptions,
  KeyboardSetAdvancedKeysOptions,
} from "@/types/keyboard"
import { HMKAdvancedKey, HMKAKType, HMKCommand } from "@/types/libhmk"

export const ADVANCED_KEY_SIZE = 12
const GET_ADVANCED_KEYS_MAX_ENTRIES = 5

export async function getAdvancedKeys(
  { device, metadata: { numAdvancedKeys } }: HMKKeyboardState,
  { profile }: KeyboardGetAdvancedKeysOptions,
) {
  const ret: HMKAdvancedKey[] = []
  for (let i = 0; i < numAdvancedKeys; i += GET_ADVANCED_KEYS_MAX_ENTRIES) {
    const view = await device.sendCommand({
      command: HMKCommand.GET_ADVANCED_KEYS,
      payload: [profile, i],
    })

    for (
      let j = 0;
      j < GET_ADVANCED_KEYS_MAX_ENTRIES && i + j < numAdvancedKeys;
      j++
    ) {
      const reader = new DataViewReader(view, j * ADVANCED_KEY_SIZE)
      const layer = reader.getUInt8()
      const key = reader.getUInt8()
      const type = reader.getUInt8()

      switch (type) {
        case HMKAKType.NULL_BIND:
          ret.push({
            layer,
            key,
            action: {
              type,
              secondaryKey: reader.getUInt8(),
              behavior: reader.getUInt8(),
              bottomOutPoint: reader.getUInt8(),
            },
          })
          break
        case HMKAKType.DYNAMIC_KEYSTROKE:
          ret.push({
            layer,
            key,
            action: {
              type,
              keycodes: [...Array(4)].map(() => reader.getUInt8()),
              bitmap: [...Array(4)].map(() => {
                const bitmapRaw = reader.getUInt8()
                return [...Array(4)].map((_, i) => (bitmapRaw >> (i * 2)) & 3)
              }),
              bottomOutPoint: reader.getUInt8(),
            },
          })
          break
        case HMKAKType.TAP_HOLD:
          ret.push({
            layer,
            key,
            action: {
              type,
              tapKeycode: reader.getUInt8(),
              holdKeycode: reader.getUInt8(),
              tappingTerm: reader.getUInt16(),
              holdOnOtherKeyPress: reader.getUInt8() !== 0,
            },
          })
          break
        case HMKAKType.TOGGLE:
          ret.push({
            layer,
            key,
            action: {
              type,
              keycode: reader.getUInt8(),
              tappingTerm: reader.getUInt16(),
            },
          })
          break
        case HMKAKType.NONE:
        default:
          ret.push({ layer, key, action: { type } })
          break
      }
    }
  }

  return ret
}

const SET_ADVANCED_KEYS_MAX_ENTRIES = 5

export async function setAdvancedKeys(
  { device }: HMKKeyboardState,
  { profile, offset, advancedKeys }: KeyboardSetAdvancedKeysOptions,
) {
  for (let i = 0; i < advancedKeys.length; i += SET_ADVANCED_KEYS_MAX_ENTRIES) {
    const part = advancedKeys.slice(i, i + SET_ADVANCED_KEYS_MAX_ENTRIES)
    const payload = [profile, offset + i, part.length]

    for (const { layer, key, action } of part) {
      const buffer = [layer, key, action.type]
      switch (action.type) {
        case HMKAKType.NULL_BIND:
          buffer.push(
            action.secondaryKey,
            action.behavior,
            action.bottomOutPoint,
          )
          break
        case HMKAKType.DYNAMIC_KEYSTROKE:
          buffer.push(
            ...action.keycodes,
            ...action.bitmap.map((bitmap) =>
              bitmap.reduce((acc, bit, i) => acc | (bit << (2 * i)), 0),
            ),
            action.bottomOutPoint,
          )
          break
        case HMKAKType.TAP_HOLD:
          buffer.push(
            action.tapKeycode,
            action.holdKeycode,
            ...uInt16ToUInt8s(action.tappingTerm),
            action.holdOnOtherKeyPress ? 1 : 0,
          )
          break
        case HMKAKType.TOGGLE:
          buffer.push(action.keycode, ...uInt16ToUInt8s(action.tappingTerm))
          break
        case HMKAKType.NONE:
        default:
          break
      }
      buffer.push(...Array(ADVANCED_KEY_SIZE - buffer.length).fill(0))
      payload.push(...buffer)
    }

    await device.sendCommand({ command: HMKCommand.SET_ADVANCED_KEYS, payload })
  }
}
