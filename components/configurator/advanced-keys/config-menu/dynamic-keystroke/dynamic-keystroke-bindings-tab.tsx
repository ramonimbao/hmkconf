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

import { produce } from "immer"

import { KeycodeAccordions } from "@/components/configurator/common/keycode-accordions"

import { useDynamicKeystroke } from "."
import { useAdvancedKeysConfig } from ".."

export function DynamicKeystrokeBindingsTab() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action, bindingIndex, setBindingIndex } = useDynamicKeystroke()

  return (
    <KeycodeAccordions
      onKeycodeSelected={(keycode) => {
        if (bindingIndex !== null) {
          updateAdvancedKey((advancedKey) => ({
            ...advancedKey,
            action: {
              ...action,
              keycodes: produce(action.keycodes, (draft) => {
                draft[bindingIndex] = keycode
              }),
            },
          }))
          setBindingIndex(null)
        }
      }}
    />
  )
}
