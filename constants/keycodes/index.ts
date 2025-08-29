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

import { ADVANCED_KEYS_KEYCODE_METADATA } from "./advanced-keys"
import { BASIC_KEYCODE_METADATA } from "./basic"
import { EXTENDED_KEYCODE_METADATA } from "./extended"
import { GAMEPAD_KEYCODE_METADATA } from "./gamepad"
import { MEDIA_KEYCODE_METADATA } from "./media"
import { MOUSE_KEYCODE_METADATA } from "./mouse"
import { PROFILES_KEYCODE_METADATA } from "./profiles"
import { SPECIAL_KEYCODE_METADATA } from "./special"

export const KEYCODE_METADATA: KeycodeMetadata[] = [
  ...BASIC_KEYCODE_METADATA,
  ...EXTENDED_KEYCODE_METADATA,
  ...SPECIAL_KEYCODE_METADATA,
  ...PROFILES_KEYCODE_METADATA,
  ...MEDIA_KEYCODE_METADATA,
  ...MOUSE_KEYCODE_METADATA,
  ...ADVANCED_KEYS_KEYCODE_METADATA,
  ...GAMEPAD_KEYCODE_METADATA,
]
