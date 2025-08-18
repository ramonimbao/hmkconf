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
  KeyboardGetTickRateOptions,
  KeyboardSetTickRateOptions,
} from "@/types/keyboard"
import { HMKCommand } from "@/types/libhmk"

export async function getTickRate(
  { device }: HMKKeyboardState,
  { profile }: KeyboardGetTickRateOptions,
) {
  return new DataViewReader(
    await device.sendCommand({
      command: HMKCommand.GET_TICK_RATE,
      payload: [profile],
    }),
  ).getUInt8()
}

export async function setTickRate(
  { device }: HMKKeyboardState,
  { profile, tickRate }: KeyboardSetTickRateOptions,
) {
  await device.sendCommand({
    command: HMKCommand.SET_TICK_RATE,
    payload: [profile, tickRate],
  })
}
