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
  LayersIcon,
  LayoutTemplateIcon,
  MoveHorizontalIcon,
  ToggleLeftIcon,
} from "lucide-react"

import {
  AdvancedKeyMetadata,
  NullBindBehaviorMetadata,
} from "@/types/advanced-keys"
import { HMKAKType, HMKNullBindBehavior } from "@/types/libhmk"
import { Keycode } from "@/types/libhmk/keycodes"

import {
  DEFAULT_BOTTOM_OUT_POINT,
  DEFAULT_DKS_BITMAP,
  DEFAULT_TAPPING_TERM,
} from "./libhmk/advanced-keys"

export const DKS_BIT_COLUMN_WIDTH = 90
export const DKS_ROW_PADDING = 8
export const DKS_ACTION_SIZE = 32

export const NULL_BIND_BEHAVIOR_METADATA: NullBindBehaviorMetadata[] = [
  {
    behavior: HMKNullBindBehavior.LAST,
    title: "Last Input Priority",
    description: "Activate the key that was pressed last.",
  },
  {
    behavior: HMKNullBindBehavior.PRIMARY,
    title: "Absolute Priority (Key 1)",
    description: "Key 1 will take priority over Key 2.",
  },
  {
    behavior: HMKNullBindBehavior.SECONDARY,
    title: "Absolute Priority (Key 2)",
    description: "Key 2 will take priority over Key 1.",
  },
  {
    behavior: HMKNullBindBehavior.NEUTRAL,
    title: "Neutral",
    description: "Neither key will be activated.",
  },
  {
    behavior: HMKNullBindBehavior.DISTANCE,
    title: "Distance Priority (Rappy Snappy)",
    description: "Activate whichever key is pressed down further.",
  },
]

export const nullBindBehaviorToMetadata: Record<
  number,
  NullBindBehaviorMetadata
> = NULL_BIND_BEHAVIOR_METADATA.reduce(
  (acc, metadata) => ({ ...acc, [metadata.behavior]: metadata }),
  {},
)

export const ADVANCED_KEYS_METADATA: AdvancedKeyMetadata[] = [
  {
    type: HMKAKType.NULL_BIND,
    icon: MoveHorizontalIcon,
    title: "Null Bind",
    description:
      "Monitor 2 selected keys and register them according to your chosen behavior.",
    numKeys: 2,
    keycodes: [Keycode.AK_NULL_BIND_PRIMARY, Keycode.AK_NULL_BIND_SECONDARY],
    createDefault: ({ layer, keys: [key, secondaryKey] }) => ({
      layer,
      key,
      action: {
        type: HMKAKType.NULL_BIND,
        secondaryKey,
        behavior: HMKNullBindBehavior.LAST,
        bottomOutPoint: 0,
      },
    }),
  },
  {
    type: HMKAKType.DYNAMIC_KEYSTROKE,
    icon: LayersIcon,
    title: "Dynamic Keystroke",
    description:
      "Assign up to 4 bindings to a single key. Each binding can be configured with 4 different actions based on the key's position.",
    numKeys: 1,
    keycodes: [Keycode.AK_DYNAMIC_KEYSTROKE],
    createDefault: ({ layer, keys: [key], keycodes: [keycode] }) => ({
      layer,
      key,
      action: {
        type: HMKAKType.DYNAMIC_KEYSTROKE,
        keycodes: [keycode, Keycode.KC_NO, Keycode.KC_NO, Keycode.KC_NO],
        bitmap: DEFAULT_DKS_BITMAP,
        bottomOutPoint: DEFAULT_BOTTOM_OUT_POINT,
      },
    }),
  },
  {
    type: HMKAKType.TAP_HOLD,
    icon: LayoutTemplateIcon,
    title: "Tap-Hold",
    description:
      "Register different bindings depending on whether the key is tapped or held.",
    numKeys: 1,
    keycodes: [Keycode.AK_TAP_HOLD],
    createDefault: ({ layer, keys: [key], keycodes: [tapKeycode] }) => ({
      layer,
      key,
      action: {
        type: HMKAKType.TAP_HOLD,
        tapKeycode,
        holdKeycode: Keycode.KC_NO,
        tappingTerm: DEFAULT_TAPPING_TERM,
        holdOnOtherKeyPress: false,
      },
    }),
  },
  {
    type: HMKAKType.TOGGLE,
    icon: ToggleLeftIcon,
    title: "Toggle",
    description:
      "Toggle between key press and release states. Hold the key for a normal key behavior.",
    numKeys: 1,
    keycodes: [Keycode.AK_TOGGLE],
    createDefault: ({ layer, keys: [key], keycodes: [keycode] }) => ({
      layer,
      key,
      action: {
        type: HMKAKType.TOGGLE,
        keycode,
        tappingTerm: DEFAULT_TAPPING_TERM,
      },
    }),
  },
]

export const advancedKeysToMetadata: Record<number, AdvancedKeyMetadata> =
  ADVANCED_KEYS_METADATA.reduce(
    (acc, metadata) => ({ ...acc, [metadata.type]: metadata }),
    {},
  )
