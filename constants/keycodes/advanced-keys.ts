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
  ArrowBigLeftDashIcon,
  ArrowBigRightDashIcon,
  LayersIcon,
  LayoutTemplateIcon,
  ToggleLeftIcon,
} from "lucide-react"

import { KeycodeMetadata } from "@/types/keycodes"
import { Keycode } from "@/types/libhmk/keycodes"

export const ADVANCED_KEYS_KEYCODE_METADATA: KeycodeMetadata[] = [
  {
    name: "Null Bind Primary",
    tooltip: "Null Bind Key 1",
    display: [ArrowBigLeftDashIcon],
    keycode: Keycode.AK_NULL_BIND_PRIMARY,
    webCodes: [],
    category: "Advanced Keys",
  },
  {
    name: "Null Bind Secondary",
    tooltip: "Null Bind Key 2",
    display: [ArrowBigRightDashIcon],
    keycode: Keycode.AK_NULL_BIND_SECONDARY,
    webCodes: [],
    category: "Advanced Keys",
  },
  {
    name: "Dynamic Keystroke",
    tooltip: "Dynamic Keystroke Key",
    display: [LayersIcon],
    keycode: Keycode.AK_DYNAMIC_KEYSTROKE,
    webCodes: [],
    category: "Advanced Keys",
  },
  {
    name: "Tap Hold",
    tooltip: "Tap Hold Key",
    display: [LayoutTemplateIcon],
    keycode: Keycode.AK_TAP_HOLD,
    webCodes: [],
    category: "Advanced Keys",
  },
  {
    name: "Toggle",
    tooltip: "Toggle Key",
    display: [ToggleLeftIcon],
    keycode: Keycode.AK_TOGGLE,
    webCodes: [],
    category: "Advanced Keys",
  },
]
