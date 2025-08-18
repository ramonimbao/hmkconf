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

import { createContext, useContext, useState } from "react"

import { createConfigurator } from "@/lib/create-configurator"
import { Configurator } from "@/types/configurator"

const ConfiguratorContext = createContext({} as Configurator)

export const useConfigurator = () => useContext(ConfiguratorContext)

export function ConfiguratorProvider({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  const [useConfigurator] = useState(createConfigurator)

  return (
    <ConfiguratorContext.Provider value={useConfigurator()}>
      {children}
    </ConfiguratorContext.Provider>
  )
}
