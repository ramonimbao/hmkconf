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
  import FixedScrollArea from "$lib/components/fixed-scroll-area.svelte"
  import KeycodeAccordion from "$lib/components/keycode-accordion.svelte"
  import { keyboardContext } from "$lib/keyboard"
  import { remapStateContext } from "../context.svelte"
  import { remapQueryContext } from "../queries/remap-query.svelte"

  const { layout } = keyboardContext.get().metadata
  const keys = layout.flat().map(({ key }) => key)

  const remapState = remapStateContext.get()
  const { layer, key } = $derived(remapState)

  const remapQuery = remapQueryContext.get()
</script>

<FixedScrollArea class="p-4">
  <KeycodeAccordion
    onKeycodeSelected={(keycode) => {
      if (key === null) return
      remapQuery.set({ layer, offset: key, data: [keycode] })
      const index = keys.indexOf(key)
      remapState.key =
        index !== -1 && index + 1 < keys.length ? keys[index + 1] : null
    }}
  />
</FixedScrollArea>
