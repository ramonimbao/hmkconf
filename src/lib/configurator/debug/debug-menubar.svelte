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
  import Switch from "$lib/components/switch.svelte"
  import { Badge } from "$lib/components/ui/badge"
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { keyboardContext } from "$lib/keyboard"
  import { analogInfoQueryContext } from "../queries/analog-info-query.svelte"

  const { demo } = keyboardContext.get()

  const { interval } = $derived(analogInfoQueryContext.get())
</script>

<KeyboardEditorMenubar>
  <div class="flex items-center gap-2">
    <Switch
      bind:checked={
        () => interval.isActive,
        (v) => (v ? interval.resume() : interval.pause())
      }
      disabled={demo}
      id="show-analog-info"
      title="Show Live Analog Values"
    />
    {#if interval.isActive}
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Badge variant="destructive">Warning</Badge>
        </Tooltip.Trigger>
        <Tooltip.Content class="max-w-sm text-pretty">
          Live analog values requests data from the keyboard at a high
          frequency, which may affect performance. Please disable this feature
          when performing tasks that are performance-sensitive.
        </Tooltip.Content>
      </Tooltip.Root>
    {/if}
  </div>
</KeyboardEditorMenubar>
