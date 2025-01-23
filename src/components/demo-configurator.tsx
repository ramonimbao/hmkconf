"use client"

import { createConfigurator } from "@/lib/create-configurator"
import { ConfiguratorProvider } from "./configurator-provider"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"

const useDemoConfigurator = createConfigurator()

export function DemoConfigurator() {
  const configurator = useDemoConfigurator()

  return (
    <ConfiguratorProvider configurator={configurator}>
      <ConfiguratorLayout>
        <Configurator />
      </ConfiguratorLayout>
    </ConfiguratorProvider>
  )
}
