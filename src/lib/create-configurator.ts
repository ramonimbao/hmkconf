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
  performance: {
    keys: [],
    showKeymap: false,
  },
  advancedKeys: {
    layer: 0,
    keys: [],
  },
}

export function createConfigurator() {
  return create<Configurator>()(
    immer((set) => ({
      ...initialState,

      reset: () =>
        set((state) => ({
          ...initialState,
          remap: { ...state.remap, ...initialState.remap },
          performance: { ...state.performance, ...initialState.performance },
          advancedKeys: { ...state.advancedKeys, ...initialState.advancedKeys },
        })),
      setTab: (tab) => set({ tab }),
      setProfileNum: (profileNum) =>
        set((state) => ({
          ...initialState,
          profileNum,
          remap: { ...state.remap, ...initialState.remap },
          performance: { ...state.performance, ...initialState.performance },
          advancedKeys: { ...state.advancedKeys, ...initialState.advancedKeys },
        })),

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

      performance: {
        ...initialState.performance,

        setKeys: (keys) =>
          set((state) => {
            state.performance.keys = keys
          }),
        setShowKeymap: (showKeymap) =>
          set((state) => {
            state.performance.showKeymap = showKeymap
          }),
      },

      advancedKeys: {
        ...initialState.advancedKeys,

        setLayer: (layer) =>
          set((state) => {
            state.advancedKeys.layer = layer
            state.advancedKeys.keys = []
          }),
        setKeys: (keys) =>
          set((state) => {
            state.advancedKeys.keys = keys
          }),
      },
    })),
  )
}
