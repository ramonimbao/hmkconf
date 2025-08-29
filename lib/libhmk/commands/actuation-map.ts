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
  KeyboardGetActuationMapOptions,
  KeyboardSetActuationMapOptions,
} from "@/types/keyboard"
import { HMKActuation, HMKCommand } from "@/types/libhmk"

const GET_ACTUATION_MAP_MAX_ENTRIES = 15

export async function getActuationMap(
  { device, metadata: { numKeys } }: HMKKeyboardState,
  { profile }: KeyboardGetActuationMapOptions,
) {
  const ret: HMKActuation[] = []
  for (let i = 0; i < numKeys; i += GET_ACTUATION_MAP_MAX_ENTRIES) {
    const reader = new DataViewReader(
      await device.sendCommand({
        command: HMKCommand.GET_ACTUATION_MAP,
        payload: [profile, i],
      }),
    )

    for (let j = 0; j < GET_ACTUATION_MAP_MAX_ENTRIES && i + j < numKeys; j++) {
      ret.push({
        actuationPoint: reader.getUInt8(),
        rtDown: reader.getUInt8(),
        rtUp: reader.getUInt8(),
        continuous: reader.getUInt8() !== 0,
      })
    }
  }

  return ret
}

const SET_ACTUATION_MAP_MAX_ENTRIES = 15

export async function setActuationMap(
  { device }: HMKKeyboardState,
  { profile, offset, actuation }: KeyboardSetActuationMapOptions,
) {
  for (let i = 0; i < actuation.length; i += SET_ACTUATION_MAP_MAX_ENTRIES) {
    const part = actuation.slice(i, i + SET_ACTUATION_MAP_MAX_ENTRIES)
    await device.sendCommand({
      command: HMKCommand.SET_ACTUATION_MAP,
      payload: [
        profile,
        offset + i,
        part.length,
        ...part.flatMap(({ actuationPoint, rtDown, rtUp, continuous }) => [
          actuationPoint,
          rtDown,
          rtUp,
          continuous ? 1 : 0,
        ]),
      ],
    })
  }
}
