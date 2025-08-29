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

import { InfoIcon } from "lucide-react"

import {
  DistanceSlider,
  DistanceSliderProvider,
} from "@/components/configurator/common/distance-slider"
import { useConfiguratorGlobal } from "@/components/providers/configurator-provider"
import { distanceToUnit } from "@/lib/distance"
import { optMap } from "@/lib/utils"
import { useGetActuationMap } from "@/queries/get-actuation-map"
import { useSetActuationMap } from "@/queries/set-actuation-map"

import { useDynamicKeystroke } from "."
import { useAdvancedKeysConfig } from ".."

export function DynamicKeystrokePerformanceTab() {
  const { profile } = useConfiguratorGlobal()
  const {
    advancedKey: { key },
    updateAdvancedKey,
  } = useAdvancedKeysConfig()
  const { action } = useDynamicKeystroke()

  const { isSuccess, data: actuationMap } = useGetActuationMap({ profile })
  const { mutate: setActuationMap } = useSetActuationMap({ profile })

  return (
    <div className="flex flex-col gap-4">
      <DistanceSliderProvider
        description='Set the actuation point for "Key press" and "Key release" actions.'
        disabled={!isSuccess}
        title="Actuation Point"
      >
        <DistanceSlider
          committedValue={actuationMap?.[key]?.actuationPoint}
          max={distanceToUnit(action.bottomOutPoint)}
          onCommit={(actuationPoint) =>
            isSuccess &&
            setActuationMap({
              offset: key,
              actuation: [
                {
                  ...actuationMap[key],
                  actuationPoint,
                },
              ],
            })
          }
        />
      </DistanceSliderProvider>
      <DistanceSliderProvider
        description='Set the actuation point for "Key fully pressed" and "Key released from fully pressed" actions.'
        disabled={!isSuccess}
        title="Bottom Out Point"
      >
        <DistanceSlider
          committedValue={action.bottomOutPoint}
          min={optMap(actuationMap?.[key]?.actuationPoint, distanceToUnit)}
          onCommit={(bottomOutPoint) =>
            updateAdvancedKey((advancedKey) => ({
              ...advancedKey,
              action: {
                ...action,
                bottomOutPoint,
              },
            }))
          }
        />
      </DistanceSliderProvider>
      <div className="flex items-center gap-2 text-muted-foreground">
        <InfoIcon className="size-4" />
        <p className="text-sm">
          Rapid Trigger is automatically disabled for Dynamic Keystroke keys.
        </p>
      </div>
    </div>
  )
}
