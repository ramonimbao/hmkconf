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

import { Slot } from "@radix-ui/react-slot"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"

import { KeyboardEditorKeyboard } from "@/components/common/keyboard-editor"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { displayDistance } from "@/lib/distance"
import { useGetActuationMap } from "@/queries/get-actuation-map"
import { useGetKeymap } from "@/queries/get-keymap"

import { KeyButton, KeyButtonSkeleton } from "../common/key-button"
import { KeycodeButton } from "../common/keycode-button"

export function PerformanceKeyboard() {
  const {
    profile,
    performance: { keys, showKeymap, setKeys },
  } = useConfigurator()
  const {
    metadata: { layout },
  } = useKeyboard()

  const { isSuccess: actuationMapSuccess, data: actuationMap } =
    useGetActuationMap({ profile })
  const { isSuccess: keymapSuccess, data: keymap } = useGetKeymap({
    profile,
    layer: 0,
  })

  const isSuccess = actuationMapSuccess && keymapSuccess

  return (
    <ToggleGroup
      asChild
      onValueChange={(keys) => setKeys(keys.map((key) => parseInt(key)))}
      type="multiple"
      value={keys.map(String)}
    >
      <KeyboardEditorKeyboard
        layout={layout}
        keyGenerator={(key) => {
          if (!isSuccess) {
            return <KeyButtonSkeleton />
          }

          const { actuationPoint, rtDown, rtUp, continuous } = actuationMap[key]
          const continuousLabel = continuous ? "C" : ""

          return (
            <ToggleGroupItem asChild value={key.toString()}>
              <Slot
                onClick={(e) => e.preventDefault()}
                onMouseDown={(e) =>
                  e.buttons === 1 &&
                  setKeys(
                    keys.includes(key)
                      ? keys.filter((k) => k !== key)
                      : [...keys, key],
                  )
                }
                onMouseEnter={(e) =>
                  e.buttons === 1 &&
                  !keys.includes(key) &&
                  setKeys([...keys, key])
                }
              >
                {showKeymap ? (
                  <KeycodeButton keycode={keymap[key]} />
                ) : (
                  <KeyButton size="sm">
                    <span>
                      {displayDistance(actuationPoint)}
                      {continuousLabel}
                    </span>
                    {rtDown > 0 && (
                      <span>
                        {displayDistance(rtDown)}
                        {continuousLabel}
                      </span>
                    )}
                    {rtUp > 0 && (
                      <span>
                        {displayDistance(rtUp)}
                        {continuousLabel}
                      </span>
                    )}
                  </KeyButton>
                )}
              </Slot>
            </ToggleGroupItem>
          )
        }}
      />
    </ToggleGroup>
  )
}
