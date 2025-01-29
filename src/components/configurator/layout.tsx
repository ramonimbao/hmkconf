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

"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"
import { GithubLink } from "../github-link"
import { useConfigurator } from "../providers/configurator-provider"
import { ThemeSwitcher } from "../theme-switcher"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface ConfiguratorLayoutProps {
  hideTabs?: boolean
  children: ReactNode
}

export function ConfiguratorLayout({
  hideTabs,
  children,
}: ConfiguratorLayoutProps) {
  const { tab, setTab } = useConfigurator()

  return (
    <Tabs value={tab} onValueChange={setTab} asChild>
      <div className="flex flex-1 flex-col divide-y">
        <header className="w-full bg-background">
          <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between gap-6 px-6 min-[1800px]:border-x">
            <Link href="/" replace>
              <h1 className="text-xl font-extrabold tracking-tight">hmkconf</h1>
            </Link>
            <TabsList className={cn(hideTabs && "hidden")}>
              <TabsTrigger value="remap">Remap</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="advanced-keys">Advanced Keys</TabsTrigger>
              <TabsTrigger value="debug">Debug</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <GithubLink />
              <ThemeSwitcher />
            </div>
          </div>
        </header>
        <div className="flex w-full flex-1 flex-col">
          <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col min-[1800px]:border-x">
            {children}
          </main>
        </div>
      </div>
    </Tabs>
  )
}
