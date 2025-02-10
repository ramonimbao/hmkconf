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

import { DEFAULT_ACTUATION } from "@/constants/devices"
import { GAUSS64 } from "@/constants/devices/GAUSS64"
import {
  DeviceAction,
  DeviceActuation,
  DeviceAdvancedKey,
  DeviceState,
} from "@/types/devices"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type DemoDeviceState = DeviceState & {
  profile: {
    keymap: number[][]
    actuationMap: DeviceActuation[]
    advancedKeys: DeviceAdvancedKey[]
  }[]
}

type DemoDevice = DemoDeviceState & DeviceAction

const initialState: DemoDeviceState = {
  id: "DEMO_DEVICE",
  metadata: GAUSS64,
  isDemo: true,
  profile: Array.from({ length: GAUSS64.numProfiles }, () => ({
    keymap: GAUSS64.defaultKeymap,
    actuationMap: Array(GAUSS64.numKeys).fill(DEFAULT_ACTUATION),
    advancedKeys: [],
  })),
}

export const useDemoDevice = create<DemoDevice>()(
  immer((set, get) => ({
    ...initialState,

    async connect() {},

    async disconnect() {
      set({ ...initialState })
    },

    async firmwareVersion() {
      return 0x0100
    },

    async reboot() {},

    async bootloader() {},

    async factoryReset() {
      set({ ...initialState })
    },

    async recalibrate() {},

    async debug() {
      return Array(GAUSS64.numKeys).fill({
        adcValue: 0,
        distance: 0,
      })
    },

    async getProfile() {
      return 0
    },

    async getKeymap(profile) {
      return get().profile[profile].keymap
    },

    async setKeymap(profile, keymap) {
      set((state) => {
        state.profile[profile].keymap = keymap
      })
    },

    async getActuationMap(profile) {
      return get().profile[profile].actuationMap
    },

    async setActuationMap(profile, actuationMap) {
      set((state) => {
        state.profile[profile].actuationMap = actuationMap
      })
    },

    async getAdvancedKeys(profile) {
      return get().profile[profile].advancedKeys
    },

    async setAdvancedKeys(profile, advancedKeys) {
      set((state) => {
        state.profile[profile].advancedKeys = advancedKeys
      })
    },
  })),
)
