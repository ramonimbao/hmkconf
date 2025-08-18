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

import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { ANALOG_CURVE_PRESETS } from "@/constants/gamepad"
import { MAX_DISTANCE, MIN_DISTANCE } from "@/constants/libhmk"
import { useDisplayGamepad } from "@/hooks/use-display-gamepad"
import { useSetGamepadOptions } from "@/queries/set-gamepad-options"

export function GamepadAnalogCurvePresets() {
  const { profile } = useConfigurator()

  const { isSuccess, gamepadOptions } = useDisplayGamepad({
    profile,
  })
  const { mutate: setGamepadOptions } = useSetGamepadOptions({ profile })

  return (
    <div className="flex flex-wrap gap-2">
      {ANALOG_CURVE_PRESETS.map(({ name, curve }, i) => (
        <Button
          key={i}
          className="size-24 flex-col"
          disabled={!isSuccess}
          onClick={() =>
            isSuccess &&
            setGamepadOptions({
              options: {
                ...gamepadOptions,
                analogCurve: curve,
              },
            })
          }
          size="icon"
          variant="outline"
        >
          <svg
            className="size-10"
            viewBox={`${MIN_DISTANCE} 0 ${MAX_DISTANCE - MIN_DISTANCE} 255`}
            preserveAspectRatio="none"
          >
            <polygon
              className="fill-accent-foreground/30"
              points={[
                ...curve.map(({ x, y }) => `${x},${255 - y}`),
                `${curve[3].x},255`,
                `${curve[0].x},255`,
              ].join(",")}
            />
            <polyline
              className="fill-none stroke-accent-foreground stroke-3"
              points={curve.map(({ x, y }) => `${x},${255 - y}`).join(",")}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {name}
        </Button>
      ))}
    </div>
  )
}
