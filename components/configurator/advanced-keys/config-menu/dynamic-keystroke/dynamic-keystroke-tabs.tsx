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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { KeyTesterTab } from "../../common/key-tester-tab"
import { TickRateMenu } from "../../common/tick-rate-menu"
import { DynamicKeystrokeBindingsTab } from "./dynamic-keystroke-bindings-tab"
import { DynamicKeystrokePerformanceTab } from "./dynamic-keystroke-performance-tab"

export function DynamicKeystrokeTabs() {
  return (
    <FixedScrollArea>
      <Tabs defaultValue="bindings" className="flex flex-col gap-2 p-4 pt-0">
        <TabsList>
          <TabsTrigger value="bindings">Bindings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="key-tester">Key Tester</TabsTrigger>
        </TabsList>
        <div className="flex-1 p-2">
          <TabsContent asChild value="bindings">
            <DynamicKeystrokeBindingsTab />
          </TabsContent>
          <TabsContent asChild value="performance">
            <DynamicKeystrokePerformanceTab />
          </TabsContent>
          <TabsContent asChild value="advanced">
            <TickRateMenu />
          </TabsContent>
          <TabsContent asChild value="key-tester">
            <KeyTesterTab />
          </TabsContent>
        </div>
      </Tabs>
    </FixedScrollArea>
  )
}
