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
import { useShallow } from "zustand/react/shallow"

import { createConfigurator } from "@/lib/create-configurator"

const ConfiguratorContext = createContext(
  {} as ReturnType<typeof createConfigurator>,
)

export const useConfiguratorGlobal = () =>
  useContext(ConfiguratorContext)(useShallow((state) => state.global))

export const useConfiguratorRemap = () =>
  useContext(ConfiguratorContext)(useShallow((state) => state.remap))

export const useConfiguratorPerformance = () =>
  useContext(ConfiguratorContext)(useShallow((state) => state.performance))

export const useConfiguratorAdvancedKeys = () =>
  useContext(ConfiguratorContext)(useShallow((state) => state.advancedKeys))

export const useConfiguratorGamepad = () =>
  useContext(ConfiguratorContext)(useShallow((state) => state.gamepad))

export function ConfiguratorProvider({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  const [useConfigurator] = useState(createConfigurator)

  return (
    <ConfiguratorContext.Provider value={useConfigurator}>
      {children}
    </ConfiguratorContext.Provider>
  )
}
