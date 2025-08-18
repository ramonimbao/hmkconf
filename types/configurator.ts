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

import { HMKAKType } from "./libhmk"

export type ConfiguratorState = {
  tab: string
  profile: number
  remap: {
    layer: number
    key: number | null
  }
  performance: {
    keys: number[]
    showKeymap: boolean
  }
  advancedKeys: {
    layer: number
    index: number | null
    newType: HMKAKType
    keyIndex: number | null
    keys: (number | null)[]
  }
  gamepad: {
    key: number | null
    tab: string
  }
}

export type ConfiguratorAction = {
  reset(): void
  setTab(tab: string): void
  setProfile(profile: number): void
  remap: {
    setLayer(layer: number): void
    setKey(key: number | null): void
  }
  performance: {
    setKeys(keys: number[]): void
    setShowKeymap(show: boolean): void
  }
  advancedKeys: {
    setLayer(layer: number): void
    setIndex(index: number | null): void
    setNewType: (newType: HMKAKType) => void
    setKeyIndex: (keyIndex: number) => void
    setKey: (key: number) => void
  }
  gamepad: {
    setKey(key: number | null): void
    setTab(tab: string): void
  }
}

export type Configurator = ConfiguratorState & ConfiguratorAction
