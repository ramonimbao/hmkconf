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
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { Button } from "@/components/ui/button"
import { useSetKeymap } from "@/queries/set-keymap"

import { LayerSelect } from "../common/layer-select"

export function RemapHeader() {
  const {
    profile,
    remap: { layer, setLayer, setKey },
  } = useConfigurator()
  const {
    metadata: { defaultKeymap },
  } = useKeyboard()

  const { mutate: setKeymap } = useSetKeymap({ profile, layer })

  return (
    <KeyboardEditorHeader>
      <LayerSelect layer={layer} onLayerChange={setLayer} />
      <Button
        onClick={() => {
          setKeymap({ offset: 0, keymap: defaultKeymap[layer] })
          setKey(null)
        }}
        size="sm"
        variant="destructive"
      >
        Reset Current Layer
      </Button>
    </KeyboardEditorHeader>
  )
}
