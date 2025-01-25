export type ConfiguratorState = {
  tab: string
  profileNum: number
  remap: {
    layer: number
    key: number | null
  }
  performance: {
    keys: number[]
    showKeymap: boolean
  }
  advancedKeys: {
    layer: number
    akcIndex: number | null
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
  performance: {
    setKeys(keys: number[]): void
    setShowKeymap(showKeymap: boolean): void
  }
  advancedKeys: {
    setLayer(layer: number): void
    setAKCIndex(akcIndex: number | null): void
  }
}

export type Configurator = ConfiguratorState & ConfiguratorAction
