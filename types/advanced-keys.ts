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

import { LucideIcon } from "lucide-react"

import { HMKAdvancedKey, HMKAKType, HMKNullBindBehavior } from "./libhmk"
import { Keycode } from "./libhmk/keycodes"

export type AdvancedKeyMetadata = {
  type: HMKAKType
  icon: LucideIcon
  title: string
  description: string
  numKeys: number
  keycodes: Keycode[]
  createDefault(options: {
    layer: number
    keys: number[]
    keycodes: number[]
  }): HMKAdvancedKey
}

export type NullBindBehaviorMetadata = {
  behavior: HMKNullBindBehavior
  title: string
  description: string
}
