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

import { produce } from "immer"
import { useRef, useState } from "react"
import Draggable from "react-draggable"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CURVE_VIEW_HEIGHT, CURVE_VIEW_WIDTH } from "@/constants/gamepad"
import { displayDistance } from "@/lib/distance"
import { viewPointToCurve } from "@/lib/gamepad"
import { cn } from "@/lib/utils"

import { useAnalogCurve } from "."

function AnalogCurveDraggableNode({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("size-4 rounded-full bg-accent-foreground", className)}
      {...props}
    >
      <span className="sr-only">Analog Curve Point</span>
    </div>
  )
}

export function AnalogCurveDraggable({ index }: { index: number }) {
  const { viewCurve, setViewCurve, onCurveCommit } = useAnalogCurve()
  const point = viewCurve[index]
  const curvePoint = viewPointToCurve(point)

  const ref = useRef({} as HTMLDivElement)
  const [dragging, setDragging] = useState(false)

  const onPositionChange = (position: { x: number; y: number }) =>
    setViewCurve(
      produce(viewCurve, (draft) => {
        draft[index] = position
      }),
    )

  return (
    <Draggable
      bounds={{
        left: index > 0 ? viewCurve[index - 1].x + 1 : 0,
        right: index < 3 ? viewCurve[index + 1].x - 1 : CURVE_VIEW_WIDTH,
        top: 0,
        bottom: CURVE_VIEW_HEIGHT,
      }}
      nodeRef={ref}
      onDrag={(_, position) => onPositionChange(position)}
      onStart={(_, position) => {
        setDragging(true)
        onPositionChange(position)
      }}
      onStop={() => {
        setDragging(false)
        onCurveCommit()
      }}
      position={point}
    >
      <div className="absolute z-30 -translate-1/2 rounded-full" ref={ref}>
        {dragging ? (
          <AnalogCurveDraggableNode />
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <AnalogCurveDraggableNode />
            </TooltipTrigger>
            <TooltipContent>
              ({displayDistance(curvePoint.x)}mm, {curvePoint.y})
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </Draggable>
  )
}
