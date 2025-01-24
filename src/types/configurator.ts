export type ConfiguratorState = {
  tab: string
  profileNum: number
  remap: {
    layer: number
    key: number | null
  }
}

export type ConfiguratorAction = {
  reset(): void
  setTab(tab: string): void
  setProfileNum(profileNum: number): void
  remap: {
    setLayer(layer: number): void
    setKey(key: number | null): void
  }
}

export type Configurator = ConfiguratorState & ConfiguratorAction
