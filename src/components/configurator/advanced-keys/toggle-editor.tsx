"use client"

import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MAX_TAPPING_TERM, MIN_TAPPING_TERM } from "@/constants/devices"
import { DeviceAKCToggle } from "@/types/devices"
import { Keycode } from "@/types/keycodes"
import { Toggle } from "@radix-ui/react-toggle"
import { produce } from "immer"
import { useEffect, useState } from "react"
import { KeycodeButton } from "../common/keycode-button"
import { KeycodeSelector } from "../common/keycode-selector"
import { useAdvancedKeysEditor } from "./advanced-keys-editor"
import { KeyTesterTab } from "./key-tester-tab"

export function ToggleEditor() {
  const { profileNum } = useConfigurator()
  const { akc, akcIndex } = useAdvancedKeysEditor()
  const akConfig = akc[akcIndex].akc as DeviceAKCToggle

  const { mutate: setAKC } = useSetAKC(profileNum)

  const [isKeySelected, setIsKeySelected] = useState(false)
  const [uiAKConfig, setUIAKConfig] = useState(akConfig)

  const updateAKC = (akConfig: DeviceAKCToggle) =>
    setAKC(
      produce(akc, (draft) => {
        draft[akcIndex].akc = akConfig
      }),
    )

  useEffect(() => setUIAKConfig(akConfig), [akConfig])

  return (
    <div className="flex w-full gap-8">
      <div className="flex w-72 flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Configure Toggle Binding.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Set the keycode which can be toggled between key press and release.
            Hold the key for normal behavior.
          </p>
          <div className="mt-3 flex flex-col items-center">
            <div className="size-16 p-0.5">
              <Toggle
                pressed={isKeySelected}
                onPressedChange={setIsKeySelected}
                asChild
              >
                <KeycodeButton
                  keycode={akConfig.keycode}
                  className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  onContextMenu={(e) => {
                    e.preventDefault()
                    updateAKC({ ...akConfig, keycode: Keycode.KC_NO })
                    setIsKeySelected(false)
                  }}
                />
              </Toggle>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Tapping Term: {uiAKConfig.tappingTerm}ms
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Set the duration the key must be held to trigger the normal key
            behavior.
          </p>
          <Slider
            min={MIN_TAPPING_TERM}
            max={MAX_TAPPING_TERM}
            step={5}
            value={[uiAKConfig.tappingTerm]}
            onValueChange={([tappingTerm]) =>
              setUIAKConfig({ ...uiAKConfig, tappingTerm })
            }
            onValueCommit={() => updateAKC(uiAKConfig)}
            className="mt-3"
          />
        </div>
      </div>
      <Tabs defaultValue="bindings" className="flex flex-1 flex-col">
        <div>
          <TabsList>
            <TabsTrigger value="bindings">Bindings</TabsTrigger>
            <TabsTrigger value="key-tester">Key Tester</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bindings">
          <div className="flex flex-col rounded-md border bg-card p-4 shadow-sm">
            <KeycodeSelector
              disabled={!isKeySelected}
              onKeycodeSelected={(keycode) => {
                updateAKC({ ...akConfig, keycode })
                setIsKeySelected(false)
              }}
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
