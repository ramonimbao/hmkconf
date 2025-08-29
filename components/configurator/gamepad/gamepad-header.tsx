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

import { KeyboardEditorHeader } from "@/components/common/keyboard-editor"
import { useGetOptions } from "@/queries/get-options"
import { useSetOptions } from "@/queries/set-options"

import { Switch } from "../common/switch"

export function GamepadHeader() {
  const { isSuccess, data: options } = useGetOptions()
  const { mutate: setOptions } = useSetOptions()

  return (
    <KeyboardEditorHeader>
      <Switch
        checked={options?.xInputEnabled}
        id="xinput-enabled"
        onCheckedChange={(xInputEnabled) =>
          isSuccess &&
          setOptions({
            options: { ...options, xInputEnabled },
          })
        }
        title="Enable XInput Interface"
        tooltip="Allow your keyboard to be recognized as an Xbox controller for gamepad input. Restart the keyboard to apply changes. This setting applies globally across all profiles."
      />
    </KeyboardEditorHeader>
  )
}
