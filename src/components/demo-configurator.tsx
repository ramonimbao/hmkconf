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

import { useDemoDevice } from "@/hooks/use-demo-device"
import { createConfigurator } from "@/lib/create-configurator"
import { useLayoutEffect } from "react"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"
import { ConfiguratorProvider } from "./providers/configurator-provider"
import { DeviceProvider } from "./providers/device-provider"

const useDemoConfigurator = createConfigurator()

export function DemoConfigurator() {
  const { reset } = useDemoConfigurator()
  const device = useDemoDevice()

  useLayoutEffect(reset, [reset])

  return (
    <ConfiguratorProvider configurator={useDemoConfigurator()}>
      <DeviceProvider device={device}>
        <ConfiguratorLayout>
          <Configurator />
        </ConfiguratorLayout>
      </DeviceProvider>
    </ConfiguratorProvider>
  )
}
