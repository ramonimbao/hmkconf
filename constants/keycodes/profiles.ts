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

import { KeycodeMetadata } from "@/types/keycodes"
import { Keycode } from "@/types/libhmk/keycodes"

export const PROFILES_KEYCODE_METADATA: KeycodeMetadata[] = [
  {
    name: "PF\nSwap",
    tooltip:
      "Profile Swap. Swap between profile 0 and the other last used profile.",
    keycode: Keycode.SP_PROFILE_SWAP,
    webCodes: [],
    category: "Profiles",
  },
  {
    name: "PF\nCycle",
    tooltip: "Profile Cycle. Cycle through the available profiles.",
    keycode: Keycode.SP_PROFILE_NEXT,
    webCodes: [],
    category: "Profiles",
  },
]
