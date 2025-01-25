import { TabsContent } from "@radix-ui/react-tabs"
import { DebugTab } from "./debug/debug-tab"
import { PerformanceTab } from "./performance/performance-tab"
import { RemapTab } from "./remap/remap-tab"
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
        <TabsContent value="debug">
          <DebugTab />
        </TabsContent>
      </div>
    </div>
  )
}
