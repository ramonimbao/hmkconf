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

import { CircleQuestionMarkIcon } from "lucide-react"

import {
  advancedKeysToMetadata,
  DKS_ACTION_SIZE,
  DKS_BIT_COLUMN_WIDTH,
  DKS_ROW_PADDING,
  nullBindBehaviorToMetadata,
} from "@/constants/advanced-keys"
import { DEFAULT_ADVANCED_KEY } from "@/constants/libhmk/advanced-keys"
import {
  AdvancedKeyMetadata,
  NullBindBehaviorMetadata,
} from "@/types/advanced-keys"
import {
  HMKAdvancedKey,
  HMKAKType,
  HMKDKSAction,
  HMKNullBindBehavior,
} from "@/types/libhmk"
import { Keycode } from "@/types/libhmk/keycodes"

import { displayUInt8 } from "./ui"

export function getAdvancedKeyMetadata(type: HMKAKType): AdvancedKeyMetadata {
  return type in advancedKeysToMetadata
    ? advancedKeysToMetadata[type]
    : {
        type,
        icon: CircleQuestionMarkIcon,
        title: `Unknown ${displayUInt8(type)}`,
        description: "This advanced key type is not recognized.",
        numKeys: 0,
        keycodes: [],
        createDefault: () => DEFAULT_ADVANCED_KEY,
      }
}

export function getNullBindBehaviorMetadata(
  behavior: HMKNullBindBehavior,
): NullBindBehaviorMetadata {
  return behavior in nullBindBehaviorToMetadata
    ? nullBindBehaviorToMetadata[behavior]
    : {
        behavior,
        title: `Unknown ${displayUInt8(behavior)}`,
        description: "This null bind behavior is not recognized.",
      }
}

export function getAdvancedKeyDisplayItems({ key, action }: HMKAdvancedKey) {
  const ret = { keys: [key], items: [] as string | Keycode[] }

  switch (action.type) {
    case HMKAKType.NULL_BIND:
      ret.keys.push(action.secondaryKey)
      ret.items = getNullBindBehaviorMetadata(action.behavior).title
      break
    case HMKAKType.DYNAMIC_KEYSTROKE:
      ret.items = action.keycodes
      break
    case HMKAKType.TAP_HOLD:
      ret.items = [action.tapKeycode, action.holdKeycode]
      break
    case HMKAKType.TOGGLE:
      ret.items = [action.keycode]
      break
  }

  return ret
}

export function getBitmapIntervals(bitmap: HMKDKSAction[]) {
  const intervals: [number, number][] = []

  let left = null
  for (let i = 0; i < 4; i++) {
    if (bitmap[i] === HMKDKSAction.HOLD) {
      continue
    }

    if (left !== null) {
      intervals.push([left, i])
      left = null
    }

    if (bitmap[i] === HMKDKSAction.PRESS) {
      left = i
    } else if (bitmap[i] === HMKDKSAction.TAP) {
      intervals.push([i, i])
    }
  }

  return intervals
}

export const intervalsToBitmap = (intervals: [number, number][]) => {
  const bitmap: HMKDKSAction[] = Array(4).fill(HMKDKSAction.HOLD)

  for (const [l, r] of intervals) {
    if (l === r) {
      bitmap[l] = HMKDKSAction.TAP
    } else {
      bitmap[l] = HMKDKSAction.PRESS
      if (r < 4) {
        bitmap[r] = HMKDKSAction.RELEASE
      }
    }
  }

  return bitmap
}

export const dksIntervalLeft = ([l]: [number, number]) =>
  l * DKS_BIT_COLUMN_WIDTH + DKS_ROW_PADDING

export const dksIntervalWidth = ([l, r]: [number, number]) =>
  l === r ? DKS_ACTION_SIZE : (r - l) * DKS_BIT_COLUMN_WIDTH - DKS_ROW_PADDING
