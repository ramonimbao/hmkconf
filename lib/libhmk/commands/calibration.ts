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
import { KeyboardSetCalibrationOptions } from "@/types/keyboard"
import { HMKCalibration, HMKCommand } from "@/types/libhmk"

export async function getCalibration({
  device,
}: HMKKeyboardState): Promise<HMKCalibration> {
  const reader = new DataViewReader(
    await device.sendCommand({ command: HMKCommand.GET_CALIBRATION }),
  )

  return {
    initialRestValue: reader.getUInt16(),
    initialBottomOutThreshold: reader.getUInt16(),
  }
}

export async function setCalibration(
  { device }: HMKKeyboardState,
  {
    calibration: { initialRestValue, initialBottomOutThreshold },
  }: KeyboardSetCalibrationOptions,
) {
  await device.sendCommand({
    command: HMKCommand.GET_CALIBRATION,
    payload: [
      ...uInt16ToUInt8s(initialRestValue),
      ...uInt16ToUInt8s(initialBottomOutThreshold),
    ],
  })
}
