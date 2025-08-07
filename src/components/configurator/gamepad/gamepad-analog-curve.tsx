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

import { useGetGamepadOptions } from "@/api/use-get-gamepad-options"
import { useSetGamepadOptions } from "@/api/use-set-gamepad-options"
import { useConfigurator } from "@/components/providers/configurator-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  GAMEPAD_ANALOG_CURVE_MIN_X,
  GAMEPAD_ANALOG_CURVE_PRESETS,
} from "@/constants/gamepad"
import { cn, displayDistance } from "@/lib/utils"
import { HMKGamepadAnalogCurve } from "@/types/libhmk"
import { produce } from "immer"
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

const VIEW_WIDTH = 400
const VIEW_HEIGHT = 200

const analogCurveToView = ({ x, y }: { x: number; y: number }) => ({
  x:
    ((x - GAMEPAD_ANALOG_CURVE_MIN_X) * VIEW_WIDTH) /
    (255 - GAMEPAD_ANALOG_CURVE_MIN_X),
  y: (255 - y) * (VIEW_HEIGHT / 255),
})
const analogCurveViewToCurve = ({ x, y }: { x: number; y: number }) => ({
  x:
    Math.round((x * (255 - GAMEPAD_ANALOG_CURVE_MIN_X)) / VIEW_WIDTH) +
    GAMEPAD_ANALOG_CURVE_MIN_X,
  y: Math.round(255 - (y * 255) / VIEW_HEIGHT),
})

interface GamepadAnalogCurveState {
  uiAnalogCurve: HMKGamepadAnalogCurve
  setUIAnalogCurve: Dispatch<HMKGamepadAnalogCurve>
  onAnalogCurveChange: () => void
}

const GamepadAnalogCurveContext = createContext<GamepadAnalogCurveState>(
  {} as GamepadAnalogCurveState,
)

function GamepadAnalogCurveGraph() {
  const { uiAnalogCurve } = useContext(GamepadAnalogCurveContext)

  const svgPoints = uiAnalogCurve.map(({ x, y }) => `${x},${y}`)

  return (
    <>
      <svg
        className="size-full"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <polyline
          points={svgPoints.join(",")}
          vectorEffect="non-scaling-stroke"
          className="fill-none stroke-muted-foreground stroke-2"
        />
      </svg>
      <div
        className="absolute inset-y-0 left-0 flex flex-col items-center overflow-hidden bg-muted"
        style={{ width: uiAnalogCurve[0].x }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="m-2 text-xs text-muted-foreground">
              Key Start Deadzone
            </TooltipTrigger>
            <TooltipContent className="max-w-56">
              No analog value will be sent.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className="absolute inset-y-0 right-0 flex flex-col items-center overflow-hidden bg-muted"
        style={{ width: VIEW_WIDTH - uiAnalogCurve[3].x }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="m-2 text-xs text-muted-foreground">
              Key End Deadzone
            </TooltipTrigger>
            <TooltipContent className="max-w-56">
              Send maximum analog value. For joysticks, the vector will snap to
              cardinal directions.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

function GamepadAnalogCurvePoint({ i }: { i: number }) {
  const { uiAnalogCurve, setUIAnalogCurve, onAnalogCurveChange } = useContext(
    GamepadAnalogCurveContext,
  )
  const point = useMemo(() => uiAnalogCurve[i], [uiAnalogCurve, i])
  const curvePoint = useMemo(() => analogCurveViewToCurve(point), [point])

  const ref = useRef<HTMLDivElement>({} as HTMLDivElement)

  return (
    <Draggable
      nodeRef={ref}
      position={point}
      bounds={{
        left: i === 0 ? 0 : uiAnalogCurve[i - 1].x + 1,
        top: 0,
        right: i === 3 ? VIEW_WIDTH : uiAnalogCurve[i + 1].x - 1,
        bottom: VIEW_HEIGHT,
      }}
      onDrag={(_, newPoint) => {
        setUIAnalogCurve(
          produce(uiAnalogCurve, (draft) => {
            draft[i] = newPoint
          }),
        )
      }}
      onStop={() => onAnalogCurveChange()}
    >
      <div ref={ref} className="absolute z-30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="size-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-foreground"></div>
            </TooltipTrigger>
            <TooltipContent className="max-w-56">
              {`(${displayDistance(curvePoint.x)}mm, ${curvePoint.y})`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Draggable>
  )
}

export function GamepadAnalogCurve({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { profile } = useConfigurator()

  const { isSuccess, data: gamepadOptions } = useGetGamepadOptions(profile)
  const { mutate: setGamepadOptions } = useSetGamepadOptions(profile)

  const [uiAnalogCurve, setUIAnalogCurve] = useState<HMKGamepadAnalogCurve>(
    GAMEPAD_ANALOG_CURVE_PRESETS[0].curve.map(analogCurveToView),
  )

  const onAnalogCurveChange = () => {
    if (isSuccess) {
      setGamepadOptions({
        ...gamepadOptions,
        analogCurve: uiAnalogCurve.map(analogCurveViewToCurve),
      })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setUIAnalogCurve(gamepadOptions.analogCurve.map(analogCurveToView))
    }
  }, [isSuccess, gamepadOptions])

  return (
    <GamepadAnalogCurveContext.Provider
      value={{ uiAnalogCurve, setUIAnalogCurve, onAnalogCurveChange }}
    >
      <div
        className={cn("grid w-full", className)}
        style={{
          gridTemplateRows: `3rem calc(${VIEW_HEIGHT}px - 6rem) 3rem 2rem`,
          gridTemplateColumns: `3rem 4rem calc(${VIEW_WIDTH}px - 8rem) 4rem`,
          gridTemplateAreas: `"analog-max curve-view curve-view curve-view"
                              "analog-label curve-view curve-view curve-view"
                              "analog-min curve-view curve-view curve-view"
                              ". distance-min distance-label distance-max"`,
        }}
        {...props}
      >
        <div
          className="flex flex-col items-center"
          style={{ gridArea: "analog-max" }}
        >
          <p className="text-xs text-muted-foreground">255</p>
        </div>
        <div
          className="flex flex-col items-center justify-center"
          style={{ gridArea: "analog-label" }}
        >
          <p className="-rotate-90 text-nowrap text-xs text-muted-foreground">
            Analog Value
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-end"
          style={{ gridArea: "analog-min" }}
        >
          <p className="text-xs text-muted-foreground">0</p>
        </div>
        <div className="flex items-center" style={{ gridArea: "distance-min" }}>
          <p className="text-xs text-muted-foreground">
            {displayDistance(GAMEPAD_ANALOG_CURVE_MIN_X)}mm
          </p>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ gridArea: "distance-label" }}
        >
          <p className="text-xs text-muted-foreground">Key Press Distance</p>
        </div>
        <div
          className="flex items-center justify-end"
          style={{ gridArea: "distance-max" }}
        >
          <p className="text-xs text-muted-foreground">4.00mm</p>
        </div>
        <div className="relative border" style={{ gridArea: "curve-view" }}>
          {[...Array(4)].map((_, i) => (
            <GamepadAnalogCurvePoint key={i} i={i} />
          ))}
          <GamepadAnalogCurveGraph />
        </div>
      </div>
    </GamepadAnalogCurveContext.Provider>
  )
}
