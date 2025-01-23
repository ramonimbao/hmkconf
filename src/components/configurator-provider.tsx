"use client"

import { Configurator } from "@/types/configurator"
import { createContext, ReactNode, useContext } from "react"

const ConfiguratorContext = createContext<Configurator>({} as Configurator)

export const useConfigurator = () => useContext(ConfiguratorContext)

interface ConfiguratorProviderProps {
  configurator: Configurator
  children: ReactNode
}

export function ConfiguratorProvider({
  configurator,
  children,
}: ConfiguratorProviderProps) {
  return (
    <ConfiguratorContext.Provider value={configurator}>
      {children}
    </ConfiguratorContext.Provider>
  )
}
