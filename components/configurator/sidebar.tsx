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

import { TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import {
  BugIcon,
  Gamepad2Icon,
  GaugeIcon,
  Grid2X2Icon,
  PencilIcon,
  SettingsIcon,
  SquareChevronUpIcon,
} from "lucide-react"

import { HMK_VERSION } from "@/constants/libhmk"
import { displayVersion } from "@/lib/ui"

import { useConfiguratorGlobal } from "../providers/configurator-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar"
import { KeyboardMenu } from "./keyboard-menu"

const CONTENT_TABS = [
  {
    group: "Profiles",
    tabs: [{ label: "Profiles", value: "profiles", icon: Grid2X2Icon }],
  },
  {
    group: "Keyboard Configuration",
    tabs: [
      { label: "Remap", value: "remap", icon: PencilIcon },
      { label: "Performance", value: "performance", icon: GaugeIcon },
      {
        label: "Advanced Keys",
        value: "advanced-keys",
        icon: SquareChevronUpIcon,
      },
      { label: "Gamepad", value: "gamepad", icon: Gamepad2Icon },
      { label: "Debug", value: "debug", icon: BugIcon },
    ],
  },
  {
    group: "Settings",
    tabs: [{ label: "Settings", value: "settings", icon: SettingsIcon }],
  },
]

export function ConfiguratorSidebar() {
  const { tab: currentTab } = useConfiguratorGlobal()

  return (
    <TabsList>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <KeyboardMenu />
        </SidebarHeader>
        <SidebarContent>
          {CONTENT_TABS.map(({ group, tabs }, i) => (
            <SidebarGroup key={i}>
              <SidebarGroupLabel className="truncate">
                {group}
              </SidebarGroupLabel>
              <SidebarMenu>
                {tabs.map((tab, j) => (
                  <SidebarMenuItem key={j}>
                    <TabsTrigger asChild value={tab.value}>
                      <SidebarMenuButton
                        isActive={tab.value === currentTab}
                        tooltip={tab.label}
                      >
                        <tab.icon />
                        <span>{tab.label}</span>
                      </SidebarMenuButton>
                    </TabsTrigger>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarGroupLabel className="truncate text-sm">
                hmkconf {displayVersion(HMK_VERSION)}
              </SidebarGroupLabel>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TabsList>
  )
}
