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

import { Tabs } from "@radix-ui/react-tabs"
import { MonitorIcon } from "lucide-react"
import { useWindowSize } from "usehooks-ts"

import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from "@/constants/ui"

import { GithubLink } from "../github-link"
import { useConfigurator } from "../providers/configurator-provider"
import { ThemeSwitcher } from "../theme-switcher"
import { Separator } from "../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { ProfileSelect } from "./profile-select"
import { ConfiguratorSidebar } from "./sidebar"

export function ConfiguratorLayout({
  children,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const { tab, setTab } = useConfigurator()

  const { width = Infinity, height = Infinity } = useWindowSize({
    initializeWithValue: false,
  })

  if (width < MIN_WINDOW_WIDTH || height < MIN_WINDOW_HEIGHT) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 p-8 text-muted-foreground">
        <MonitorIcon className="size-24" />
        <div className="max-w-prose font-medium">
          Your window is too small. Please resize your window, or zoom out.
        </div>
      </div>
    )
  }

  return (
    <Tabs onValueChange={setTab} value={tab}>
      <SidebarProvider {...props}>
        <ConfiguratorSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-4 px-4">
            <div className="flex flex-1 items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                className="mr-2 data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <ProfileSelect />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <GithubLink />
              <ThemeSwitcher />
            </div>
          </header>
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </Tabs>
  )
}
