import { TabsContent } from "@radix-ui/react-tabs"
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
      </div>
    </div>
  )
}
