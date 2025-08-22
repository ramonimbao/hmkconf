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

import { CableIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "sonner"

import { useHMKKeyboard } from "@/hooks/use-hmk-keyboard"

import { Configurator } from "./configurator"
import { Footer } from "./footer"
import { ConfiguratorProvider } from "./providers/configurator-provider"
import { KeyboardProvider } from "./providers/keyboard-provider"
import { Button } from "./ui/button"

export function AppConfigurator() {
  const { connect, keyboard } = useHMKKeyboard()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (keyboard !== null) {
      toast.success(`Successfully connected to ${keyboard.metadata.name}.`)
    }
  }, [keyboard])

  if (keyboard !== null) {
    return (
      <ConfiguratorProvider>
        <KeyboardProvider keyboard={keyboard}>
          <Configurator />
        </KeyboardProvider>
      </ConfiguratorProvider>
    )
  }

  return (
    <>
      <div className="flex min-h-screen flex-col py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h1 className="text-5xl leading-none font-extrabold tracking-tight">
              hmkconf
            </h1>
            <p className="mt-4 text-lg font-medium text-pretty text-muted-foreground">
              A web-based configurator for libhmk keyboards. Customize keyboard
              bindings, adjust actuation points, enable Rapid Trigger, and more.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button onClick={handleConnect} size="lg">
                <CableIcon /> Connect Keyboard
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">Try Demo</Link>
              </Button>
            </div>
          </div>
          <div className="mt-16">
            <div className="overflow-hidden rounded-xl border bg-card shadow">
              <Image
                alt="Screenshot of the configuration interface"
                className="not-dark:hidden"
                priority
                src="/screenshot-dark.png"
                width="1024"
                height="768"
              />
              <Image
                alt="Screenshot of the configuration interface"
                className="dark:hidden"
                priority
                src="/screenshot.png"
                width="1024"
                height="768"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
