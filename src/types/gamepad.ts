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

import { HMKGamepadAnalogCurve } from "./libhmk"

export enum GamepadButton {
  GP_BUTTON_NONE = 0,
  GP_BUTTON_A,
  GP_BUTTON_B,
  GP_BUTTON_X,
  GP_BUTTON_Y,
  GP_BUTTON_UP,
  GP_BUTTON_DOWN,
  GP_BUTTON_LEFT,
  GP_BUTTON_RIGHT,
  GP_BUTTON_START,
  GP_BUTTON_BACK,
  GP_BUTTON_HOME,
  GP_BUTTON_LS,
  GP_BUTTON_RS,
  GP_BUTTON_LB,
  GP_BUTTON_RB,
  GP_BUTTON_LS_UP,
  GP_BUTTON_LS_DOWN,
  GP_BUTTON_LS_LEFT,
  GP_BUTTON_LS_RIGHT,
  GP_BUTTON_RS_UP,
  GP_BUTTON_RS_DOWN,
  GP_BUTTON_RS_LEFT,
  GP_BUTTON_RS_RIGHT,
  GP_BUTTON_LT,
  GP_BUTTON_RT,
}

export type GamepadAnalogCurvePreset = {
  name: string
  curve: HMKGamepadAnalogCurve
}
