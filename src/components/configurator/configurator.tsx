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
import { AdvancedKeysTab } from "./advanced-keys/advanced-keys-tab"
import { DebugTab } from "./debug/debug-tab"
import { PerformanceTab } from "./performance/performance-tab"
import { RemapTab } from "./remap/remap-tab"
import { SettingsTab } from "./settings/settings-tab"
import { ConfiguratorSidebar } from "./sidebar"

export function Configurator() {
  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)] divide-x">
      <aside>
        <ConfiguratorSidebar />
      </aside>
      <div>
        <TabsContent value="remap">
          <RemapTab />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceTab />
        </TabsContent>
        <TabsContent value="advanced-keys">
          <AdvancedKeysTab />
        </TabsContent>
        <TabsContent value="debug">
          <DebugTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </div>
    </div>
  )
}
