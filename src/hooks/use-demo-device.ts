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

import { DEFAULT_ACTUATION, NUM_PROFILES } from "@/constants/devices"
import { GAUSS64 } from "@/constants/devices/GAUSS64"
import {
  DeviceAction,
  DeviceActuation,
  DeviceAKC,
  DeviceState,
} from "@/types/devices"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type DemoDeviceState = DeviceState & {
  profile: {
    keymap: number[][]
    actuations: DeviceActuation[]
    akc: DeviceAKC[]
  }[]
}

type DemoDevice = DemoDeviceState & DeviceAction

const initialState: DemoDeviceState = {
  id: "DEMO_DEVICE",
  metadata: GAUSS64,
  isDemo: true,
  profile: Array.from({ length: NUM_PROFILES }, () => ({
    keymap: GAUSS64.defaultKeymap,
    actuations: Array(GAUSS64.numKeys).fill(DEFAULT_ACTUATION),
    akc: [],
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

    async getProfileNum() {
      return 0
    },

    async getKeymap(profileNum) {
      return get().profile[profileNum].keymap
    },

    async setKeymap(profileNum, keymap) {
      set((state) => {
        state.profile[profileNum].keymap = keymap
      })
    },

    async getActuations(profileNum) {
      return get().profile[profileNum].actuations
    },

    async setActuations(profileNum, actuations) {
      set((state) => {
        state.profile[profileNum].actuations = actuations
      })
    },

    async getAKC(profileNum) {
      return get().profile[profileNum].akc
    },

    async setAKC(profileNum, akc) {
      set((state) => {
        state.profile[profileNum].akc = akc
      })
    },
  })),
)
