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
    akIndex: number | null
  }
  debug: {
    logEnabled: boolean
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
    setShowKeymap(showKeymap: boolean): void
  }
  advancedKeys: {
    setLayer(layer: number): void
    setAKIndex(akIndex: number | null): void
  }
  debug: {
    setLogEnabled(enabled: boolean): void
  }
}

export type Configurator = ConfiguratorState & ConfiguratorAction
