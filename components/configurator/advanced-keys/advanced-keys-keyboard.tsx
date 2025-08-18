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

import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { useMemo } from "react"

import { KeyboardEditorKeyboard } from "@/components/common/keyboard-editor"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"
import { HMKAKType } from "@/types/libhmk"

import { KeyButtonSkeleton } from "../common/key-button"
import { KeycodeButton, KeycodeButtonTooltip } from "../common/keycode-button"

export function AdvancedKeysKeyboard() {
  const {
    profile,
    advancedKeys: { layer, index, newType, keys, setIndex, setKey },
  } = useConfigurator()
  const {
    metadata: { layout },
  } = useKeyboard()

  const { isSuccess, advancedKeyIndices, advancedKeymap, removeAdvancedKey } =
    useDisplayAdvancedKeys({ profile })

  const toggleValue = useMemo(
    () =>
      isSuccess
        ? newType !== HMKAKType.NONE
          ? keys.filter((key) => key !== null).map(String)
          : [index === null ? "" : index.toString()]
        : [],
    [index, isSuccess, keys, newType],
  )

  return (
    <ToggleGroup asChild type="multiple" value={toggleValue}>
      <KeyboardEditorKeyboard
        layout={layout}
        keyGenerator={(key) => {
          if (!isSuccess) {
            return <KeyButtonSkeleton />
          }

          const currIndex = advancedKeyIndices[layer][key]
          const keycode = advancedKeymap[layer][key]

          if (newType !== HMKAKType.NONE) {
            return (
              <ToggleGroupItem
                asChild
                onClick={() => setKey(key)}
                value={key.toString()}
              >
                <KeycodeButton
                  disabled={
                    currIndex !== null ||
                    (keys.every((key) => key !== null) && !keys.includes(key))
                  }
                  keycode={keycode}
                />
              </ToggleGroupItem>
            )
          }

          if (currIndex === null) {
            return <KeycodeButton disabled keycode={keycode} />
          }

          return (
            <KeycodeButtonTooltip keycode={keycode}>
              <ToggleGroupItem
                asChild
                onClick={() => setIndex(index === currIndex ? null : currIndex)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  removeAdvancedKey(currIndex)
                  setIndex(null)
                }}
                value={currIndex.toString()}
              >
                <KeycodeButton keycode={keycode} />
              </ToggleGroupItem>
            </KeycodeButtonTooltip>
          )
        }}
      />
    </ToggleGroup>
  )
}
