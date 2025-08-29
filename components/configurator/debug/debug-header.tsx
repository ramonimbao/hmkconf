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
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function DebugHeader() {
  return (
    <KeyboardEditorHeader>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="destructive">
            This tab may slow down your keyboard
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm text-wrap">
          This tab requests data from the keyboard at a high frequency, which
          may impact performance. Please close this tab or switch to another one
          when performing other performance-sensitive tasks with your keyboard.
        </TooltipContent>
      </Tooltip>
    </KeyboardEditorHeader>
  )
}
