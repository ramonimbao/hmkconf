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
  HMKActuation,
  HMKAdvancedKey,
  HMKAnalogInfo,
  HMKCalibration,
  HMKGamepadOptions,
  HMKOptions,
} from "../libhmk"
import { KeyboardMetadata } from "./metadata"

export type KeyboardState = {
  id: string
  metadata: KeyboardMetadata
  isDemo: boolean
}

export type KeyboardDisconnectOptions = {
  forget: boolean
}

export type KeyboardSetCalibrationOptions = {
  calibration: HMKCalibration
}

export type KeyboardSetOptionsOptions = {
  options: HMKOptions
}

export type KeyboardResetProfileOptions = {
  profile: number
}

export type KeyboardDuplicateProfileOptions = {
  profile: number
  srcProfile: number
}

export type KeyboardGetKeymapOptions = {
  profile: number
  layer: number
}

export type KeyboardSetKeymapOptions = {
  profile: number
  layer: number
  offset: number
  keymap: number[]
}

export type KeyboardGetActuationMapOptions = {
  profile: number
}

export type KeyboardSetActuationMapOptions = {
  profile: number
  offset: number
  actuation: HMKActuation[]
}

export type KeyboardGetAdvancedKeysOptions = {
  profile: number
}

export type KeyboardSetAdvancedKeysOptions = {
  profile: number
  offset: number
  advancedKeys: HMKAdvancedKey[]
}

export type KeyboardGetTickRateOptions = {
  profile: number
}

export type KeyboardSetTickRateOptions = {
  profile: number
  tickRate: number
}

export type KeyboardGetGamepadButtonsOptions = {
  profile: number
}

export type KeyboardSetGamepadButtonsOptions = {
  profile: number
  offset: number
  buttons: number[]
}

export type KeyboardGetGamepadOptions = {
  profile: number
}

export type KeyboardSetGamepadOptions = {
  profile: number
  options: HMKGamepadOptions
}

export type KeyboardAction = {
  disconnect(): Promise<void>
  forget(): Promise<void>

  firmwareVersion(): Promise<number>
  reboot(): Promise<void>
  bootloader(): Promise<void>
  factoryReset(): Promise<void>
  recalibrate(): Promise<void>
  analogInfo(): Promise<HMKAnalogInfo[]>
  getCalibration(): Promise<HMKCalibration>
  setCalibration(options: KeyboardSetCalibrationOptions): Promise<void>
  getOptions(): Promise<HMKOptions>
  setOptions(options: KeyboardSetOptionsOptions): Promise<void>
  getProfile(): Promise<number>
  resetProfile(options: KeyboardResetProfileOptions): Promise<void>
  duplicateProfile(options: KeyboardDuplicateProfileOptions): Promise<void>

  getKeymap(options: KeyboardGetKeymapOptions): Promise<number[]>
  setKeymap(options: KeyboardSetKeymapOptions): Promise<void>
  getActuationMap(
    options: KeyboardGetActuationMapOptions,
  ): Promise<HMKActuation[]>
  setActuationMap(options: KeyboardSetActuationMapOptions): Promise<void>
  getAdvancedKeys(
    options: KeyboardGetAdvancedKeysOptions,
  ): Promise<HMKAdvancedKey[]>
  setAdvancedKeys(options: KeyboardSetAdvancedKeysOptions): Promise<void>
  getTickRate(options: KeyboardGetTickRateOptions): Promise<number>
  setTickRate(options: KeyboardSetTickRateOptions): Promise<void>
  getGamepadButtons(
    options: KeyboardGetGamepadButtonsOptions,
  ): Promise<number[]>
  setGamepadButtons(options: KeyboardSetGamepadButtonsOptions): Promise<void>
  getGamepadOptions(
    options: KeyboardGetGamepadOptions,
  ): Promise<HMKGamepadOptions>
  setGamepadOptions(options: KeyboardSetGamepadOptions): Promise<void>
}

export type Keyboard = KeyboardState & KeyboardAction
