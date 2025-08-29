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

import { createContext, useContext } from "react"

import { HMKAKNullBind, HMKAKType } from "@/types/libhmk"

import { useAdvancedKeysConfig } from ".."
import { AdvancedKeysConfigLayout } from "../layout"
import { NullBindBehavior } from "./null-bind-behavior"
import { NullBindTabs } from "./null-bind-tabs"

type NullBindProps = {
  action: HMKAKNullBind
}

const NullBindContext = createContext({} as NullBindProps)

export const useNullBind = () => useContext(NullBindContext)

export function AdvancedKeysConfigNullBind() {
  const {
    advancedKey: { action },
  } = useAdvancedKeysConfig()

  if (action.type !== HMKAKType.NULL_BIND) {
    return null
  }

  return (
    <NullBindContext.Provider value={{ action }}>
      <AdvancedKeysConfigLayout>
        <div className="grid size-full grid-cols-[30rem_minmax(0,1fr)]">
          <NullBindBehavior />
          <NullBindTabs />
        </div>
      </AdvancedKeysConfigLayout>
    </NullBindContext.Provider>
  )
}
