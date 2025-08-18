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

import { PlusIcon } from "lucide-react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { DKS_ACTION_SIZE } from "@/constants/advanced-keys"
import { dksIntervalLeft, getBitmapIntervals } from "@/lib/advanced-keys"
import { HMKDKSAction } from "@/types/libhmk"

import { DynamicKeystrokeBar } from "./dynamic-keystroke-bar"
import { DynamicKeyStrokeDraggable } from "./dynamic-keystroke-draggable"

type DynamicKeystrokeRowProps = {
  intervals: [number, number][]
  currentBitmap: HMKDKSAction[]
  currentIntervals: [number, number][]
  onBitmapCommit: (bitmap: HMKDKSAction[]) => void
  setCurrentBitmap: (currentBitmap: HMKDKSAction[]) => void
}

const DynamicKeystrokeRowContext = createContext({} as DynamicKeystrokeRowProps)

export const useDynamicKeystrokeRow = () =>
  useContext(DynamicKeystrokeRowContext)

export function DynamicKeystrokeRow({
  row,
  bitmap,
  onBitmapCommit,
}: {
  row: number
  bitmap: HMKDKSAction[]
  onBitmapCommit: (value: HMKDKSAction[]) => void
}) {
  const intervals = useMemo(() => getBitmapIntervals(bitmap), [bitmap])
  const [currentBitmap, setCurrentBitmap] = useState<HMKDKSAction[]>(bitmap)
  const currentIntervals = useMemo(
    () => getBitmapIntervals(currentBitmap),
    [currentBitmap],
  )

  useEffect(() => setCurrentBitmap(bitmap), [bitmap])

  return (
    <DynamicKeystrokeRowContext.Provider
      value={{
        intervals,
        currentBitmap,
        currentIntervals,
        onBitmapCommit,
        setCurrentBitmap,
      }}
    >
      <div className="relative" style={{ gridArea: `action${row}` }}>
        {[...Array(4)].map((_, col) => (
          <div
            key={col}
            className="absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-xs dark:border-input dark:bg-input/30"
            style={{
              left: dksIntervalLeft([col, col]),
              width: DKS_ACTION_SIZE,
              height: DKS_ACTION_SIZE,
            }}
          >
            <PlusIcon className="size-4" />
          </div>
        ))}
        {currentIntervals.map((_, i) => (
          <DynamicKeystrokeBar key={i} intervalIndex={i} />
        ))}
        {[...Array(4)].map((_, col) => (
          <DynamicKeyStrokeDraggable key={col} col={col} />
        ))}
      </div>
    </DynamicKeystrokeRowContext.Provider>
  )
}
