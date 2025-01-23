export type ConfiguratorState = {
  tab: string
  profileNum: number
}

export type ConfiguratorAction = {
  reset(): void
  setTab(tab: string): void
  setProfileNum(profileNum: number): void
}

export type Configurator = ConfiguratorState & ConfiguratorAction
