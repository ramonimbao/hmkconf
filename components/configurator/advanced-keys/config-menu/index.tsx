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

import {
  useConfiguratorAdvancedKeys,
  useConfiguratorGlobal,
} from "@/components/providers/configurator-provider"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"
import { getAdvancedKeyMetadata } from "@/lib/advanced-keys"
import { useSetAdvancedKeys } from "@/queries/set-advanced-keys"
import { AdvancedKeyMetadata } from "@/types/advanced-keys"
import { HMKAdvancedKey, HMKAKType } from "@/types/libhmk"

import { AdvancedKeysConfigUnknown } from "./config-unknown"
import { AdvancedKeysConfigDynamicKeystroke } from "./dynamic-keystroke"
import { AdvancedKeysConfigNullBind } from "./null-bind"
import { AdvancedKeysConfigTapHold } from "./tap-hold"
import { AdvancedKeysConfigToggle } from "./toggle"

type AdvancedKeysConfigProps = {
  index: number
  advancedKey: HMKAdvancedKey
  metadata: AdvancedKeyMetadata
  updateAdvancedKey: (
    f: (advancedKey: HMKAdvancedKey) => HMKAdvancedKey,
  ) => void
}

const AdvancedKeysConfigContext = createContext({} as AdvancedKeysConfigProps)

export const useAdvancedKeysConfig = () => useContext(AdvancedKeysConfigContext)

export function AdvancedKeysConfigMenu() {
  const { profile } = useConfiguratorGlobal()
  const { index } = useConfiguratorAdvancedKeys()

  const { isSuccess, advancedKeys } = useDisplayAdvancedKeys({ profile })
  const { mutate: setAdvancedKeys } = useSetAdvancedKeys({ profile })

  if (!isSuccess || index === null) {
    return null
  }

  const advancedKey = advancedKeys[index]
  const metadata = getAdvancedKeyMetadata(advancedKey.action.type)
  const updateAdvancedKey = (
    f: (advancedKey: HMKAdvancedKey) => HMKAdvancedKey,
  ) => setAdvancedKeys({ offset: index, advancedKeys: [f(advancedKey)] })

  return (
    <AdvancedKeysConfigContext.Provider
      value={{ index, advancedKey, metadata, updateAdvancedKey }}
    >
      {metadata.type === HMKAKType.NULL_BIND ? (
        <AdvancedKeysConfigNullBind />
      ) : metadata.type === HMKAKType.DYNAMIC_KEYSTROKE ? (
        <AdvancedKeysConfigDynamicKeystroke />
      ) : metadata.type === HMKAKType.TAP_HOLD ? (
        <AdvancedKeysConfigTapHold />
      ) : metadata.type === HMKAKType.TOGGLE ? (
        <AdvancedKeysConfigToggle />
      ) : (
        <AdvancedKeysConfigUnknown />
      )}
    </AdvancedKeysConfigContext.Provider>
  )
}
