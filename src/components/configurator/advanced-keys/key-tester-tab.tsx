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

"use client"

import {
  KeyTesterKeyPress,
  KeyTesterKeyRelease,
  KeyTesterProvider,
} from "../common/key-tester"

export function KeyTesterTab() {
  return (
    <div className="grid gap-4 rounded-md border bg-card p-4 shadow-sm">
      <KeyTesterProvider>
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Pressed Keys
          </p>
          <KeyTesterKeyPress className="mt-2 h-24 max-w-72" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Released Keys
          </p>
          <KeyTesterKeyRelease className="mt-2 h-24 max-w-72" />
        </div>
      </KeyTesterProvider>
    </div>
  )
}
