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
  import * as Tooltip from "$lib/components/ui/tooltip"
  import { gamepadQueryContext } from "$lib/configurator/queries/gamepad-query.svelte"
  import { displayDistance } from "$lib/distance"
  import type { Snippet } from "svelte"

  const {
    index,
    showTooltip,
    child,
  }: {
    index: number
    showTooltip?: boolean
    child?: Snippet<[{ props: Record<string, unknown> }]>
  } = $props()

  const { current: gamepadOptions } = $derived(
    gamepadQueryContext.get().gamepadOptions,
  )

  const analogCurve = $derived(gamepadOptions?.analogCurve)
</script>

{#if !showTooltip || !analogCurve}
  {@render child?.({ props: {} })}
{:else}
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        {@render child?.({ props })}
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content>
      ({displayDistance(analogCurve[index].x)}mm, {analogCurve[index].y})
    </Tooltip.Content>
  </Tooltip.Root>
{/if}
