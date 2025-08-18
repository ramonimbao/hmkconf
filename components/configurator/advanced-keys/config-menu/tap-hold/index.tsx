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

import { HMKAKTapHold, HMKAKType } from "@/types/libhmk"

import { useAdvancedKeysConfig } from ".."
import { AdvancedKeysConfigLayout } from "../layout"
import { TapHoldBindings } from "./tap-hold-bindings"
import { TapHoldTabs } from "./tap-hold-tabs"

type TapHoldProps = {
  action: HMKAKTapHold
  binding: "tap" | "hold" | ""
  setBinding: (binding: "tap" | "hold" | "") => void
}

const TapHoldContext = createContext({} as TapHoldProps)

export const useTapHold = () => useContext(TapHoldContext)

export function AdvancedKeysConfigTapHold() {
  const {
    advancedKey: { action },
  } = useAdvancedKeysConfig()

  const [binding, setBinding] = useState<"tap" | "hold" | "">("")

  if (action.type !== HMKAKType.TAP_HOLD) {
    return null
  }

  return (
    <TapHoldContext.Provider value={{ action, binding, setBinding }}>
      <AdvancedKeysConfigLayout>
        <div className="grid size-full grid-cols-[30rem_minmax(0,1fr)]">
          <TapHoldBindings />
          <TapHoldTabs />
        </div>
      </AdvancedKeysConfigLayout>
    </TapHoldContext.Provider>
  )
}
