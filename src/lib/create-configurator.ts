import { Configurator, ConfiguratorState } from "@/types/configurator"
import { create } from "zustand"

const initialState: ConfiguratorState = {
  tab: "remap",
  profileNum: 0,
}

export function createConfigurator() {
  return create<Configurator>()((set) => ({
    ...initialState,

    reset: () => set(initialState),
    setTab: (tab) => set({ tab }),
    setProfileNum: (profileNum) => set({ profileNum }),
  }))
}
