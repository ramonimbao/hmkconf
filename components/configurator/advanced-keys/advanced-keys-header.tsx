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
import { useConfigurator } from "@/components/providers/configurator-provider"
import { HMKAKType } from "@/types/libhmk"

import { LayerSelect } from "../common/layer-select"

export function AdvancedKeysHeader() {
  const {
    advancedKeys: { layer, index, newType, setLayer },
  } = useConfigurator()

  return (
    <KeyboardEditorHeader>
      <LayerSelect
        disabled={newType !== HMKAKType.NONE || index !== null}
        layer={layer}
        onLayerChange={setLayer}
      />
    </KeyboardEditorHeader>
  )
}
