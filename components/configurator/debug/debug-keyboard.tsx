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

import { KeyboardEditorKeyboard } from "@/components/common/keyboard-editor"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { displayDistance } from "@/lib/distance"
import { useAnalogInfo } from "@/queries/analog-info"

import { KeyButton, KeyButtonSkeleton } from "../common/key-button"

export function DebugKeyboard() {
  const {
    metadata: { layout },
  } = useKeyboard()

  const { isSuccess, data: analogInfo } = useAnalogInfo()

  return (
    <KeyboardEditorKeyboard
      layout={layout}
      keyGenerator={(key) =>
        !isSuccess ? (
          <KeyButtonSkeleton />
        ) : (
          <KeyButton as="div">
            <span>{analogInfo[key].adcValue}</span>
            <span>{displayDistance(analogInfo[key].distance)}</span>
          </KeyButton>
        )
      }
    />
  )
}
