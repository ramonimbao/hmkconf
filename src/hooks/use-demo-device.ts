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

import { DEFAULT_ACTUATION, DEFAULT_ADVANCED_KEY } from "@/constants/devices"
import { HE60 as DEMO_DEVICE } from "@/constants/devices/HE60"
import {
  DeviceAction,
  DeviceActuation,
  DeviceAdvancedKey,
  DeviceCalibration,
  DeviceState,
} from "@/types/devices"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type DemoDeviceState = DeviceState & {
  calibration: DeviceCalibration
  profile: {
    keymap: number[][]
    actuationMap: DeviceActuation[]
    advancedKeys: DeviceAdvancedKey[]
    tickRate: number
  }[]
}

type DemoDevice = DemoDeviceState & DeviceAction

const initialState: DemoDeviceState = {
  id: "DEMO_DEVICE",
  metadata: DEMO_DEVICE,
  isDemo: true,
  calibration: {
    initialRestValue: 0,
    initialBottomOutThreshold: 0,
  },
  profile: Array.from({ length: DEMO_DEVICE.numProfiles }, () => ({
    keymap: DEMO_DEVICE.defaultKeymap,
    actuationMap: Array(DEMO_DEVICE.numKeys).fill(DEFAULT_ACTUATION),
    advancedKeys: Array(DEMO_DEVICE.numAdvancedKeys).fill(DEFAULT_ADVANCED_KEY),
    tickRate: 30,
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

    async analogInfo() {
      return Array(DEMO_DEVICE.numKeys).fill({
        adcValue: 0,
        distance: 0,
      })
    },

    async getCalibration() {
      return get().calibration
    },

    async setCalibration(calibration) {
      set((state) => {
        state.calibration = calibration
      })
    },

    async getProfile() {
      return 0
    },

    async getKeymap(profile) {
      return get().profile[profile].keymap
    },

    async setKeymap(profile, layer, start, keymap) {
      set((state) => {
        for (let i = 0; i < keymap.length; i++) {
          state.profile[profile].keymap[layer][start + i] = keymap[i]
        }
      })
    },

    async getActuationMap(profile) {
      return get().profile[profile].actuationMap
    },

    async setActuationMap(profile, start, actuationMap) {
      set((state) => {
        for (let i = 0; i < actuationMap.length; i++) {
          state.profile[profile].actuationMap[start + i] = actuationMap[i]
        }
      })
    },

    async getAdvancedKeys(profile) {
      return get().profile[profile].advancedKeys
    },

    async setAdvancedKeys(profile, start, advancedKeys) {
      set((state) => {
        for (let i = 0; i < advancedKeys.length; i++) {
          state.profile[profile].advancedKeys[start + i] = advancedKeys[i]
        }
      })
    },

    async getTickRate(profile) {
      return get().profile[profile].tickRate
    },

    async setTickRate(profile, tickRate) {
      set((state) => {
        state.profile[profile].tickRate = tickRate
      })
    },
  })),
)
