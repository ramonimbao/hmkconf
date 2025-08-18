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

import { GripVerticalIcon } from "lucide-react"

import { DKS_ACTION_SIZE } from "@/constants/advanced-keys"
import {
  dksIntervalLeft,
  dksIntervalWidth,
  intervalsToBitmap,
} from "@/lib/advanced-keys"

import { useDynamicKeystrokeRow } from "./dynamic-keystroke-row"

export function DynamicKeystrokeBar({
  intervalIndex,
}: {
  intervalIndex: number
}) {
  const { currentIntervals, onBitmapCommit } = useDynamicKeystrokeRow()
  const interval = currentIntervals[intervalIndex]

  return (
    <>
      <div
        className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary shadow-xs"
        onClick={() =>
          onBitmapCommit(
            intervalsToBitmap(
              currentIntervals.filter((_, i) => i !== intervalIndex),
            ),
          )
        }
        style={{
          left: dksIntervalLeft(interval),
          width: dksIntervalWidth(interval),
          height: DKS_ACTION_SIZE,
        }}
      >
        <span className="sr-only">Delete Action</span>
      </div>
      <div
        className="absolute top-1/2 z-20 flex h-4 w-3 -translate-1/2 items-center justify-center rounded-xs border bg-card"
        style={{ left: dksIntervalLeft(interval) + dksIntervalWidth(interval) }}
      >
        <GripVerticalIcon className="size-2.5" />
      </div>
    </>
  )
}
