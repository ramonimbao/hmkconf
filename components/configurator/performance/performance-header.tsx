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

import { KeyboardEditorHeader } from "@/components/common/keyboard-editor"
import {
  useConfiguratorGlobal,
  useConfiguratorPerformance,
} from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { DEFAULT_ACTUATION } from "@/constants/libhmk/actuation"
import { useKeyboardLayout } from "@/hooks/use-keyboard-layout"
import { partitionIntArray } from "@/lib/utils"
import { useSetActuationMap } from "@/queries/set-actuation-map"

export function PerformanceHeader() {
  const { profile } = useConfiguratorGlobal()
  const { keys, showKeymap, setKeys, setShowKeymap } =
    useConfiguratorPerformance()
  const {
    metadata: { layout },
  } = useKeyboard()
  const { allKeys } = useKeyboardLayout({ layout })

  const { mutate: setActuationMap } = useSetActuationMap({ profile })

  return (
    <KeyboardEditorHeader>
      <div className="flex items-center gap-2">
        <Button
          disabled={allKeys.every((key) => keys.includes(key))}
          onClick={() => setKeys(allKeys)}
          size="sm"
          variant="outline"
        >
          Select All
        </Button>
        <Button
          disabled={keys.length === 0}
          onClick={() => setKeys([])}
          size="sm"
          variant="outline"
        >
          Deselect All
        </Button>
        <Toggle
          onPressedChange={setShowKeymap}
          pressed={showKeymap}
          size="sm"
          variant="outline"
        >
          Show Keymap
        </Toggle>
      </div>
      <Button
        disabled={keys.length === 0}
        onClick={() => {
          partitionIntArray(keys).forEach(([offset, len]) =>
            setActuationMap({
              offset,
              actuation: Array(len).fill(DEFAULT_ACTUATION),
            }),
          )
          setKeys([])
        }}
        size="sm"
        variant="destructive"
      >
        Reset Selected
      </Button>
    </KeyboardEditorHeader>
  )
}
