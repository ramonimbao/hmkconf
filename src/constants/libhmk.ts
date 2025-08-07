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

export const HMK_RAW_HID_EP_SIZE = 64

export const HMK_ANALOG_INFO_SIZE = 3
export const HMK_KEYMAP_SIZE = 1
export const HMK_ACTUATION_MAP_SIZE = 4
export const HMK_ADVANCED_KEYS_SIZE = 12
export const HMK_GAMEPAD_BUTTON_SIZE = 1

export const COMMAND_PARTIAL_SIZE = (size: number, headerSize: number) =>
  Math.floor((HMK_RAW_HID_EP_SIZE - 1 - headerSize) / size)

export const HMK_DEVICE_USAGE_PAGE = 0xffab
export const HMK_DEVICE_USAGE_ID = 0xab
