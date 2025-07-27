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

import { useHMKDevice } from "@/hooks/use-hmk-device"
import { createConfigurator } from "@/lib/create-configurator"
import { isWebHIDSupported } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"
import { ConfiguratorProvider } from "./providers/configurator-provider"
import { DeviceProvider } from "./providers/device-provider"
import { Button } from "./ui/button"

const useAppConfigurator = createConfigurator()

export function AppConfigurator() {
  const { reset } = useAppConfigurator()
  const hmkDevice = useHMKDevice()

  const queryClient = useQueryClient()

  const [webHIDSupported, setWebHIDSupported] = useState(false)

  // Prevent SSR errors by only checking WebHID support on the client side
  useEffect(() => setWebHIDSupported(isWebHIDSupported()), [])

  useEffect(() => {
    if (hmkDevice.status === "connected") {
      queryClient.clear()
      reset()
    } else if (webHIDSupported) {
      hmkDevice.connect()
    }
  }, [hmkDevice, queryClient, reset, webHIDSupported])

  return (
    <ConfiguratorProvider configurator={useAppConfigurator()}>
      <ConfiguratorLayout hideTabs={hmkDevice.status !== "connected"}>
        {hmkDevice.status === "connected" ? (
          <DeviceProvider device={hmkDevice}>
            <Configurator />
          </DeviceProvider>
        ) : (
          <div className="flex w-full flex-1 flex-col items-center justify-center p-12">
            {webHIDSupported ? (
              <Button onClick={hmkDevice.connect}>Authorize Device</Button>
            ) : (
              <p>WebHID is not supported in this browser.</p>
            )}
          </div>
        )}
      </ConfiguratorLayout>
    </ConfiguratorProvider>
  )
}
