import {
  DEFAULT_ACTUATION,
  DEFAULT_AKC,
  NUM_PROFILES,
} from "@/constants/devices"
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
    akc: Array(GAUSS64.numAKC).fill(DEFAULT_AKC),
  })),
}

export const useDemoDevice = create<DemoDevice>()(
  immer((set, get) => ({
    ...initialState,

    async disconnect() {
      set({ ...initialState })
    },

    async firmwareVersion() {
      return 0x0100
    },

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
