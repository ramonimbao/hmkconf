"use client"

import { useHMKDevice } from "@/hooks/use-hmk-device"
import { createConfigurator } from "@/lib/create-configurator"
import { isWebUsbSupported } from "@/lib/utils"
import { useLayoutEffect } from "react"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"
import { ConfiguratorProvider } from "./providers/configurator-provider"
import { DeviceProvider } from "./providers/device-provider"
import { Button } from "./ui/button"

const useAppConfigurator = createConfigurator()

export function AppConfigurator() {
  const { reset } = useAppConfigurator()
  const hmkDevice = useHMKDevice()

  useLayoutEffect(() => {
    if (hmkDevice.status === "connected") {
      reset()
    }
  }, [hmkDevice.status, reset])

  return (
    <ConfiguratorProvider configurator={useAppConfigurator()}>
      <ConfiguratorLayout hideTabs={hmkDevice.status !== "connected"}>
        {hmkDevice.status === "connected" ? (
          <DeviceProvider device={hmkDevice}>
            <Configurator />
          </DeviceProvider>
        ) : (
          <div className="flex w-full flex-1 flex-col items-center justify-center p-12">
            {isWebUsbSupported() ? (
              <Button onClick={hmkDevice.connect}>Authorize Device</Button>
            ) : (
              <p>WebUSB is not supported in this browser.</p>
            )}
          </div>
        )}
      </ConfiguratorLayout>
    </ConfiguratorProvider>
  )
}
