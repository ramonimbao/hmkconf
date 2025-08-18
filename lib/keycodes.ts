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

import { MO, PF } from "./libhmk/keycodes"
import { displayUInt16 } from "./ui"

export function getLayerKeycodeMetadata(layer: number): KeycodeMetadata {
  return {
    name: `MO(${layer})`,
    tooltip: `Hold to Activate Layer ${layer}`,
    keycode: MO(layer),
    webCodes: [],
    category: "Special",
  }
}

export function getProfileKeycodeMetadata(profile: number): KeycodeMetadata {
  return {
    name: `PF(${profile})`,
    tooltip: `Switch to Profile ${profile}`,
    keycode: PF(profile),
    webCodes: [],
    category: "Profiles",
  }
}

export function getUnknownKeycodeMetadata(keycode: number): KeycodeMetadata {
  return {
    name: displayUInt16(keycode),
    tooltip: `Unknown Keycode: ${displayUInt16(keycode)}`,
    keycode,
    webCodes: [],
    category: "Unknown",
  }
}
