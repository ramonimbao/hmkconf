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
import { displayDistance } from "@/lib/distance"

export function AnalogCurveLabel() {
  return (
    <>
      <div
        className="flex flex-col items-center"
        style={{ gridArea: "analogMax" }}
      >
        <div className="text-sm text-muted-foreground">255</div>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        style={{ gridArea: "analogLabel" }}
      >
        <div className="-rotate-90 text-sm text-nowrap text-muted-foreground">
          Analog Value
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-end"
        style={{ gridArea: "analogMin" }}
      >
        <div className="text-sm text-muted-foreground">0</div>
      </div>
      <div className="flex items-center" style={{ gridArea: "switchMin" }}>
        <div className="text-sm text-muted-foreground">
          {displayDistance(MIN_DISTANCE)}mm
        </div>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ gridArea: "switchLabel" }}
      >
        <div className="text-sm text-muted-foreground">Key Press Distance</div>
      </div>
      <div
        className="flex items-center justify-end"
        style={{ gridArea: "switchMax" }}
      >
        <div className="text-sm text-muted-foreground">
          {displayDistance(MAX_DISTANCE)}mm
        </div>
      </div>
    </>
  )
}
