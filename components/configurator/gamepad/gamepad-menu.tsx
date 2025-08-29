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

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetOptions } from "@/queries/get-options"

import { GamepadAnalogTab } from "./gamepad-analog-tab"
import { GamepadBindingsTab } from "./gamepad-bindings-tab"

export function GamepadMenu() {
  const { isSuccess, data: options } = useGetOptions()

  return (
    <Tabs className="flex size-full flex-col p-4" defaultValue="bindings">
      <div className="flex items-center gap-4">
        <TabsList>
          <TabsTrigger value="bindings">Bindings</TabsTrigger>
          <TabsTrigger value="analog">Analog</TabsTrigger>
        </TabsList>
        {isSuccess && !options.xInputEnabled && (
          <Badge variant="destructive">XInput interface is disabled</Badge>
        )}
      </div>
      <TabsContent asChild value="bindings">
        <GamepadBindingsTab />
      </TabsContent>
      <TabsContent asChild value="analog">
        <GamepadAnalogTab />
      </TabsContent>
    </Tabs>
  )
}
