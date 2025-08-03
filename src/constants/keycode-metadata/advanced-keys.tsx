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

import { Keycode, KeycodeMetadata } from "@/types/keycodes"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"

export const ADVANCED_KEYS_KEYCODE_METADATA: KeycodeMetadata[] = [
  {
    id: "Null Bind Primary",
    display: (
      <>
        <p>NB</p>
        <ArrowBigLeft />
      </>
    ),
    keycode: Keycode.AK_NULL_BIND_PRIMARY,
    webCodes: [],
    category: "Advanced Key",
  },
  {
    id: "Null Bind Secondary",
    display: (
      <>
        <p>NB</p>
        <ArrowBigRight />
      </>
    ),
    keycode: Keycode.AK_NULL_BIND_SECONDARY,
    webCodes: [],
    category: "Advanced Key",
  },
  {
    id: "Dynamic Keystroke",
    display: "DKS",
    keycode: Keycode.AK_DYNAMIC_KEYSTROKE,
    webCodes: [],
    category: "Advanced Key",
  },
  {
    id: "Tap-Hold",
    display: (
      <>
        <p>TAP</p>
        <p>HOLD</p>
      </>
    ),
    keycode: Keycode.AK_TAP_HOLD,
    webCodes: [],
    category: "Advanced Key",
  },
  {
    id: "Toggle",
    display: "TGL",
    keycode: Keycode.AK_TOGGLE,
    webCodes: [],
    category: "Advanced Key",
  },
]
