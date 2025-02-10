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
import { useGetKeymapWithAdvancedKeys } from "@/api/use-get-keymap-with-advanced-keys"
import { useSetActuationMap } from "@/api/use-set-actuation-map"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { DEFAULT_ACTUATION } from "@/constants/devices"
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
    profile,
    performance: { keys, showKeymap, setKeys, setShowKeymap },
  } = useConfigurator()
  const { metadata } = useDevice()

  const { isSuccess: isKeymapSuccess, keymap } =
    useGetKeymapWithAdvancedKeys(profile)
  const { isSuccess: isActuationMapSuccess, data: actuationMap } =
    useGetActuationMap(profile)
  const { mutate: setActuationMap } = useSetActuationMap(profile)

  const allKeys = useMemo(
    () => metadata.layout.map((row) => row.map(({ key }) => key)).flat(),
    [metadata.layout],
  )

  const resetActuationMap = () => {
    if (!isActuationMapSuccess) {
      return
    }

    setActuationMap(
      produce(actuationMap, (draft) => {
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
          <Button variant="destructive" size="sm" onClick={resetActuationMap}>
            Reset All
          </Button>
        </KeyboardEditorHeader>
        {!isKeymapSuccess || !isActuationMapSuccess ? (
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
                    keycode={keymap[0][key]}
                    actuation={actuationMap[key]}
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
