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

import { COMMAND_PARTIAL_SIZE, HMK_KEYMAP_SIZE } from "@/constants/libhmk"
import { HMKConnectedDevice } from "@/types/hmk-device"
import { HMKCommand } from "@/types/libhmk"
import { sendCommandReport } from "../hid"

export async function getKeymap(device: HMKConnectedDevice, profile: number) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_KEYMAP_SIZE, 0)

  const ret = []
  for (let i = 0; i < device.metadata.numLayers; i++) {
    const layerKeymap = []
    for (let j = 0; j < Math.ceil(device.metadata.numKeys / partialSize); j++) {
      const response = await sendCommandReport(device, HMKCommand.GET_KEYMAP, [
        profile,
        i,
        j,
      ])

      for (let k = 0; k < partialSize; k++) {
        if (j * partialSize + k >= device.metadata.numKeys) {
          break
        }
        const offset = 1 + k * HMK_KEYMAP_SIZE
        layerKeymap.push(response.getUint8(offset))
      }
    }
    ret.push(layerKeymap)
  }

  return ret
}

export async function setKeymap(
  device: HMKConnectedDevice,
  profile: number,
  layer: number,
  start: number,
  keymap: number[],
) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_KEYMAP_SIZE, 4)

  for (let i = 0; i < Math.ceil(keymap.length / partialSize); i++) {
    const partialKeymap = keymap.slice(
      i * partialSize,
      Math.min(keymap.length, (i + 1) * partialSize),
    )

    await sendCommandReport(device, HMKCommand.SET_KEYMAP, [
      profile,
      layer,
      start + i * partialSize,
      partialKeymap.length,
      ...partialKeymap,
    ])
  }
}
