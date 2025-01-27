"use client"

import { useGetActuations } from "@/api/use-get-actuations"
import { useSetActuations } from "@/api/use-set-actuations"
import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DEFAULT_ACTUATION, SWITCH_DISTANCE } from "@/constants/devices"
import { distanceToSwitchDistance } from "@/lib/utils"
import { DeviceActuation, DeviceAKCDKS } from "@/types/devices"
import { Keycode } from "@/types/keycodes"
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

export function DynamicKeystrokeEditor() {
  const { profileNum } = useConfigurator()
  const { akc, akcIndex } = useAdvancedKeysEditor()
  const akConfig = akc[akcIndex].akc as DeviceAKCDKS

  const { isSuccess, data: actuations } = useGetActuations(profileNum)
  const { mutate: setActuations } = useSetActuations(profileNum)
  const { mutate: setAKC } = useSetAKC(profileNum)

  const [dksBindingIndex, setDKSBindingIndex] = useState<number | null>(null)
  const [uiActuation, setUIActuation] = useState(DEFAULT_ACTUATION)
  const [uiAKConfig, setUIAKConfig] = useState(akConfig)

  const updateActuation = (actuation: DeviceActuation) =>
    isSuccess &&
    setActuations(
      produce(actuations, (draft) => {
        draft[akc[akcIndex].key] = actuation
      }),
    )

  const updateAKC = (akConfig: DeviceAKCDKS) =>
    setAKC(
      produce(akc, (draft) => {
        draft[akcIndex].akc = akConfig
      }),
    )

  useEffect(() => {
    if (isSuccess) {
      setUIActuation(actuations[akc[akcIndex].key])
    }
  }, [actuations, akc, akcIndex, isSuccess])

  useEffect(() => setUIAKConfig(akConfig), [akConfig])

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
              {akConfig.keycodes.map((keycode, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-16 p-0.5">
                    <ToggleGroupItem value={i.toString()} asChild>
                      <KeycodeButton
                        keycode={keycode}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          updateAKC(
                            produce(akConfig, (draft) => {
                              draft.keycodes[i] = Keycode.KC_NO
                            }),
                          )
                        }}
                        className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                      />
                    </ToggleGroupItem>
                  </div>
                  <DynamicKeystrokeSlider
                    bitmap={akConfig.bitmap[i]}
                    onBitmapChange={(bitmap) =>
                      updateAKC(
                        produce(akConfig, (draft) => {
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
              actuations[akc[akcIndex].key].actuationPoint,
            ),
          })}
          max={SWITCH_DISTANCE}
          distance={uiAKConfig.bottomOutPoint}
          onDistanceChange={(bottomOutPoint) =>
            setUIAKConfig({ ...uiAKConfig, bottomOutPoint })
          }
          onDistanceCommit={() => updateAKC(uiAKConfig)}
        />
      </div>
      <Tabs defaultValue="bindings" className="flex flex-1 flex-col">
        <div>
          <TabsList>
            <TabsTrigger value="bindings">Bindings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="key-tester">Key Tester</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bindings">
          <div className="flex flex-col rounded-md border bg-card p-4 shadow-sm">
            <KeycodeSelector
              disabled={dksBindingIndex === null}
              onKeycodeSelected={(keycode) => {
                if (dksBindingIndex !== null) {
                  updateAKC(
                    produce(akConfig, (draft) => {
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
                akConfig.bottomOutPoint > 0
                  ? distanceToSwitchDistance(akConfig.bottomOutPoint)
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
      </Tabs>
    </div>
  )
}
