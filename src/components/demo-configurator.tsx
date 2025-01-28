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
