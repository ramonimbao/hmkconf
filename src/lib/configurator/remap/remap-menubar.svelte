<!-- 
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

You should have received a copy of the GNU General Public License along with
this program. If not, see <https://www.gnu.org/licenses/>.
-->

<script lang="ts">
  import { KeyboardEditorMenubar } from "$lib/components/keyboard-editor"
  import LayerSelect from "$lib/components/layer-select.svelte"
  import { Button } from "$lib/components/ui/button"
  import { keyboardContext } from "$lib/keyboard"
  import { remapStateContext } from "../context.svelte"
  import { remapQueryContext } from "../queries/remap-query.svelte"

  const remapState = remapStateContext.get()
  const { layer } = $derived(remapState)
  const { defaultKeymap } = keyboardContext.get().metadata

  const remapQuery = remapQueryContext.get()
</script>

<KeyboardEditorMenubar>
  <LayerSelect bind:layer={() => layer, (v) => remapState.setLayer(v)} />
  <Button
    onclick={() =>
      remapQuery.set({ layer, offset: 0, data: defaultKeymap[layer] })}
    size="sm"
    variant="destructive"
  >
    Reset Current Layer
  </Button>
</KeyboardEditorMenubar>
