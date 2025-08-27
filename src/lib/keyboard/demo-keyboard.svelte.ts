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

import { defaultActuation, type HMK_Actuation } from "$lib/libhmk/actuation"
import type {
  GetActuationMapParams,
  GetKeymapParams,
  Keyboard,
  SetActuationMapParams,
  SetKeymapParams,
} from "."
import { demoMetadata } from "./metadata"

const { numProfiles, numKeys, defaultKeymap } = demoMetadata

type DemoKeyboardState = {
  profiles: {
    keymap: number[][]
    actuationMap: HMK_Actuation[]
  }[]
}

export class DemoKeyboard implements Keyboard {
  id = "demo"
  demo = true
  metadata = demoMetadata

  #state: DemoKeyboardState = {
    profiles: [...Array(numProfiles)].map(() => ({
      keymap: defaultKeymap.map((row) => [...row]),
      actuationMap: [...Array(numKeys)].map(() => ({ ...defaultActuation })),
    })),
  }

  async disconnect() {}
  async forget() {}

  async getProfile() {
    return 0
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
}
