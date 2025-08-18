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

import { TabsContent } from "@radix-ui/react-tabs"

import { AdvancedKeysTab } from "./advanced-keys"
import { DebugTab } from "./debug"
import { GamepadTab } from "./gamepad"
import { ConfiguratorLayout } from "./layout"
import { PerformanceTab } from "./performance"
import { ProfilesTab } from "./profiles"
import { RemapTab } from "./remap"
import { SettingsTab } from "./settings"

export function Configurator() {
  return (
    <ConfiguratorLayout>
      <TabsContent asChild value="profiles">
        <ProfilesTab />
      </TabsContent>
      <TabsContent asChild value="remap">
        <RemapTab />
      </TabsContent>
      <TabsContent asChild value="performance">
        <PerformanceTab />
      </TabsContent>
      <TabsContent asChild value="advanced-keys">
        <AdvancedKeysTab />
      </TabsContent>
      <TabsContent asChild value="gamepad">
        <GamepadTab />
      </TabsContent>
      <TabsContent asChild value="debug">
        <DebugTab />
      </TabsContent>
      <TabsContent asChild value="settings">
        <SettingsTab />
      </TabsContent>
    </ConfiguratorLayout>
  )
}
