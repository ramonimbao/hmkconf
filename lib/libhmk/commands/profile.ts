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
  KeyboardDuplicateProfileOptions,
  KeyboardResetProfileOptions,
} from "@/types/keyboard"
import { HMKCommand } from "@/types/libhmk"

export async function getProfile({ device }: HMKKeyboardState) {
  return new DataViewReader(
    await device.sendCommand({ command: HMKCommand.GET_PROFILE }),
  ).getUInt8()
}

export async function resetProfile(
  { device }: HMKKeyboardState,
  { profile }: KeyboardResetProfileOptions,
) {
  await device.sendCommand({
    command: HMKCommand.RESET_PROFILE,
    payload: [profile],
  })
}

export async function duplicateProfile(
  { device }: HMKKeyboardState,
  { profile, srcProfile }: KeyboardDuplicateProfileOptions,
) {
  await device.sendCommand({
    command: HMKCommand.DUPLICATE_PROFILE,
    payload: [profile, srcProfile],
  })
}
