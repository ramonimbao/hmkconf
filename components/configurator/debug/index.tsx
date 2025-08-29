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

import {
  KeyboardEditor,
  KeyboardEditorSeparator,
  KeyboardEditorView,
} from "@/components/common/keyboard-editor"

import { DebugHeader } from "./debug-header"
import { DebugKeyboard } from "./debug-keyboard"
import { DebugMenu } from "./debug-menu"

export function DebugTab() {
  return (
    <KeyboardEditor>
      <KeyboardEditorView>
        <DebugKeyboard />
        <DebugHeader />
      </KeyboardEditorView>
      <KeyboardEditorSeparator />
      <KeyboardEditorView>
        <DebugMenu />
      </KeyboardEditorView>
    </KeyboardEditor>
  )
}
