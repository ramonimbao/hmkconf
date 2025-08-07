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

import { DeviceMetadata } from "./device-metadata"
import {
  HMKActuation,
  HMKAdvancedKey,
  HMKAnalogInfo,
  HMKCalibration,
  HMKGamepadOptions,
  HMKOptions,
} from "./libhmk"

export type DeviceState = {
  id: string
  metadata: DeviceMetadata
  isDemo: boolean
}

export type DeviceAction = {
  connect(): Promise<void>
  disconnect(forget: boolean): Promise<void>
  firmwareVersion(): Promise<number>
  reboot(): Promise<void>
  bootloader(): Promise<void>
  factoryReset(): Promise<void>
  recalibrate(): Promise<void>
  analogInfo(): Promise<HMKAnalogInfo[]>
  getCalibration(): Promise<HMKCalibration>
  setCalibration(calibration: HMKCalibration): Promise<void>
  getOptions(): Promise<HMKOptions>
  setOptions(options: HMKOptions): Promise<void>
  getProfile(): Promise<number>
  getKeymap(profile: number): Promise<number[][]>
  setKeymap(
    profile: number,
    layer: number,
    start: number,
    keymap: number[],
  ): Promise<void>
  getActuationMap(profile: number): Promise<HMKActuation[]>
  setActuationMap(
    profile: number,
    start: number,
    actuation: HMKActuation[],
  ): Promise<void>
  getAdvancedKeys(profile: number): Promise<HMKAdvancedKey[]>
  setAdvancedKeys(
    profile: number,
    start: number,
    advancedKeys: HMKAdvancedKey[],
  ): Promise<void>
  getTickRate(profile: number): Promise<number>
  setTickRate(profile: number, tickRate: number): Promise<void>
  getGamepadButtons(profile: number): Promise<number[]>
  setGamepadButtons(
    profile: number,
    start: number,
    buttons: number[],
  ): Promise<void>
  getGamepadOptions(profile: number): Promise<HMKGamepadOptions>
  setGamepadOptions(profile: number, options: HMKGamepadOptions): Promise<void>
}

export type Device = DeviceState & DeviceAction
