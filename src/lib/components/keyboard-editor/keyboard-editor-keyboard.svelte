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
  import { keyboardContext } from "$lib/keyboard"
  import type { KeyboardLayout } from "$lib/keyboard/metadata"
  import { unitToEM, unitToStyle } from "$lib/ui"
  import { cn, type WithoutChildren } from "$lib/utils"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  const {
    class: className,
    layout = keyboardContext.get().metadata.layout,
    keyGenerator,
    ...props
  }: WithoutChildren<HTMLAttributes<HTMLDivElement>> & {
    layout?: KeyboardLayout
    keyGenerator?: Snippet<[number]>
  } = $props()

  let containerWidth = $state(0)
  let containerHeight = $state(0)

  const { keyboardWidth, keyboardHeight, coordinates } = $derived.by(() => {
    const ret = {
      keyboardWidth: 0,
      keyboardHeight: 0,
      coordinates: {} as Record<number, { x: number; y: number }>,
    }
    const position = { x: 0, y: 0 }

    for (const row of layout) {
      for (const { key, w, h, x, y } of row) {
        position.x += x
        position.y += y
        ret.keyboardWidth = Math.max(ret.keyboardWidth, position.x + w)
        ret.keyboardHeight = Math.max(ret.keyboardHeight, position.y + h)
        ret.coordinates[key] = { ...position }
        position.x += w
      }
      position.x = 0
      position.y++
    }

    return ret
  })
  const fontSize = $derived(
    Math.min(
      containerWidth / unitToEM(keyboardWidth),
      containerHeight / unitToEM(keyboardHeight),
    ),
  )
</script>

<div class={cn("flex-1 p-4 select-none", className)} {...props}>
  <div
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
    class="relative h-full"
    style="font-size: {fontSize}px"
  >
    {#if fontSize > 0}
      <div class="absolute inset-0 grid place-items-center">
        <div
          class="relative"
          style={unitToStyle(keyboardWidth, keyboardHeight)}
        >
          {#each layout.flat() as { key, w, h }, i (i)}
            <div
              class="absolute p-0.5"
              style={unitToStyle(w, h, coordinates[key].x, coordinates[key].y)}
            >
              {@render keyGenerator?.(key)}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
