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

import { HMKConnectedDevice } from "@/types/hmk-device"
import { HMKCommand } from "@/types/libhmk"
import { sendCommandReport } from "../hid"

export async function getTickRate(device: HMKConnectedDevice, profile: number) {
  const response = await sendCommandReport(device, HMKCommand.GET_TICK_RATE, [
    profile,
  ])

  return response.getUint8(1)
}

export async function setTickRate(
  device: HMKConnectedDevice,
  profile: number,
  tickRate: number,
) {
  await sendCommandReport(device, HMKCommand.SET_TICK_RATE, [profile, tickRate])
}
