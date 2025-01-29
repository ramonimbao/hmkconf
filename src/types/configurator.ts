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

export type ConfiguratorState = {
  tab: string
  profileNum: number
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
    akcIndex: number | null
  }
}

export type ConfiguratorAction = {
  reset(): void
  setTab(tab: string): void
  setProfileNum(profileNum: number): void
  remap: {
    setLayer(layer: number): void
    setKey(key: number | null): void
  }
  performance: {
    setKeys(keys: number[]): void
    setShowKeymap(showKeymap: boolean): void
  }
  advancedKeys: {
    setLayer(layer: number): void
    setAKCIndex(akcIndex: number | null): void
  }
}

export type Configurator = ConfiguratorState & ConfiguratorAction
