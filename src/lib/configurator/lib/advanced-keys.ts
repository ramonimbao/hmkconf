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
  FileQuestionIcon,
  LayersIcon,
  LayoutTemplateIcon,
  MoveHorizontalIcon,
  ToggleLeftIcon,
} from "@lucide/svelte"
import { displayUInt8 } from "$lib/integer"
import { HMK_AKType } from "$lib/libhmk/advanced-keys"
import { Keycode } from "$lib/libhmk/keycodes"
import type { Component } from "svelte"

export type AdvancedKeyMetadata = {
  type: HMK_AKType
  icon: Component
  title: string
  description: string
  numKeys: number
  keycodes: Keycode[]
}

export const advancedKeyMetadata: AdvancedKeyMetadata[] = [
  {
    type: HMK_AKType.NULL_BIND,
    icon: MoveHorizontalIcon,
    title: "Null Bind",
    description:
      "Monitor 2 selected keys and register them according to your chosen behavior.",
    numKeys: 2,
    keycodes: [Keycode.AK_NULL_BIND_PRIMARY, Keycode.AK_NULL_BIND_SECONDARY],
  },
  {
    type: HMK_AKType.DYNAMIC_KEYSTROKE,
    icon: LayersIcon,
    title: "Dynamic Keystroke",
    description:
      "Assign up to 4 bindings to a single key. Each binding can be configured with 4 different actions based on the key's position.",
    numKeys: 1,
    keycodes: [Keycode.AK_DYNAMIC_KEYSTROKE],
  },
  {
    type: HMK_AKType.TAP_HOLD,
    icon: LayoutTemplateIcon,
    title: "Tap-Hold",
    description:
      "Register different bindings depending on whether the key is tapped or held.",
    numKeys: 1,
    keycodes: [Keycode.AK_TAP_HOLD],
  },
  {
    type: HMK_AKType.TOGGLE,
    icon: ToggleLeftIcon,
    title: "Toggle",
    description:
      "Toggle between key press and release states. Hold the key for a normal key behavior.",
    numKeys: 1,
    keycodes: [Keycode.AK_TOGGLE],
  },
]

export function getAdvancedKeyMetadata(type: HMK_AKType): AdvancedKeyMetadata {
  const metadata = advancedKeyMetadata.find((m) => m.type === type)
  return (
    metadata ?? {
      type,
      icon: FileQuestionIcon,
      title: `Unknown ${displayUInt8(type)}`,
      description: "This advanced key type is not recognized.",
      numKeys: 0,
      keycodes: [],
    }
  )
}
