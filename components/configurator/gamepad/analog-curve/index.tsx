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

import { createContext, useContext, useEffect, useState } from "react"

import { useConfigurator } from "@/components/providers/configurator-provider"
import { CURVE_VIEW_HEIGHT, CURVE_VIEW_WIDTH } from "@/constants/gamepad"
import { DEFAULT_ANALOG_CURVE } from "@/constants/libhmk/gamepad"
import { useDisplayGamepad } from "@/hooks/use-display-gamepad"
import { curvePointToView, viewPointToCurve } from "@/lib/gamepad"
import { useSetGamepadOptions } from "@/queries/set-gamepad-options"

import { AnalogCurveDraggable } from "./analog-curve-draggable"
import { AnalogCurveGraphic } from "./analog-curve-graphic"
import { AnalogCurveLabel } from "./analog-curve-label"

type AnalogCurveProps = {
  viewCurve: { x: number; y: number }[]
  setViewCurve: (viewCurve: { x: number; y: number }[]) => void
  onCurveCommit: () => void
}

const AnalogCurveContext = createContext({} as AnalogCurveProps)

export const useAnalogCurve = () => useContext(AnalogCurveContext)

export function GamepadAnalogCurve() {
  const { profile } = useConfigurator()

  const { isSuccess, gamepadOptions } = useDisplayGamepad({
    profile,
  })
  const { mutate: setGamepadOptions } = useSetGamepadOptions({ profile })

  const [viewCurve, setViewCurve] = useState(
    DEFAULT_ANALOG_CURVE.map(curvePointToView),
  )

  const onCurveCommit = () =>
    isSuccess &&
    setGamepadOptions({
      options: {
        ...gamepadOptions,
        analogCurve: viewCurve.map(viewPointToCurve),
      },
    })

  useEffect(() => {
    if (isSuccess) {
      setViewCurve(gamepadOptions.analogCurve.map(curvePointToView))
    }
  }, [gamepadOptions, isSuccess])

  return (
    <AnalogCurveContext.Provider
      value={{ viewCurve, setViewCurve, onCurveCommit }}
    >
      <div
        className="grid"
        style={{
          gridTemplateRows: `3rem calc(${CURVE_VIEW_HEIGHT}px - 6rem) 3rem 2rem`,
          gridTemplateColumns: `3rem 4rem calc(${CURVE_VIEW_WIDTH}px - 8rem) 4rem`,
          gridTemplateAreas: `
          "analogMax curve curve curve"
          "analogLabel curve curve curve"
          "analogMin curve curve curve"
          "none switchMin switchLabel switchMax"
        `,
        }}
      >
        <AnalogCurveLabel />
        <AnalogCurveGraphic />
        <div className="relative" style={{ gridArea: "curve" }}>
          {[...Array(4)].map((_, i) => (
            <AnalogCurveDraggable key={i} index={i} />
          ))}
        </div>
      </div>
    </AnalogCurveContext.Provider>
  )
}
