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

import { KeyboardEditorKeyboard } from "@/components/common/keyboard-editor"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { useGetKeymap } from "@/queries/get-keymap"
import { useSetKeymap } from "@/queries/set-keymap"
import { Keycode } from "@/types/libhmk/keycodes"

import { KeyButtonSkeleton } from "../common/key-button"
import { KeycodeButton, KeycodeButtonTooltip } from "../common/keycode-button"

export function RemapKeyboard() {
  const {
    profile,
    remap: { layer, key, setKey },
  } = useConfigurator()
  const {
    metadata: { layout },
  } = useKeyboard()

  const { isSuccess, data: keymap } = useGetKeymap({ profile, layer })
  const { mutate: setKeymap } = useSetKeymap({ profile, layer })

  return (
    <ToggleGroup
      asChild
      onValueChange={(key) => setKey(key === "" ? null : parseInt(key))}
      type="single"
      value={key?.toString() ?? ""}
    >
      <KeyboardEditorKeyboard
        layout={layout}
        keyGenerator={(key) =>
          !isSuccess ? (
            <KeyButtonSkeleton />
          ) : (
            <KeycodeButtonTooltip keycode={keymap[key]}>
              <ToggleGroupItem asChild value={key.toString()}>
                <KeycodeButton
                  keycode={keymap[key]}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    setKeymap({ offset: key, keymap: [Keycode.KC_NO] })
                    setKey(null)
                  }}
                />
              </ToggleGroupItem>
            </KeycodeButtonTooltip>
          )
        }
      />
    </ToggleGroup>
  )
}
