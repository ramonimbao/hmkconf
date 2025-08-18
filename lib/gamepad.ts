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

import { CURVE_VIEW_HEIGHT, CURVE_VIEW_WIDTH } from "@/constants/gamepad"
import { MAX_DISTANCE, MIN_DISTANCE } from "@/constants/libhmk"
import { HMKGamepadButton } from "@/types/libhmk"
import { Keycode } from "@/types/libhmk/keycodes"

export function gamepadButtonToDisplay(button: HMKGamepadButton): Keycode {
  if (button < HMKGamepadButton.A || button > HMKGamepadButton.RT) {
    throw new Error(`Invalid gamepad button: ${button}`)
  }

  return button - HMKGamepadButton.A + Keycode.GP_BUTTON_A
}

export function gamepadDisplayToButton(keycode: Keycode): HMKGamepadButton {
  if (keycode < Keycode.GP_BUTTON_A || keycode > Keycode.GP_BUTTON_RT) {
    throw new Error(`Invalid gamepad display keycode: ${keycode}`)
  }

  return keycode - Keycode.GP_BUTTON_A + HMKGamepadButton.A
}

export const curvePointToView = ({ x, y }: { x: number; y: number }) => ({
  x: ((x - MIN_DISTANCE) * CURVE_VIEW_WIDTH) / (MAX_DISTANCE - MIN_DISTANCE),
  y: CURVE_VIEW_HEIGHT - (y * CURVE_VIEW_HEIGHT) / 255,
})

export const viewPointToCurve = ({ x, y }: { x: number; y: number }) => ({
  x: Math.round(
    (x * (MAX_DISTANCE - MIN_DISTANCE)) / CURVE_VIEW_WIDTH + MIN_DISTANCE,
  ),
  y: Math.round(((CURVE_VIEW_HEIGHT - y) * 255) / CURVE_VIEW_HEIGHT),
})
