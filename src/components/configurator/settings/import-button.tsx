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

import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { useDeviceConfig } from "@/hooks/use-device-config"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { ZodError } from "zod"

const MAX_CONFIG_SIZE = 5 * 1024 * 1024

export function ImportButton() {
  const {
    settings: { loading, setLoading },
  } = useConfigurator()
  const { isDemo } = useDevice()
  const { setDeviceConfig } = useDeviceConfig()

  const inputElement = useRef<HTMLInputElement>(document.createElement("input"))

  const importConfig = async () => {
    inputElement.current.value = ""
    inputElement.current.click()
  }

  useEffect(() => {
    inputElement.current.type = "file"
    inputElement.current.accept = "application/json"
    inputElement.current.onchange = async (event) => {
      setLoading(true)
      try {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (!file) {
          throw new Error("No file selected")
        }

        if (file.size > MAX_CONFIG_SIZE) {
          throw new Error("File size exceeds the maximum limit of 5MB")
        }

        const text = await file.text()
        const config = JSON.parse(text)

        await setDeviceConfig(config)
        toast.success("Configuration imported successfully")
      } catch (error) {
        if (error instanceof SyntaxError) {
          toast.error(
            "Failed to import config: Invalid JSON format in the config file",
          )
        } else if (error instanceof ZodError) {
          toast.error(`Failed to import config: ${error.issues[0].message}`)
        } else {
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }
  }, [setDeviceConfig, setLoading])

  return (
    <Button
      disabled={isDemo || loading}
      variant="outline"
      onClick={importConfig}
    >
      Import Config
    </Button>
  )
}
