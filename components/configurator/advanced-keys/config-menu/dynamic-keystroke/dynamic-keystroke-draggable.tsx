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
import { useRef } from "react"
import Draggable from "react-draggable"

import { DKS_ACTION_SIZE } from "@/constants/advanced-keys"
import {
  dksIntervalLeft,
  dksIntervalWidth,
  intervalsToBitmap,
} from "@/lib/advanced-keys"

import { useDynamicKeystrokeRow } from "./dynamic-keystroke-row"

export function DynamicKeyStrokeDraggable({ col }: { col: number }) {
  const { currentBitmap, intervals, onBitmapCommit, setCurrentBitmap } =
    useDynamicKeystrokeRow()

  const index = intervals.findIndex(([l]) => l === col)
  const interval: [number, number] =
    index === -1 ? [col, col] : intervals[index]
  const ref = useRef({} as HTMLDivElement)

  const onPositionChange = (x: number) => {
    const upperBound = intervals.find(([l]) => l > col)?.[0] ?? 3
    const currBarWidth = Math.min(
      x + dksIntervalWidth(interval) - (index === -1 ? DKS_ACTION_SIZE / 2 : 0),
      dksIntervalWidth([col, upperBound]),
    )

    let closestCol = col
    let closestDistance = currBarWidth

    for (let i = col + 1; i <= upperBound; i++) {
      const distance = Math.abs(dksIntervalWidth([col, i]) - currBarWidth)

      if (distance < closestDistance) {
        closestCol = i
        closestDistance = distance
      }
    }

    setCurrentBitmap(
      intervalsToBitmap(
        produce(intervals, (draft) => {
          if (index === -1) {
            draft.push([col, closestCol])
            draft.sort(([a], [b]) => a - b)
          } else {
            draft[index] = [col, closestCol]
          }
        }),
      ),
    )
  }

  if (intervals.some(([l, r]) => l < col && col < r)) {
    // No draggable if it is inside an interval
    return null
  }

  return (
    <Draggable
      bounds={{ top: 0, bottom: 0 }}
      nodeRef={ref}
      onDrag={(_, { x }) => onPositionChange(x)}
      onStart={(_, { x }) => onPositionChange(x)}
      onStop={() => onBitmapCommit(currentBitmap)}
      position={{ x: 0, y: 0 }}
    >
      {index === -1 ? (
        <div
          className="absolute top-1/2 z-30 -translate-y-1/2 rounded-full"
          ref={ref}
          style={{
            left: dksIntervalLeft([col, col]),
            width: DKS_ACTION_SIZE,
            height: DKS_ACTION_SIZE,
          }}
        >
          <span className="sr-only">Add Action</span>
        </div>
      ) : (
        <div
          className="absolute top-1/2 z-30 h-4 w-3 -translate-1/2 rounded-xs"
          ref={ref}
          style={{
            left: dksIntervalLeft(interval) + dksIntervalWidth(interval),
          }}
        >
          <span className="sr-only">Drag Action</span>
        </div>
      )}
    </Draggable>
  )
}
