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

import { useGetActuationMap } from "@/api/use-get-actuation_map"
import { useSetActuationMap } from "@/api/use-set-actuation-map"
import { useSetAdvancedKeys } from "@/api/use-set-advanced-keys"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DEFAULT_ACTUATION,
  DEFAULT_BOTTOM_OUT_POINT,
  DEFAULT_RT_DOWN,
  NULL_BIND_BEHAVIOR_METADATA,
  SWITCH_DISTANCE,
} from "@/constants/devices"
import { distanceToSwitchDistance } from "@/lib/utils"
import { DeviceActuation, DeviceAKNullBind } from "@/types/devices"
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group"
import { produce } from "immer"
import { Circle, Info } from "lucide-react"
import { useEffect, useState } from "react"
import { DistanceSlider } from "../common/distance-slider"
import { Switch } from "../common/switch"
import { useAdvancedKeysEditor } from "./advanced-keys-editor"
import { KeyTesterTab } from "./key-tester-tab"

export function NullBindEditor() {
  const { profile } = useConfigurator()
  const { advancedKeys, akIndex } = useAdvancedKeysEditor()
  const ak = advancedKeys[akIndex].ak as DeviceAKNullBind

  const { isSuccess, data: actuationMap } = useGetActuationMap(profile)
  const { mutate: setActuationMap } = useSetActuationMap(profile)
  const { mutate: setAdvancedKeys } = useSetAdvancedKeys(profile)

  const [uiActuation, setUIActuation] = useState(DEFAULT_ACTUATION)
  const [uiAdvancedKey, setUIAdvancedKey] = useState(ak)

  const updateActuation = (actuation: DeviceActuation) =>
    isSuccess &&
    setActuationMap(
      produce(actuationMap, (draft) => {
        for (const key of [advancedKeys[akIndex].key, ak.secondaryKey]) {
          draft[key] = actuation
        }
      }),
    )

  const updateAdvancedKey = (ak: DeviceAKNullBind) =>
    setAdvancedKeys(
      produce(advancedKeys, (draft) => {
        draft[akIndex].ak = ak
      }),
    )

  useEffect(() => {
    if (isSuccess) {
      setUIActuation(actuationMap[advancedKeys[akIndex].key])
    }
  }, [actuationMap, advancedKeys, akIndex, isSuccess])

  useEffect(() => setUIAdvancedKey(ak), [ak])

  return (
    <div className="flex w-full gap-8">
      <div className="flex w-72 flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Configure Null Bind Behavior
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Select how to resolve the key events when both keys are pressed.
          </p>
          <RadioGroup
            value={ak.behavior.toString()}
            onValueChange={(value) =>
              updateAdvancedKey({ ...ak, behavior: parseInt(value) })
            }
            className="mt-3 grid gap-1"
          >
            {NULL_BIND_BEHAVIOR_METADATA.map((behaviorMetadata) => (
              <RadioGroupItem
                key={behaviorMetadata.behavior}
                value={behaviorMetadata.behavior.toString()}
                className="relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
              >
                <span className="absolute left-2 flex size-3.5 items-center justify-center">
                  <RadioGroupIndicator>
                    <Circle className="size-2 fill-current" />
                  </RadioGroupIndicator>
                </span>
                {behaviorMetadata.name}
                <span className="inline-flex flex-1 justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="size-4 text-current" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-56">
                        {behaviorMetadata.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col">
          <Switch
            disabled={!isSuccess}
            size="sm"
            id="alternative-bottom-out"
            title="Alternative Bottom Out Behavior"
            description="When both keys are bottomed out, register key press for both keys."
            checked={ak.bottomOutPoint > 0}
            onCheckedChange={(checked) =>
              updateAdvancedKey({
                ...ak,
                bottomOutPoint: checked ? DEFAULT_BOTTOM_OUT_POINT : 0,
              })
            }
          />
        </div>
        {ak.bottomOutPoint > 0 && (
          <DistanceSlider
            disabled={!isSuccess}
            size="sm"
            title="Bottom Out Point"
            description="Set the distance at which the key is bottomed out."
            {...(isSuccess && {
              min: distanceToSwitchDistance(
                actuationMap[advancedKeys[akIndex].key].actuationPoint,
              ),
            })}
            max={SWITCH_DISTANCE}
            distance={uiAdvancedKey.bottomOutPoint}
            onDistanceChange={(bottomOutPoint) =>
              setUIAdvancedKey({ ...uiAdvancedKey, bottomOutPoint })
            }
            onDistanceCommit={() => updateAdvancedKey(uiAdvancedKey)}
          />
        )}
      </div>
      <Tabs defaultValue="performance" className="flex flex-1 flex-col">
        <div>
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="key-tester">Key Tester</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="performance">
          <div className="flex flex-col gap-4 rounded-md border bg-card p-4 shadow-sm">
            <Switch
              disabled={!isSuccess}
              size="sm"
              id="rapid-trigger"
              title="Rapid Trigger"
              description="Enable Rapid Trigger to resolve key events only when Rapid Trigger registers the key press. Adjust the sensitivity in the Performance tab."
              checked={uiActuation.rtDown > 0}
              onCheckedChange={(checked) =>
                updateActuation({
                  ...uiActuation,
                  rtDown: checked ? DEFAULT_RT_DOWN : 0,
                  rtUp: 0,
                  continuous: false,
                })
              }
            />
            <DistanceSlider
              disabled={!isSuccess}
              size="sm"
              title="Actuation Point"
              description="Set the distance at which the key press is registered."
              min={1}
              max={
                ak.bottomOutPoint > 0
                  ? distanceToSwitchDistance(ak.bottomOutPoint)
                  : SWITCH_DISTANCE
              }
              distance={uiActuation.actuationPoint}
              onDistanceChange={(actuationPoint) =>
                setUIActuation({ ...uiActuation, actuationPoint })
              }
              onDistanceCommit={() => updateActuation(uiActuation)}
            />
          </div>
        </TabsContent>
        <TabsContent value="key-tester">
          <KeyTesterTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
