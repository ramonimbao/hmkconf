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
