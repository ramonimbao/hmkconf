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

import { createContext, useContext, useState } from "react"

import { HMKAKToggle, HMKAKType } from "@/types/libhmk"

import { useAdvancedKeysConfig } from ".."
import { AdvancedKeysConfigLayout } from "../layout"
import { ToggleBinding } from "./toggle-binding"
import { ToggleTabs } from "./toggle-tabs"

type ToggleProps = {
  action: HMKAKToggle
  bindingSelected: boolean
  setBindingSelected: (bindingSelected: boolean) => void
}

const ToggleContext = createContext({} as ToggleProps)

export const useToggle = () => useContext(ToggleContext)

export function AdvancedKeysConfigToggle() {
  const {
    advancedKey: { action },
  } = useAdvancedKeysConfig()

  const [bindingSelected, setBindingSelected] = useState(false)

  if (action.type !== HMKAKType.TOGGLE) {
    return null
  }

  return (
    <ToggleContext.Provider
      value={{ action, bindingSelected, setBindingSelected }}
    >
      <AdvancedKeysConfigLayout>
        <div className="grid size-full grid-cols-[30rem_minmax(0,1fr)]">
          <ToggleBinding />
          <ToggleTabs />
        </div>
      </AdvancedKeysConfigLayout>
    </ToggleContext.Provider>
  )
}
