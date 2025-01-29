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
