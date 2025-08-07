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
  HMK_ACTUATION_MAP_SIZE,
} from "@/constants/libhmk"
import { HMKConnectedDevice } from "@/types/hmk-device"
import { HMKActuation, HMKCommand } from "@/types/libhmk"
import { sendCommandReport } from "../hid"

export async function getActuationMap(
  device: HMKConnectedDevice,
  profile: number,
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_ACTUATION_MAP_SIZE, 0)

  const ret = []
  for (let i = 0; i < Math.ceil(device.metadata.numKeys / partialSize); i++) {
    const response = await sendCommandReport(
      device,
      HMKCommand.GET_ACTUATION_MAP,
      [profile, i],
    )

    for (let j = 0; j < partialSize; j++) {
      if (i * partialSize + j >= device.metadata.numKeys) {
        break
      }
      const offset = 1 + j * HMK_ACTUATION_MAP_SIZE
      ret.push({
        actuationPoint: response.getUint8(offset),
        rtDown: response.getUint8(offset + 1),
        rtUp: response.getUint8(offset + 2),
        continuous: response.getUint8(offset + 3) !== 0,
      })
    }
  }

  return ret
}

export async function setActuationMap(
  device: HMKConnectedDevice,
  profile: number,
  start: number,
  actuationMap: HMKActuation[],
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_ACTUATION_MAP_SIZE, 3)

  for (let i = 0; i < Math.ceil(actuationMap.length / partialSize); i++) {
    const partialActuationMap = actuationMap.slice(
      i * partialSize,
      Math.min(actuationMap.length, (i + 1) * partialSize),
    )

    await sendCommandReport(device, HMKCommand.SET_ACTUATION_MAP, [
      profile,
      start + i * partialSize,
      partialActuationMap.length,
      ...partialActuationMap.flatMap((actuation) => [
        actuation.actuationPoint,
        actuation.rtDown,
        actuation.rtUp,
        actuation.continuous ? 1 : 0,
      ]),
    ])
  }
}
