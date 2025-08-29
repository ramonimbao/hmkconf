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
import { TapHoldAdvancedTab } from "./tap-hold-advanced-tab"
import { TapHoldBindingsTab } from "./tap-hold-bindings-tab"

export function TapHoldTabs() {
  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-2 p-4 pt-0">
        <Tabs defaultValue="bindings">
          <TabsList>
            <TabsTrigger value="bindings">Bindings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="key-tester">Key Tester</TabsTrigger>
          </TabsList>
          <div className="flex-1 p-2">
            <TabsContent asChild value="bindings">
              <TapHoldBindingsTab />
            </TabsContent>
            <TabsContent asChild value="advanced">
              <TapHoldAdvancedTab />
            </TabsContent>
            <TabsContent asChild value="key-tester">
              <KeyTesterTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </FixedScrollArea>
  )
}
