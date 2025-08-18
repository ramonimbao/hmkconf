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

import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"
import { HMKAKType } from "@/types/libhmk"

import { AdvancedKeysConfigMenu } from "./config-menu"
import { AdvancedKeysCreateMenu } from "./main-menu"
import { AdvancedKeysCreateDialog } from "./main-menu/create-dialog"

export function AdvancedKeysMenu() {
  const {
    profile,
    advancedKeys: { index, newType },
  } = useConfigurator()

  const { isSuccess } = useDisplayAdvancedKeys({ profile })

  if (isSuccess) {
    if (newType !== HMKAKType.NONE) {
      return <AdvancedKeysCreateDialog />
    }

    if (index !== null) {
      return <AdvancedKeysConfigMenu />
    }
  }

  return <AdvancedKeysCreateMenu />
}
