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
  DistanceSlider,
  DistanceSliderProvider,
} from "@/components/configurator/common/distance-slider"
import { Switch } from "@/components/configurator/common/switch"
import { useConfiguratorGlobal } from "@/components/providers/configurator-provider"
import { DEFAULT_RT_DOWN } from "@/constants/libhmk/actuation"
import { SWITCH_DISTANCE_UNIT } from "@/constants/ui"
import { distanceToUnit } from "@/lib/distance"
import { optMap, partitionIntArray } from "@/lib/utils"
import { useGetActuationMap } from "@/queries/get-actuation-map"
import { useSetActuationMap } from "@/queries/set-actuation-map"
import { HMKActuation } from "@/types/libhmk"

import { useNullBind } from "."
import { useAdvancedKeysConfig } from ".."

export function NullBindPerformanceTab() {
  const { profile } = useConfiguratorGlobal()
  const {
    advancedKey: { key },
    updateAdvancedKey,
  } = useAdvancedKeysConfig()
  const { action } = useNullBind()

  const { isSuccess, data: actuationMap } = useGetActuationMap({ profile })
  const { mutate: setActuationMap } = useSetActuationMap({ profile })

  const updateActuationMap = (f: (actuation: HMKActuation) => HMKActuation) =>
    isSuccess &&
    partitionIntArray([key, action.secondaryKey]).forEach(([offset, len]) =>
      setActuationMap({
        offset,
        actuation: Array(len).fill(f(actuationMap[key])),
      }),
    )

  return (
    <div className="flex flex-col gap-4">
      <Switch
        checked={optMap(actuationMap?.[key]?.rtDown, (x) => x > 0)}
        disabled={!isSuccess}
        description="Enable Rapid Trigger to compare keys only when Rapid Trigger registers a key press. Additional Rapid Trigger options are available in the Performance tab."
        id="rapid-trigger"
        onCheckedChange={(rtEnabled) =>
          updateActuationMap((actuation) => ({
            ...actuation,
            rtDown: rtEnabled ? DEFAULT_RT_DOWN : 0,
            rtUp: 0,
            continuous: false,
          }))
        }
        title="Enable Rapid Trigger"
      />
      <DistanceSliderProvider
        description="Set the actuation point at which Null Bind becomes active."
        disabled={!isSuccess}
        title="Actuation Point"
      >
        <DistanceSlider
          committedValue={actuationMap?.[key]?.actuationPoint}
          max={
            action.bottomOutPoint > 0
              ? distanceToUnit(action.bottomOutPoint)
              : SWITCH_DISTANCE_UNIT
          }
          onCommit={(actuationPoint) =>
            isSuccess &&
            partitionIntArray([key, action.secondaryKey]).map(([offset, len]) =>
              setActuationMap({
                offset,
                actuation: Array(len).fill({
                  ...actuationMap[key],
                  actuationPoint,
                }),
              }),
            )
          }
        />
      </DistanceSliderProvider>
      {action.bottomOutPoint > 0 && (
        <DistanceSliderProvider
          description="Set the actuation point at which the key is considered fully pressed."
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
      )}
    </div>
  )
}
