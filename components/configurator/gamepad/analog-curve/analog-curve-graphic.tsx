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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CURVE_VIEW_HEIGHT, CURVE_VIEW_WIDTH } from "@/constants/gamepad"

import { useAnalogCurve } from "."

export function AnalogCurveGraphic() {
  const { viewCurve } = useAnalogCurve()

  return (
    <div className="relative box-border border" style={{ gridArea: "curve" }}>
      <svg
        className="size-full"
        viewBox={`0 0 ${CURVE_VIEW_WIDTH} ${CURVE_VIEW_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <polygon
          className="fill-accent-foreground/30"
          points={[
            ...viewCurve.map(({ x, y }) => `${x},${y}`),
            `${viewCurve[3].x},${CURVE_VIEW_HEIGHT}`,
            `${viewCurve[0].x},${CURVE_VIEW_HEIGHT}`,
          ].join(",")}
        />
        <polyline
          className="fill-none stroke-accent-foreground stroke-3"
          points={viewCurve.map(({ x, y }) => `${x},${y}`).join(",")}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className="absolute inset-y-0 left-0 z-10 box-border flex flex-col items-center overflow-hidden bg-muted"
        style={{ width: viewCurve[0].x }}
      >
        <Tooltip>
          <TooltipTrigger className="m-2 text-xs text-muted-foreground">
            Key Start Deadzone
          </TooltipTrigger>
          <TooltipContent className="max-w-sm text-wrap">
            No gamepad analog input will be sent.
          </TooltipContent>
        </Tooltip>
      </div>
      <div
        className="absolute inset-y-0 right-0 z-10 flex flex-col items-center overflow-hidden bg-muted"
        style={{ width: CURVE_VIEW_WIDTH - viewCurve[3].x }}
      >
        <Tooltip>
          <TooltipTrigger className="m-2 text-xs text-muted-foreground">
            Key End Deadzone
          </TooltipTrigger>
          <TooltipContent className="max-w-sm text-wrap">
            Maximum gamepad analog input will be sent. For joysticks, the angle
            will snap to the nearest 45 degree, functioning similar to a D-Pad.
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
