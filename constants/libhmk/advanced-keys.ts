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

import { HMKAdvancedKey, HMKAKType, HMKDKSAction } from "@/types/libhmk"

export const DEFAULT_BOTTOM_OUT_POINT = 230

export const DEFAULT_DKS_BITMAP: HMKDKSAction[][] = [
  [
    HMKDKSAction.PRESS,
    HMKDKSAction.HOLD,
    HMKDKSAction.HOLD,
    HMKDKSAction.RELEASE,
  ],
  Array(4).fill(HMKDKSAction.HOLD),
  Array(4).fill(HMKDKSAction.HOLD),
  Array(4).fill(HMKDKSAction.HOLD),
]

export const DEFAULT_TAPPING_TERM = 200
export const MIN_TAPPING_TERM = 10
export const MAX_TAPPING_TERM = 1000

export const DEFAULT_ADVANCED_KEY: HMKAdvancedKey = {
  layer: 0,
  key: 0,
  action: { type: HMKAKType.NONE },
}
