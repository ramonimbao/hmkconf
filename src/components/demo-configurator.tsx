"use client"

import { useDemoDevice } from "@/hooks/use-demo-device"
import { createConfigurator } from "@/lib/create-configurator"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"
import { ConfiguratorProvider } from "./providers/configurator-provider"
import { DeviceProvider } from "./providers/device-provider"

const useDemoConfigurator = createConfigurator()

export function DemoConfigurator() {
  const configurator = useDemoConfigurator()
  const device = useDemoDevice()

  return (
    <ConfiguratorProvider configurator={configurator}>
      <DeviceProvider device={device}>
        <ConfiguratorLayout>
          <Configurator />
        </ConfiguratorLayout>
      </DeviceProvider>
    </ConfiguratorProvider>
  )
}
