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

import { EM_PER_UNIT } from "@/constants/ui"

export function displayVersion(version: number) {
  return `v${(version >> 8) & 0xff}.${version & 0xff}`
}

export function displayUInt8(value: number) {
  return `0x${value.toString(16).padStart(2, "0")}`
}

export function displayUInt16(value: number) {
  return `0x${value.toString(16).padStart(4, "0")}`
}

export function unitToEM(value: number) {
  return value * EM_PER_UNIT
}

export function unitToEMString(value: number) {
  return `${unitToEM(value)}em`
}

export function getUnitSizeCSS(w = 1, h = 1): React.CSSProperties {
  return {
    width: unitToEMString(w),
    height: unitToEMString(h),
  }
}
