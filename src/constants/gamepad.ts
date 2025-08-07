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

import { GamepadAnalogCurvePreset } from "@/types/gamepad"
import { HMKGamepadOptions } from "@/types/libhmk"

export const GAMEPAD_ANALOG_CURVE_MIN_X = 4

export const GAMEPAD_ANALOG_CURVE_PRESETS: GamepadAnalogCurvePreset[] = [
  {
    name: "Linear",
    curve: [
      { x: 4, y: 20 },
      { x: 85, y: 95 },
      { x: 165, y: 170 },
      { x: 255, y: 255 },
    ],
  },
  {
    name: "Aggressive",
    curve: [
      { x: 4, y: 20 },
      { x: 55, y: 150 },
      { x: 145, y: 220 },
      { x: 255, y: 255 },
    ],
  },
  {
    name: "Slow",
    curve: [
      { x: 4, y: 20 },
      { x: 105, y: 55 },
      { x: 205, y: 120 },
      { x: 255, y: 255 },
    ],
  },
  {
    name: "Smooth",
    curve: [
      { x: 4, y: 20 },
      { x: 95, y: 80 },
      { x: 185, y: 160 },
      { x: 255, y: 255 },
    ],
  },
  {
    name: "Step",
    curve: [
      { x: 4, y: 20 },
      { x: 37, y: 130 },
      { x: 195, y: 130 },
      { x: 255, y: 255 },
    ],
  },
  {
    name: "Instant",
    curve: [
      { x: 4, y: 255 },
      { x: 5, y: 255 },
      { x: 6, y: 255 },
      { x: 255, y: 255 },
    ],
  },
  {
    name: "Digital",
    curve: [
      { x: 4, y: 255 },
      { x: 5, y: 255 },
      { x: 6, y: 255 },
      { x: 7, y: 255 },
    ],
  },
]

export const DEFAULT_GAMEPAD_OPTIONS: HMKGamepadOptions = {
  analogCurve: GAMEPAD_ANALOG_CURVE_PRESETS[0].curve,
  keyboardEnabled: true,
  gamepadOverride: false,
  squareJoystick: false,
  snappyJoystick: true,
}
