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

import { useGetActuationMap } from "@/api/use-get-actuation-map"
import { useSetActuationMap } from "@/api/use-set-actuation-map"
import { useConfigurator } from "@/components/providers/configurator-provider"
import {
  DEFAULT_ACTUATION,
  DEFAULT_RT_DOWN,
  SWITCH_DISTANCE,
} from "@/constants/devices"
import { HMKActuation } from "@/types/libhmk"
import { useEffect, useState } from "react"
import { DistanceSlider } from "../common/distance-slider"
import { Switch } from "../common/switch"

export function ActuationSettings() {
  const {
    profile,
    performance: { keys },
  } = useConfigurator()

  const { isSuccess, data: actuationMap } = useGetActuationMap(profile)
  const { mutate: setActuationMap } = useSetActuationMap(profile)

  const disabled = !isSuccess || keys.length === 0

  const [uiActuation, setUIActuation] =
    useState<HMKActuation>(DEFAULT_ACTUATION)

  const updateActuation = (actuation: HMKActuation) => {
    if (disabled) {
      return
    }

    const minKey = Math.min(...keys)
    const maxKey = Math.max(...keys)
    const newActuationMap = actuationMap.slice(minKey, maxKey + 1)

    for (const key of keys) {
      newActuationMap[key - minKey] = actuation
    }

    setActuationMap({
      start: minKey,
      actuationMap: newActuationMap,
    })
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    setUIActuation(
      keys.length === 0
        ? DEFAULT_ACTUATION
        : actuationMap[keys[keys.length - 1]],
    )
  }, [actuationMap, isSuccess, keys])

  return (
    <div className="mx-auto flex w-full max-w-5xl">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <DistanceSlider
          disabled={disabled}
          title="Actuation Point"
          description="Set the distance at which the key press is registered."
          min={1}
          max={SWITCH_DISTANCE}
          distance={uiActuation.actuationPoint}
          onDistanceChange={(actuationPoint) =>
            setUIActuation({ ...uiActuation, actuationPoint })
          }
          onDistanceCommit={() => updateActuation(uiActuation)}
        />
        {uiActuation.rtDown > 0 && (
          <>
            <DistanceSlider
              disabled={disabled}
              title={
                uiActuation.rtUp === 0
                  ? "Rapid Trigger Sensitivity"
                  : "Rapid Trigger Press Sensitivity"
              }
              description={
                uiActuation.rtUp === 0
                  ? "Set the distance change required to register a key press when Rapid Trigger is active."
                  : "Set the press distance required to register a key press when Rapid Trigger is active."
              }
              min={1}
              max={SWITCH_DISTANCE}
              distance={uiActuation.rtDown}
              onDistanceChange={(rtDown) =>
                setUIActuation({ ...uiActuation, rtDown })
              }
              onDistanceCommit={() => updateActuation(uiActuation)}
            />
            {uiActuation.rtUp > 0 && (
              <DistanceSlider
                disabled={disabled}
                title="Rapid Trigger Release Sensitivity"
                description="Set the release distance required to register a key release when Rapid Trigger is active."
                min={1}
                max={SWITCH_DISTANCE}
                distance={uiActuation.rtUp}
                onDistanceChange={(rtUp) =>
                  setUIActuation({ ...uiActuation, rtUp })
                }
                onDistanceCommit={() => updateActuation(uiActuation)}
              />
            )}
          </>
        )}
      </div>
      <div className="flex w-96 flex-col gap-4 p-4">
        <Switch
          disabled={disabled}
          id="rapid-trigger"
          title="Rapid Trigger"
          description="Rapid Trigger registers a key press or release based on the change in key position and the direction of that change. It activates when the key is pressed past the actuation point and deactivates when the key is released past the actuation point."
          checked={uiActuation.rtDown > 0}
          onCheckedChange={(rtEnabled) =>
            updateActuation({
              ...uiActuation,
              rtDown: rtEnabled ? DEFAULT_RT_DOWN : 0,
              rtUp: 0,
              continuous: false,
            })
          }
        />
        {uiActuation.rtDown > 0 && (
          <>
            <Switch
              disabled={disabled}
              id="separate-sensitivity"
              title="Separate Press/Release Sensitivity"
              description="Allow Rapid Trigger to have different sensitivity settings for key press and key release."
              checked={uiActuation.rtUp > 0}
              onCheckedChange={(separateSensitivityEnabled) =>
                updateActuation({
                  ...uiActuation,
                  rtUp: separateSensitivityEnabled ? uiActuation.rtDown : 0,
                })
              }
            />
            <Switch
              disabled={disabled}
              id="continuous"
              title="Continuous Rapid Trigger"
              description="Deactivate Rapid Trigger only when the key is fully released."
              checked={uiActuation.continuous}
              onCheckedChange={(continuous) =>
                updateActuation({ ...uiActuation, continuous })
              }
            />
          </>
        )}
      </div>
    </div>
  )
}
