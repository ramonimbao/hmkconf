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

import { MAX_DISTANCE, MIN_DISTANCE } from "@/constants/libhmk"
import { SWITCH_DISTANCE_MM, SWITCH_DISTANCE_UNIT } from "@/constants/ui"

export function unitToDistance(value: number) {
  return Math.max(
    MIN_DISTANCE,
    Math.round((value * MAX_DISTANCE) / SWITCH_DISTANCE_UNIT),
  )
}

export function distanceToUnit(distance: number) {
  return Math.round((distance * SWITCH_DISTANCE_UNIT) / MAX_DISTANCE)
}

export function displayUnitDistance(value: number, decimal = 2) {
  return ((value * SWITCH_DISTANCE_MM) / SWITCH_DISTANCE_UNIT).toFixed(decimal)
}

export function displayDistance(distance: number, decimal = 2) {
  return displayUnitDistance(distanceToUnit(distance), decimal)
}
