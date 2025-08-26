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
  import { Tabs } from "bits-ui"
  import { setConfiguratorStateContext } from "./context.svelte"
  import ConfiguratorLayout from "./layout.svelte"

  setConfiguratorStateContext()
</script>

<ConfiguratorLayout>
  <Tabs.Content value="profiles">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
  <Tabs.Content value="remap">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
  <Tabs.Content value="performance">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
  <Tabs.Content value="advanced-keys">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
  <Tabs.Content value="gamepad">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
  <Tabs.Content value="debug">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
  <Tabs.Content value="settings">
    {#snippet child({ props })}{/snippet}
  </Tabs.Content>
</ConfiguratorLayout>
