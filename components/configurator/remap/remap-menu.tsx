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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import {
  useConfiguratorGlobal,
  useConfiguratorRemap,
} from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { useKeyboardLayout } from "@/hooks/use-keyboard-layout"
import { useSetKeymap } from "@/queries/set-keymap"

import { KeycodeAccordions } from "../common/keycode-accordions"

export function RemapMenu() {
  const { profile } = useConfiguratorGlobal()
  const { layer, key, setKey } = useConfiguratorRemap()
  const {
    metadata: { layout },
  } = useKeyboard()
  const { nextKey } = useKeyboardLayout({ layout })

  const { mutate: setKeymap } = useSetKeymap({ profile, layer })

  return (
    <FixedScrollArea>
      <KeycodeAccordions
        className="p-4"
        onKeycodeSelected={(keycode) => {
          if (key !== null) {
            setKeymap({ offset: key, keymap: [keycode] })
            setKey(nextKey(key))
          }
        }}
      />
    </FixedScrollArea>
  )
}
