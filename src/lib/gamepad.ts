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

import { GamepadButton } from "@/types/gamepad"
import { Keycode } from "@/types/keycodes"

export const gamepadButtonToKeycode = (gamepadButton: GamepadButton): Keycode =>
  gamepadButton - GamepadButton.GP_BUTTON_A + Keycode.GP_BUTTON_A

export const keycodeToGamepadButton = (keycode: Keycode): GamepadButton =>
  keycode - Keycode.GP_BUTTON_A + GamepadButton.GP_BUTTON_A
