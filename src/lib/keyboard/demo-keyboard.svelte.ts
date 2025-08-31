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

import { analogCurvePresets } from "$lib/configurator/lib/gamepad"
import type { HMK_Options } from "$lib/libhmk"
import { defaultActuation, type HMK_Actuation } from "$lib/libhmk/actuation"
import {
  DEFAULT_TICK_RATE,
  defaultAdvancedKey,
  type HMK_AdvancedKey,
} from "$lib/libhmk/advanced-keys"
import { HMK_GamepadButton, type HMK_GamepadOptions } from "$lib/libhmk/gamepad"
import type {
  GetActuationMapParams,
  GetAdvancedKeysParams,
  GetGamepadButtonsParams,
  GetGamepadOptionsParams,
  GetKeymapParams,
  GetTickRateParams,
  Keyboard,
  SetActuationMapParams,
  SetAdvancedKeysParams,
  SetGamepadButtonsParams,
  SetGamepadOptionsParams,
  SetKeymapParams,
  SetOptionsParams,
  SetTickRateParams,
} from "."
import { demoMetadata } from "./metadata"

const { numProfiles, numKeys, numAdvancedKeys, defaultKeymap } = demoMetadata

type DemoKeyboardState = {
  options: HMK_Options
  profiles: {
    keymap: number[][]
    actuationMap: HMK_Actuation[]
    advancedKeys: HMK_AdvancedKey[]
    gamepadButtons: number[]
    gamepadOptions: HMK_GamepadOptions
    tickRate: number
  }[]
}

export class DemoKeyboard implements Keyboard {
  id = "demo"
  demo = true
  metadata = demoMetadata

  #state: DemoKeyboardState = {
    options: { xInputEnabled: true },
    profiles: [...Array(numProfiles)].map(() => ({
      keymap: defaultKeymap.map((row) => [...row]),
      actuationMap: [...Array(numKeys)].map(() => ({ ...defaultActuation })),
      advancedKeys: [...Array(numAdvancedKeys)].map(() => ({
        ...defaultAdvancedKey,
      })),
      gamepadButtons: Array(numKeys).fill(HMK_GamepadButton.NONE),
      gamepadOptions: {
        analogCurve: analogCurvePresets[0].curve,
        keyboardEnabled: true,
        gamepadOverride: false,
        squareJoystick: false,
        snappyJoystick: true,
      },
      tickRate: DEFAULT_TICK_RATE,
    })),
  }

  async disconnect() {}
  async forget() {}

  async getProfile() {
    return 0
  }
  async getOptions() {
    return this.#state.options
  }
  async setOptions({ data }: SetOptionsParams) {
    this.#state.options = data
  }

  async getKeymap({ profile }: GetKeymapParams) {
    return this.#state.profiles[profile].keymap
  }
  async setKeymap({ profile, layer, offset, data }: SetKeymapParams) {
    for (let i = 0; i < data.length; i++) {
      this.#state.profiles[profile].keymap[layer][offset + i] = data[i]
    }
  }
  async getActuationMap({ profile }: GetActuationMapParams) {
    return this.#state.profiles[profile].actuationMap
  }
  async setActuationMap({ profile, offset, data }: SetActuationMapParams) {
    for (let i = 0; i < data.length; i++) {
      this.#state.profiles[profile].actuationMap[offset + i] = data[i]
    }
  }
  async getAdvancedKeys({ profile }: GetAdvancedKeysParams) {
    return this.#state.profiles[profile].advancedKeys
  }
  async setAdvancedKeys({ profile, offset, data }: SetAdvancedKeysParams) {
    for (let i = 0; i < data.length; i++) {
      this.#state.profiles[profile].advancedKeys[offset + i] = data[i]
    }
  }
  async getGamepadButtons(params: GetGamepadButtonsParams): Promise<number[]> {
    return this.#state.profiles[params.profile].gamepadButtons
  }
  async setGamepadButtons({ profile, offset, data }: SetGamepadButtonsParams) {
    for (let i = 0; i < data.length; i++) {
      this.#state.profiles[profile].gamepadButtons[offset + i] = data[i]
    }
  }
  async getGamepadOptions({ profile }: GetGamepadOptionsParams) {
    return this.#state.profiles[profile].gamepadOptions
  }
  async setGamepadOptions({ profile, data }: SetGamepadOptionsParams) {
    this.#state.profiles[profile].gamepadOptions = data
  }
  async getTickRate({ profile }: GetTickRateParams) {
    return this.#state.profiles[profile].tickRate
  }
  async setTickRate({ profile, data }: SetTickRateParams) {
    this.#state.profiles[profile].tickRate = data
  }
}
