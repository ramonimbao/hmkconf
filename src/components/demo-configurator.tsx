"use client"

import { createConfigurator } from "@/lib/create-configurator"
import { ConfiguratorProvider } from "./configurator-provider"
import { Configurator } from "./configurator/configurator"
import { ConfiguratorLayout } from "./configurator/layout"

const useDemoConfigurator = createConfigurator()

export function DemoConfigurator() {
  const configuator = useDemoConfigurator()

  return (
    <ConfiguratorProvider configurator={configuator}>
      <ConfiguratorLayout>
        <Configurator />
      </ConfiguratorLayout>
    </ConfiguratorProvider>
  )
}
