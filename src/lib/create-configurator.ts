import { Configurator, ConfiguratorState } from "@/types/configurator"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

const initialState: ConfiguratorState = {
  tab: "remap",
  profileNum: 0,
  remap: {
    layer: 0,
    key: null,
  },
}

export function createConfigurator() {
  return create<Configurator>()(
    immer((set) => ({
      ...initialState,

      reset: () => set((state) => Object.assign(state, initialState)),
      setTab: (tab) => set({ tab }),
      setProfileNum: (profileNum) =>
        set((state) => {
          state.profileNum = profileNum
          state.remap = Object.assign(state.remap, initialState.remap)
        }),

      remap: {
        ...initialState.remap,

        setLayer: (layer) =>
          set((state) => {
            state.remap.layer = layer
            state.remap.key = null
          }),
        setKey: (key) =>
          set((state) => {
            state.remap.key = key
          }),
      },
    })),
  )
}
