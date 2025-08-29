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
  KeyTesterKeyPress,
  KeyTesterKeyRelease,
  KeyTesterProvider,
} from "../../common/key-tester"

export function KeyTesterTab() {
  return (
    <KeyTesterProvider>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Pressed Keys</div>
          <KeyTesterKeyPress className="h-24 max-w-72" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Released Keys</div>
          <KeyTesterKeyRelease className="h-24 max-w-72" />
        </div>
      </div>
    </KeyTesterProvider>
  )
}
