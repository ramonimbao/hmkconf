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

import z from "zod"

export enum HMKCommand {
  FIRMWARE_VERSION = 0,
  REBOOT,
  BOOTLOADER,
  FACTORY_RESET,
  RECALIBRATE,
  ANALOG_INFO,
  GET_CALIBRATION,
  SET_CALIBRATION,
  GET_PROFILE,
  GET_OPTIONS,
  SET_OPTIONS,

  GET_KEYMAP = 128,
  SET_KEYMAP,
  GET_ACTUATION_MAP,
  SET_ACTUATION_MAP,
  GET_ADVANCED_KEYS,
  SET_ADVANCED_KEYS,
  GET_TICK_RATE,
  SET_TICK_RATE,
  GET_GAMEPAD_BUTTONS,
  SET_GAMEPAD_BUTTONS,
  GET_GAMEPAD_OPTIONS,
  SET_GAMEPAD_OPTIONS,

  UNKNOWN = 255,
}

export type HMKAnalogInfo = {
  adcValue: number
  distance: number
}

export const hmkCalibrationSchema = z.object({
  initialRestValue: z.int().min(0),
  initialBottomOutThreshold: z.int().min(0),
})

export type HMKCalibration = z.infer<typeof hmkCalibrationSchema>

export const hmkOptionsSchema = z.object({
  xinputEnabled: z.boolean(),
})

export type HMKOptions = z.infer<typeof hmkOptionsSchema>

export const hmkActuationSchema = z.object({
  actuationPoint: z.int().min(0).max(255),
  rtDown: z.int().min(0).max(255),
  rtUp: z.int().min(0).max(255),
  continuous: z.boolean(),
})

export type HMKActuation = z.infer<typeof hmkActuationSchema>

export enum HMKAKType {
  NONE = 0,
  NULL_BIND,
  DYNAMIC_KEYSTROKE,
  TAP_HOLD,
  TOGGLE,
}

export const hmkAKNoneSchema = z.object({
  type: z.literal(HMKAKType.NONE),
})

export type HMKAKNone = z.infer<typeof hmkAKNoneSchema>

export enum HMKNullBindBehavior {
  LAST = 0,
  PRIMARY,
  SECONDARY,
  NEUTRAL,
  DISTANCE,
}

export const hmkAKNullBindSchema = z.object({
  type: z.literal(HMKAKType.NULL_BIND),
  secondaryKey: z.number().min(0).max(255),
  behavior: z.enum(HMKNullBindBehavior),
  bottomOutPoint: z.number().min(0).max(255),
})

export type HMKAKNullBind = z.infer<typeof hmkAKNullBindSchema>

export enum HMKDKSAction {
  HOLD = 0,
  PRESS,
  RELEASE,
  TAP,
}

export const hmkAKDynamicKeystrokeSchema = z.object({
  type: z.literal(HMKAKType.DYNAMIC_KEYSTROKE),
  keycodes: z.array(z.int().min(0).max(255)).length(4),
  bitmap: z.array(z.array(z.enum(HMKDKSAction)).length(4)).length(4),
  bottomOutPoint: z.int().min(0).max(255),
})

export type HMKAKDynamicKeystroke = z.infer<typeof hmkAKDynamicKeystrokeSchema>

export const hmkAKTapHoldSchema = z.object({
  type: z.literal(HMKAKType.TAP_HOLD),
  tapKeycode: z.int().min(0).max(255),
  holdKeycode: z.int().min(0).max(255),
  tappingTerm: z.int().min(0).max(65535),
  holdOnOtherKeyPress: z.boolean(),
})

export type HMKAKTapHold = z.infer<typeof hmkAKTapHoldSchema>

export const hmkAKToggleSchema = z.object({
  type: z.literal(HMKAKType.TOGGLE),
  keycode: z.int().min(0).max(255),
  tappingTerm: z.int().min(0).max(65535),
})

export type DeviceAKToggle = z.infer<typeof hmkAKToggleSchema>

export const hmkAdvancedKeySchema = z.object({
  layer: z.int().min(0).max(7),
  key: z.int().min(0).max(255),
  ak: z.union([
    hmkAKNoneSchema,
    hmkAKNullBindSchema,
    hmkAKDynamicKeystrokeSchema,
    hmkAKTapHoldSchema,
    hmkAKToggleSchema,
  ]),
})

export type HMKAdvancedKey = z.infer<typeof hmkAdvancedKeySchema>

export const hmkGamepadAnalogCurveSchema = z
  .array(
    z.object({
      x: z.number().min(0).max(255),
      y: z.number().min(0).max(255),
    }),
  )
  .length(4)

export type HMKGamepadAnalogCurve = z.infer<typeof hmkGamepadAnalogCurveSchema>

export const hmkGamepadOptionsSchema = z.object({
  analogCurve: hmkGamepadAnalogCurveSchema,
  keyboardEnabled: z.boolean(),
  gamepadOverride: z.boolean(),
  squareJoystick: z.boolean(),
  snappyJoystick: z.boolean(),
})

export type HMKGamepadOptions = z.infer<typeof hmkGamepadOptionsSchema>
