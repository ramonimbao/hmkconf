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

import { Keycode } from "./libhmk/keycodes"

export const keycodeCategories = {
  BASIC: "Basic",
  EXTENDED: "Extended",
  SPECIAL: "Special",
  PROFILES: "Profiles",
  MEDIA: "Media",
  MOUSE: "Mouse",
  ADVANCED_KEYS: "Advanced Keys",
  GAMEPAD: "Gamepad",
  UNKNOWN: "Unknown",
} as const

export type KeycodeCategory =
  (typeof keycodeCategories)[keyof typeof keycodeCategories]

export type KeycodeMetadata = {
  name: string
  tooltip?: string
  display?: (string | React.FC)[]
  keycode: Keycode
  webCodes: string[]
  category: KeycodeCategory
}
