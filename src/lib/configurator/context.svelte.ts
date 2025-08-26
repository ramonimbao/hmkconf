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

import { HMK_AKType } from "$lib/libhmk/advanced-keys"
import { Context } from "runed"
import { SvelteSet } from "svelte/reactivity"
import { getAdvancedKeyMetadata } from "./lib/advanced-keys"

export class ConfiguratorRemapState {
  layer = $state(0)
  key: number | null = $state(null)

  reset() {
    this.layer = 0
    this.key = null
  }
  setLayer(layer: number) {
    this.layer = layer
    this.key = null
  }
}

export const remapStateContext = new Context<ConfiguratorRemapState>(
  "hmk-remap-state",
)

export class ConfiguratorPerformanceState {
  keys = new SvelteSet<number>()
  showKeymap = $state(false)

  reset() {
    this.keys.clear()
    this.showKeymap = false
  }
}

export const performanceStateContext =
  new Context<ConfiguratorPerformanceState>("hmk-performance-state")

export class ConfiguratorAdvancedKeysState {
  layer = $state(0)
  index: number | null = $state(null)
  create: {
    type: HMK_AKType
    keyIndex: number | null
    keys: (number | null)[]
  } | null = $state(null)

  reset() {
    this.layer = 0
    this.index = null
    this.create = null
  }
  setLayer(layer: number) {
    this.layer = layer
    this.index = null
    this.create = null
  }
  createOpen(type: HMK_AKType) {
    if (type === HMK_AKType.NONE) return
    const { numKeys } = getAdvancedKeyMetadata(type)
    this.create = { type, keyIndex: 0, keys: Array(numKeys).fill(null) }
    this.index = null
  }
  createClose() {
    this.create = null
    this.index = null
  }
  createSetKeyIndex(index: number) {
    if (!this.create) return
    this.create.keyIndex = index
    if (this.create.keys[index] !== null) {
      this.create.keys[index] = null
    }
  }
  createSetKey(key: number) {
    if (!this.create) return
    let index = this.create.keys.indexOf(key)
    if (index !== -1) {
      this.create.keys[index] = null
      this.create.keyIndex = index
    } else if (this.create.keyIndex !== null) {
      this.create.keys[this.create.keyIndex] = key
      index = this.create.keys.indexOf(null)
      this.create.keyIndex = index === -1 ? null : index
    }
  }
}

export const advancedKeysStateContext =
  new Context<ConfiguratorAdvancedKeysState>("hmk-advanced-keys-state")

export type ConfiguratorGamepadTabs = "setup" | "analog"

export class ConfiguratorGamepadState {
  key: number | null = $state(null)
  tab: ConfiguratorGamepadTabs = $state("setup")

  reset() {
    this.key = null
    this.tab = "setup"
  }
  setTab(tab: ConfiguratorGamepadTabs) {
    this.tab = tab
    this.key = null
  }
}

export const gamepadStateContext = new Context<ConfiguratorGamepadState>(
  "hmk-gamepad-state",
)

export type ConfiguratorTabs =
  | "profiles"
  | "remap"
  | "performance"
  | "advanced-keys"
  | "gamepad"
  | "debug"
  | "settings"

export class ConfiguratorGlobalState {
  tab: ConfiguratorTabs = $state("remap")
  profile = $state(0)

  #remapState: ConfiguratorRemapState
  #performanceState: ConfiguratorPerformanceState
  #advancedKeysState: ConfiguratorAdvancedKeysState
  #gamepadState: ConfiguratorGamepadState

  constructor() {
    this.#remapState = remapStateContext.get()
    this.#performanceState = performanceStateContext.get()
    this.#advancedKeysState = advancedKeysStateContext.get()
    this.#gamepadState = gamepadStateContext.get()
  }

  setProfile(profile: number) {
    this.profile = profile
    this.#remapState.reset()
    this.#performanceState.reset()
    this.#advancedKeysState.reset()
    this.#gamepadState.reset()
  }
}

export const globalStateContext = new Context<ConfiguratorGlobalState>(
  "hmk-configurator-state",
)

export function setConfiguratorStateContext() {
  remapStateContext.set(new ConfiguratorRemapState())
  performanceStateContext.set(new ConfiguratorPerformanceState())
  advancedKeysStateContext.set(new ConfiguratorAdvancedKeysState())
  gamepadStateContext.set(new ConfiguratorGamepadState())
  globalStateContext.set(new ConfiguratorGlobalState())
}
