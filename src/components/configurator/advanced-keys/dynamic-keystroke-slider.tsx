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

"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { DeviceDKSAction } from "@/types/devices"
import { produce } from "immer"
import {
  ArrowDownFromLine,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowUpToLine,
  GripVertical,
  Plus,
} from "lucide-react"
import {
  createContext,
  Dispatch,
  HTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Draggable from "react-draggable"

const NODE_SIZE = 32
const NODE_SPACING = 40
const SLIDER_GAP = 72
const SLIDER_WIDTH = SLIDER_GAP * 3 + NODE_SIZE
const SLIDER_HEIGHT = NODE_SIZE
const NODE_TOP = SLIDER_HEIGHT / 2 - NODE_SIZE / 2
const GRIP_WIDTH = 12
const GRIP_HEIGHT = 16
const GRIP_OFFSET = NODE_SIZE - 10
const GRIP_TOP = SLIDER_HEIGHT / 2 - GRIP_HEIGHT / 2

const nodeLeft = (i: number) => SLIDER_GAP * i

const getIntervals = (bitmap: DeviceDKSAction[]) => {
  const intervals: [number, number][] = []

  let start = -1
  for (let i = 0; i < 4; i++) {
    if (bitmap[i] === DeviceDKSAction.HOLD) {
      continue
    }
    if (start !== -1) {
      intervals.push([start, i])
      start = -1
    }
    if (bitmap[i] === DeviceDKSAction.PRESS) {
      start = i
    } else if (bitmap[i] === DeviceDKSAction.TAP) {
      intervals.push([i, i])
    }
  }

  return intervals
}

const intervalWidth = ([l, r]: [number, number]) =>
  l === r ? 0 : SLIDER_GAP * (r - l) - NODE_SPACING

interface DynamicKeystrokeSliderState {
  bitmap: DeviceDKSAction[]
  intervals: [number, number][]
  uiBitmap: DeviceDKSAction[]
  uiIntervals: [number, number][]
  onBitmapChange: (bitmap: DeviceDKSAction[]) => void
  setUIBitmap: Dispatch<DeviceDKSAction[]>
}

const DynamicKeystrokeSliderContext =
  createContext<DynamicKeystrokeSliderState>({} as DynamicKeystrokeSliderState)

function DynamicKeystrokeBar({ i }: { i: number }) {
  const { uiBitmap, uiIntervals, onBitmapChange } = useContext(
    DynamicKeystrokeSliderContext,
  )
  const interval = useMemo(
    () => uiIntervals.find(([l]) => l === i),
    [i, uiIntervals],
  )

  if (interval === undefined) {
    return <></>
  }

  return (
    <>
      <button
        className="absolute z-10 rounded-full bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        style={{
          width: NODE_SIZE + intervalWidth(interval),
          height: NODE_SIZE,
          top: NODE_TOP,
          left: nodeLeft(i),
        }}
        onClick={() =>
          onBitmapChange(
            produce(uiBitmap, (draft) => {
              for (let j = i + 1; j < interval[1]; j++) {
                draft[j] = DeviceDKSAction.HOLD
              }
              if (draft[interval[1]] === DeviceDKSAction.RELEASE) {
                draft[interval[1]] = DeviceDKSAction.HOLD
              }
              draft[i] = uiIntervals.some(([l, r]) => l !== r && r === i)
                ? DeviceDKSAction.RELEASE
                : DeviceDKSAction.HOLD
            }),
          )
        }
      >
        <span className="sr-only">Delete Action</span>
      </button>
      <div
        className="absolute z-20 flex items-center justify-center rounded-sm border bg-border"
        style={{
          width: GRIP_WIDTH,
          height: GRIP_HEIGHT,
          top: GRIP_TOP,
          left: nodeLeft(i) + GRIP_OFFSET + intervalWidth(interval),
        }}
      >
        <GripVertical className="size-2.5" />
      </div>
    </>
  )
}

function DynamicKeystrokeDraggable({ i }: { i: number }) {
  const { intervals, uiBitmap, uiIntervals, onBitmapChange, setUIBitmap } =
    useContext(DynamicKeystrokeSliderContext)
  const interval = useMemo<[number, number]>(
    () => intervals.find(([l]) => l === i) ?? [i, -1],
    [i, intervals],
  )
  const upperBound = useMemo(
    () => intervals.find(([l]) => l > i)?.[0] ?? 3,
    [i, intervals],
  )

  const ref = useRef<HTMLDivElement>({} as HTMLDivElement)

  const onDrag = (x: number) => {
    const clampedX = Math.max(
      0,
      Math.min(
        x + (interval[1] === -1 ? 0 : intervalWidth(interval)),
        intervalWidth([i, upperBound]),
      ),
    )

    let closest = i
    let closestDistance = clampedX
    for (let j = i + 1; j <= upperBound; j++) {
      const distance = Math.abs(clampedX - intervalWidth([i, j]))
      if (distance < closestDistance) {
        closest = j
        closestDistance = distance
      }
    }

    setUIBitmap(
      produce(uiBitmap, (draft) => {
        draft[i] = i === closest ? DeviceDKSAction.TAP : DeviceDKSAction.PRESS
        for (let j = i + 1; j < Math.max(interval[1], closest); j++) {
          draft[j] = DeviceDKSAction.HOLD
        }
        if (
          interval[1] !== -1 &&
          draft[interval[1]] === DeviceDKSAction.RELEASE
        ) {
          draft[interval[1]] = DeviceDKSAction.HOLD
        }
        if (draft[closest] === DeviceDKSAction.HOLD) {
          draft[closest] = DeviceDKSAction.RELEASE
        }
      }),
    )
  }

  if (uiIntervals.some(([l, r]) => l < i && i < r)) {
    return <></>
  }

  return (
    <Draggable
      nodeRef={ref}
      position={{ x: 0, y: 0 }}
      onStart={(_, { x }) => onDrag(x)}
      onDrag={(_, { x }) => onDrag(x)}
      onStop={() => onBitmapChange(uiBitmap)}
    >
      <div
        ref={ref}
        className={cn(
          "absolute z-30",
          interval[1] === -1
            ? "cursor-pointer rounded-full"
            : "cursor-ew-resize rounded-sm",
        )}
        style={
          interval[1] === -1
            ? {
                width: NODE_SIZE,
                height: NODE_SIZE,
                top: NODE_TOP,
                left: nodeLeft(i),
              }
            : {
                width: GRIP_WIDTH,
                height: GRIP_HEIGHT,
                top: GRIP_TOP,
                left: nodeLeft(i) + GRIP_OFFSET + intervalWidth(interval),
              }
        }
      ></div>
    </Draggable>
  )
}

interface DynamicKeystrokeSliderProps extends HTMLAttributes<HTMLDivElement> {
  bitmap: DeviceDKSAction[]
  onBitmapChange: (bitmap: DeviceDKSAction[]) => void
}

export function DynamicKeystrokeSlider({
  bitmap,
  onBitmapChange,
  className,
  style,
  ...props
}: DynamicKeystrokeSliderProps) {
  const [uiBitmap, setUIBitmap] = useState(Array(4).fill(DeviceDKSAction.HOLD))

  const intervals = useMemo(() => getIntervals(bitmap), [bitmap])
  const uiIntervals = useMemo(() => getIntervals(uiBitmap), [uiBitmap])

  useEffect(() => setUIBitmap(bitmap), [bitmap])

  return (
    <DynamicKeystrokeSliderContext.Provider
      value={{
        bitmap,
        intervals,
        uiBitmap,
        uiIntervals,
        onBitmapChange,
        setUIBitmap,
      }}
    >
      <div
        className={cn("relative flex items-center", className)}
        style={{
          width: SLIDER_WIDTH,
          height: SLIDER_HEIGHT,
          ...style,
        }}
        {...props}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i}>
            <div
              className="absolute inline-flex items-center justify-center rounded-full border bg-background"
              style={{
                width: NODE_SIZE,
                height: NODE_SIZE,
                top: NODE_TOP,
                left: nodeLeft(i),
              }}
            >
              <Plus className="size-4" />
            </div>
            <DynamicKeystrokeBar i={i} />
            <DynamicKeystrokeDraggable i={i} />
          </span>
        ))}
      </div>
    </DynamicKeystrokeSliderContext.Provider>
  )
}

const CELL_WIDTH = 16
const HEADER_METADATA = [
  {
    display: <ArrowDownFromLine />,
    tooltip: "Key pressed past actuation point",
  },
  {
    display: <ArrowDownToLine />,
    tooltip: "Key pressed past bottom-out point",
  },
  {
    display: <ArrowUpFromLine />,
    tooltip: "Key released past bottom-out point",
  },
  {
    display: <ArrowUpToLine />,
    tooltip: "Key released past actuation point",
  },
]

const cellLeft = (i: number) => SLIDER_GAP * i + NODE_SIZE / 2 - CELL_WIDTH / 2

export function DynamicKeystrokeSliderHeader() {
  return (
    <div className="relative h-4" style={{ width: SLIDER_WIDTH }}>
      {HEADER_METADATA.map(({ display, tooltip }, i) => (
        <div
          key={i}
          className="absolute top-0 flex flex-col items-center gap-2 [&_svg]:size-4"
          style={{
            width: CELL_WIDTH,
            left: cellLeft(i),
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{display}</TooltipTrigger>
              <TooltipContent className="max-w-56">{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  )
}
