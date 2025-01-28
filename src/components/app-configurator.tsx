"use client"

import { useHMKDevice } from "@/hooks/use-hmk-device"
import { createConfigurator } from "@/lib/create-configurator"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"
import { ConfiguratorProvider } from "./providers/configurator-provider"
import { DeviceProvider } from "./providers/device-provider"
import { Button } from "./ui/button"

const useAppConfigurator = createConfigurator()

export function AppConfigurator() {
  const hmkDevice = useHMKDevice()

  return (
    <ConfiguratorProvider configurator={useAppConfigurator()}>
      <ConfiguratorLayout>
        {hmkDevice.status === "connected" ? (
          <DeviceProvider device={hmkDevice}>
            <Configurator />
          </DeviceProvider>
        ) : (
          <div className="flex w-full flex-1 flex-col items-center justify-center p-12">
            <Button onClick={hmkDevice.connect}>Authorize Device</Button>
          </div>
        )}
      </ConfiguratorLayout>
    </ConfiguratorProvider>
  )
}
