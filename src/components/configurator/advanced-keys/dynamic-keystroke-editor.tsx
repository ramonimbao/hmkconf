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

import { useGetActuationMap } from "@/api/use-get-actuation-map"
import { useSetActuationMap } from "@/api/use-set-actuation-map"
import { useSetAdvancedKeys } from "@/api/use-set-advanced-keys"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DEFAULT_ACTUATION, SWITCH_DISTANCE } from "@/constants/devices"
import { distanceToSwitchDistance } from "@/lib/utils"
import { Keycode } from "@/types/keycodes"
import { HMKActuation, HMKAKDynamicKeystroke } from "@/types/libhmk"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"
import { Info } from "lucide-react"
import { useEffect, useState } from "react"
import { DistanceSlider } from "../common/distance-slider"
import { KeycodeButton } from "../common/keycode-button"
import { KeycodeSelector } from "../common/keycode-selector"
import { useAdvancedKeysEditor } from "./advanced-keys-editor"
import {
  DynamicKeystrokeSlider,
  DynamicKeystrokeSliderHeader,
} from "./dynamic-keystroke-slider"
import { KeyTesterTab } from "./key-tester-tab"
import { TickRateTab } from "./tick-rate-tab"

export function DynamicKeystrokeEditor() {
  const { profile } = useConfigurator()
  const { advancedKeys, akIndex } = useAdvancedKeysEditor()
  const ak = advancedKeys[akIndex].ak as HMKAKDynamicKeystroke

  const { isSuccess, data: actuationMap } = useGetActuationMap(profile)
  const { mutate: setActuationMap } = useSetActuationMap(profile)
  const { mutate: setAdvancedKeys } = useSetAdvancedKeys(profile)

  const [dksBindingIndex, setDKSBindingIndex] = useState<number | null>(null)
  const [uiActuation, setUIActuation] = useState(DEFAULT_ACTUATION)
  const [uiAdvancedKey, setUIAdvancedKey] = useState(ak)

  const updateActuation = (actuation: HMKActuation) =>
    isSuccess &&
    setActuationMap({
      start: advancedKeys[akIndex].key,
      actuationMap: [actuation],
    })

  const updateAdvancedKey = (ak: HMKAKDynamicKeystroke) =>
    setAdvancedKeys({
      start: akIndex,
      advancedKeys: [
        produce(advancedKeys[akIndex], (draft) => {
          draft.ak = ak
        }),
      ],
    })

  useEffect(() => {
    if (isSuccess) {
      setUIActuation(actuationMap[advancedKeys[akIndex].key])
    }
  }, [actuationMap, advancedKeys, akIndex, isSuccess])

  useEffect(() => setUIAdvancedKey(ak), [ak])

  return (
    <div className="flex w-full gap-8">
      <div className="flex w-96 flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Configure DKS Bindings
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Assign a keycode to each binding. Configure the actions for 4 parts
            of the keystroke by clicking and dragging the plus icons on the
            right.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="w-16 text-center text-sm font-semibold leading-none tracking-tight">
                Bindings
              </div>
              <DynamicKeystrokeSliderHeader />
            </div>
            <ToggleGroup
              type="single"
              value={dksBindingIndex === null ? "" : dksBindingIndex.toString()}
              onValueChange={(value) =>
                setDKSBindingIndex(value === "" ? null : parseInt(value))
              }
              className="grid gap-2"
            >
              {ak.keycodes.map((keycode, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-16 p-0.5">
                    <ToggleGroupItem value={i.toString()} asChild>
                      <KeycodeButton
                        keycode={keycode}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          updateAdvancedKey(
                            produce(ak, (draft) => {
                              draft.keycodes[i] = Keycode.KC_NO
                            }),
                          )
                        }}
                        className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                      />
                    </ToggleGroupItem>
                  </div>
                  <DynamicKeystrokeSlider
                    bitmap={ak.bitmap[i]}
                    onBitmapChange={(bitmap) =>
                      updateAdvancedKey(
                        produce(ak, (draft) => {
                          draft.bitmap[i] = bitmap
                        }),
                      )
                    }
                  />
                </div>
              ))}
            </ToggleGroup>
          </div>
        </div>
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
      </div>
      <Tabs defaultValue="bindings" className="flex flex-1 flex-col">
        <div>
          <TabsList>
            <TabsTrigger value="bindings">Bindings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="key-tester">Key Tester</TabsTrigger>
            <TabsTrigger value="tick-rate">Tick Rate</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bindings">
          <div className="flex flex-col rounded-md border bg-card p-4 shadow-sm">
            <KeycodeSelector
              disabled={dksBindingIndex === null}
              onKeycodeSelected={(keycode) => {
                if (dksBindingIndex !== null) {
                  updateAdvancedKey(
                    produce(ak, (draft) => {
                      draft.keycodes[dksBindingIndex] = keycode
                    }),
                  )
                  setDKSBindingIndex(null)
                }
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="performance">
          <div className="flex flex-col gap-4 rounded-md border bg-card p-4 shadow-sm">
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
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="size-4" /> Rapid Trigger is automatically
              disabled when the key is bound to a DKS.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="key-tester">
          <KeyTesterTab />
        </TabsContent>
        <TabsContent value="tick-rate">
          <TickRateTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
