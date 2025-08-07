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

import { COMMAND_PARTIAL_SIZE, HMK_ANALOG_INFO_SIZE } from "@/constants/libhmk"
import { HMKConnectedDevice } from "@/types/hmk-device"
import { HMKCalibration, HMKCommand, HMKOptions } from "@/types/libhmk"
import { sendCommandReport } from "../hid"

export async function firmwareVersion(device: HMKConnectedDevice) {
  const response = await sendCommandReport(device, HMKCommand.FIRMWARE_VERSION)

  return response.getUint16(1, true)
}

export async function reboot(device: HMKConnectedDevice) {
  await sendCommandReport(device, HMKCommand.REBOOT)
}

export async function bootloader(device: HMKConnectedDevice) {
  await sendCommandReport(device, HMKCommand.BOOTLOADER)
}

export async function factoryReset(device: HMKConnectedDevice) {
  await sendCommandReport(device, HMKCommand.FACTORY_RESET)
}

export async function recalibrate(device: HMKConnectedDevice) {
  await sendCommandReport(device, HMKCommand.RECALIBRATE)
}

export async function analogInfo(device: HMKConnectedDevice) {
  const partialSize = COMMAND_PARTIAL_SIZE(HMK_ANALOG_INFO_SIZE, 0)

  const ret = []
  for (let i = 0; i < Math.ceil(device.metadata.numKeys / partialSize); i++) {
    const response = await sendCommandReport(device, HMKCommand.ANALOG_INFO, [
      i,
    ])
    for (let j = 0; j < partialSize; j++) {
      if (i * partialSize + j >= device.metadata.numKeys) {
        break
      }
      const offset = 1 + j * HMK_ANALOG_INFO_SIZE
      ret.push({
        adcValue: response.getUint16(offset, true),
        distance: response.getUint8(offset + 2),
      })
    }
  }

  return ret
}

export async function getCalibration(device: HMKConnectedDevice) {
  const response = await sendCommandReport(device, HMKCommand.GET_CALIBRATION)

  return {
    initialRestValue: response.getUint16(1, true),
    initialBottomOutThreshold: response.getUint16(3, true),
  }
}

export async function setCalibration(
  device: HMKConnectedDevice,
  calibration: HMKCalibration,
) {
  await sendCommandReport(device, HMKCommand.SET_CALIBRATION, [
    calibration.initialRestValue & 0xff,
    (calibration.initialRestValue >> 8) & 0xff,
    calibration.initialBottomOutThreshold & 0xff,
    (calibration.initialBottomOutThreshold >> 8) & 0xff,
  ])
}

export async function getProfile(device: HMKConnectedDevice) {
  const response = await sendCommandReport(device, HMKCommand.GET_PROFILE)

  return response.getUint8(1)
}

export async function getOptions(device: HMKConnectedDevice) {
  const response = await sendCommandReport(device, HMKCommand.GET_OPTIONS)
  const optionsRaw = response.getUint16(1, true)

  return {
    xinputEnabled: (optionsRaw & 0x0001) !== 0,
  }
}

export async function setOptions(
  device: HMKConnectedDevice,
  options: HMKOptions,
) {
  const optionsRaw = (options.xinputEnabled ? 1 : 0) << 0

  await sendCommandReport(device, HMKCommand.SET_OPTIONS, [
    optionsRaw & 0xff,
    (optionsRaw >> 8) & 0xff,
  ])
}
