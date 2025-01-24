import { ConfiguratorSidebar } from "./sidebar"

export function Configurator() {
  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)] divide-x">
      <aside>
        <ConfiguratorSidebar />
      </aside>
      <div></div>
    </div>
  )
}
