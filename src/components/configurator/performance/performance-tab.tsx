"use client"

import { useGetActuations } from "@/api/use-get-actuations"
import { useGetKeymapWithAKC } from "@/api/use-get-keymap-with-akc"
import { useSetActuations } from "@/api/use-set-actuations"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { DEFAULT_ACTUATION } from "@/constants/devices"
import { KEYCODE_TO_METADATA } from "@/constants/keycodes"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"
import { useMemo } from "react"
import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
  KeyboardEditorSkeleton,
} from "../common/keyboard-editor"
import { ActuationButton } from "./actuation-button"
import { ActuationSettings } from "./actuation-settings"

export function PerformanceTab() {
  const {
    profileNum,
    performance: { keys, showKeymap, setKeys, setShowKeymap },
  } = useConfigurator()
  const { metadata } = useDevice()

  const { isSuccess: isKeymapSuccess, keymap } = useGetKeymapWithAKC(profileNum)
  const { isSuccess: isActuationsSuccess, data: actuations } =
    useGetActuations(profileNum)
  const { mutate: setActuations } = useSetActuations(profileNum)

  const allKeys = useMemo(
    () => metadata.layout.map((row) => row.map(({ key }) => key)).flat(),
    [metadata.layout],
  )

  const resetAllActuations = () => {
    if (!isActuationsSuccess) {
      return
    }

    setActuations(
      produce(actuations, (draft) => {
        for (const key of allKeys) {
          draft[key] = DEFAULT_ACTUATION
        }
      }),
    )
    setKeys([])
  }

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowKeymap(!showKeymap)}
            >
              Toggle Showing Keymap
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setKeys(allKeys)}
            >
              Select All
            </Button>
            <Button
              disabled={keys.length === 0}
              variant="outline"
              size="sm"
              onClick={() =>
                setKeys(allKeys.filter((key) => !keys.includes(key)))
              }
            >
              Select Inverse
            </Button>
            <Button
              disabled={keys.length === 0}
              variant="outline"
              size="sm"
              onClick={() => setKeys([])}
            >
              Deselect All
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={resetAllActuations}>
            Reset
          </Button>
        </KeyboardEditorHeader>
        {!isKeymapSuccess || !isActuationsSuccess ? (
          <KeyboardEditorSkeleton />
        ) : (
          <ToggleGroup
            type="multiple"
            value={keys.map((key) => key.toString())}
            onValueChange={(value) =>
              setKeys(value.map((key) => parseInt(key)))
            }
            asChild
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem value={key.toString()} asChild>
                  <ActuationButton
                    keycodeMetadata={KEYCODE_TO_METADATA[keymap[0][key]]}
                    actuation={actuations[key]}
                  />
                </ToggleGroupItem>
              )}
            />
          </ToggleGroup>
        )}
      </KeyboardEditorLayout>
      <KeyboardEditorLayout>
        <ActuationSettings />
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
