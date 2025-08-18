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

import { ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"

import { KeycodeButton } from "@/components/configurator/common/keycode-button"
import { getUnitSizeCSS } from "@/lib/ui"
import { Keycode } from "@/types/libhmk/keycodes"

import { useDynamicKeystroke } from "."
import { useAdvancedKeysConfig } from ".."

export function DynamicKeystrokeKeys() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action } = useDynamicKeystroke()

  return action.keycodes.map((keycode, i) => (
    <div
      key={i}
      className="flex items-center justify-center text-sm"
      style={{ gridArea: `key${i}` }}
    >
      <div className="p-0.5" style={getUnitSizeCSS()}>
        <ToggleGroupItem asChild value={i.toString()}>
          <KeycodeButton
            keycode={keycode}
            onContextMenu={(e) => {
              e.preventDefault()
              updateAdvancedKey((advancedKey) => ({
                ...advancedKey,
                action: {
                  ...action,
                  keycodes: produce(action.keycodes, (draft) => {
                    draft[i] = Keycode.KC_NO
                  }),
                },
              }))
            }}
          />
        </ToggleGroupItem>
      </div>
    </div>
  ))
}
