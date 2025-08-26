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

import { keyboardContext } from "$lib/keyboard"
import { resource, useInterval, type ResourceReturn } from "runed"

export class ResourceProfile {
  profile: ResourceReturn<number>

  constructor() {
    const keyboard = keyboardContext.get()
    this.profile = resource(() => {}, keyboard.getProfile)
    useInterval(() => this.profile.refetch(), 1000)
  }
}
