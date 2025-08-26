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

import type { GetKeymapParams, Keyboard, SetKeymapParams } from "."
import { demoMetadata } from "./metadata"

const { numProfiles, defaultKeymap } = demoMetadata

type DemoKeyboardState = {
  profiles: { keymap: number[][] }[]
}

export class DemoKeyboard implements Keyboard {
  id = "demo"
  demo = true
  metadata = demoMetadata

  #state: DemoKeyboardState = {
    profiles: [...Array(numProfiles)].map(() => ({
      keymap: defaultKeymap.map((row) => [...row]),
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
}
