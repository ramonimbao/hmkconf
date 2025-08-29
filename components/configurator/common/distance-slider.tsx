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

import { SWITCH_DISTANCE_UNIT } from "@/constants/ui"
import {
  displayUnitDistance,
  distanceToUnit,
  unitToDistance,
} from "@/lib/distance"
import { optMap } from "@/lib/utils"

import { CommitSlider, CommitSliderProvider } from "./commit-slider"

export function DistanceSliderProvider({
  ...props
}: React.ComponentProps<typeof CommitSliderProvider>) {
  return (
    <CommitSliderProvider
      display={(distance) => `${displayUnitDistance(distance)}mm`}
      {...props}
    />
  )
}

export function DistanceSlider({
  committedValue,
  onCommit,
  ...props
}: React.ComponentProps<typeof CommitSlider>) {
  return (
    <CommitSlider
      committedValue={optMap(committedValue, distanceToUnit)}
      min={1}
      max={SWITCH_DISTANCE_UNIT}
      onCommit={(unit) => onCommit?.(unitToDistance(unit))}
      {...props}
    />
  )
}
