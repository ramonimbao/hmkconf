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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { DEFAULT_RT_DOWN } from "@/constants/libhmk/actuation"
import { optMap, partitionIntArray } from "@/lib/utils"
import { useGetActuationMap } from "@/queries/get-actuation-map"
import { useSetActuationMap } from "@/queries/set-actuation-map"
import { HMKActuation } from "@/types/libhmk"

import {
  DistanceSlider,
  DistanceSliderProvider,
} from "../common/distance-slider"
import { Switch } from "../common/switch"

export function PerformanceMenu() {
  const {
    profile,
    performance: { keys },
  } = useConfigurator()

  const { isSuccess, data: actuationMap } = useGetActuationMap({ profile })
  const { mutate: setActuationMap } = useSetActuationMap({ profile })

  const disabled = !isSuccess || keys.length === 0

  const rtEnabled = optMap(actuationMap?.[keys[0]]?.rtDown, (x) => x > 0)
  const separatedRT = optMap(actuationMap?.[keys[0]]?.rtUp, (x) => x > 0)

  const updateActuationMap = (f: (actuation: HMKActuation) => HMKActuation) =>
    !disabled &&
    partitionIntArray(keys).forEach(([offset, len]) =>
      setActuationMap({
        offset,
        actuation: Array(len).fill(f(actuationMap[keys[0]])),
      }),
    )

  return (
    <div className="grid size-full grid-cols-[minmax(0,1fr)_28rem]">
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-4">
          <DistanceSliderProvider
            description="Set the specific distance at which a key press and release is registered."
            disabled={disabled}
            title="Actuation Point"
          >
            <DistanceSlider
              committedValue={actuationMap?.[keys[0]]?.actuationPoint}
              onCommit={(actuationPoint) =>
                updateActuationMap((actuation) => ({
                  ...actuation,
                  actuationPoint,
                }))
              }
            />
          </DistanceSliderProvider>
          <DistanceSliderProvider
            description={
              separatedRT
                ? "Set the minimum distance change required for Rapid Trigger to register a key press."
                : "Set the minimum distance change required for Rapid Trigger to register a key press or release."
            }
            disabled={disabled || !rtEnabled}
            title={
              separatedRT
                ? "Rapid Trigger Press Sensitivity"
                : "Rapid Trigger Sensitivity"
            }
          >
            <DistanceSlider
              committedValue={actuationMap?.[keys[0]]?.rtDown}
              onCommit={(rtDown) =>
                updateActuationMap((actuation) => ({ ...actuation, rtDown }))
              }
            />
          </DistanceSliderProvider>
          {separatedRT && (
            <DistanceSliderProvider
              description="Set the minimum distance change required for Rapid Trigger to register a key release."
              disabled={disabled || !rtEnabled}
              title="Rapid Trigger Release Sensitivity"
            >
              <DistanceSlider
                committedValue={actuationMap?.[keys[0]]?.rtUp}
                onCommit={(rtUp) =>
                  updateActuationMap((actuation) => ({ ...actuation, rtUp }))
                }
              />
            </DistanceSliderProvider>
          )}
        </div>
      </FixedScrollArea>
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-4">
          <Switch
            checked={rtEnabled}
            description="Rapid Trigger registers key presses and releases based on changes in key distance rather than absolute position. It activates and deactivates at the actuation point."
            disabled={disabled}
            id="rapid-trigger"
            onCheckedChange={(checked) =>
              updateActuationMap((actuation) => ({
                ...actuation,
                rtDown: checked ? DEFAULT_RT_DOWN : 0,
                rtUp: 0,
                continuous: false,
              }))
            }
            title="Enable Rapid Trigger"
          />
          <Switch
            checked={separatedRT}
            description="Configure sensitivity for key presses and releases independently."
            disabled={disabled || !rtEnabled}
            id="separate-rt"
            onCheckedChange={(checked) =>
              updateActuationMap((actuation) => ({
                ...actuation,
                rtUp: checked ? DEFAULT_RT_DOWN : 0,
              }))
            }
            title="Separate Press/Release Sensitivity"
          />
          <Switch
            checked={actuationMap?.[keys[0]]?.continuous}
            description="Deactivates Rapid Trigger only when the key is fully released, instead of at the actuation point."
            disabled={disabled || !rtEnabled}
            id="continuous-rapid-trigger"
            onCheckedChange={(checked) =>
              updateActuationMap((actuation) => ({
                ...actuation,
                continuous: checked,
              }))
            }
            title="Continuous Rapid Trigger"
          />
        </div>
      </FixedScrollArea>
    </div>
  )
}
