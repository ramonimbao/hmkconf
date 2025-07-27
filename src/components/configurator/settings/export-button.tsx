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
import { useRef } from "react"
import { toast } from "sonner"

export function ExportButton() {
  const {
    settings: { loading, setLoading },
  } = useConfigurator()
  const { isDemo, metadata } = useDevice()
  const { getDeviceConfig } = useDeviceConfig()

  const linkElement = useRef<HTMLAnchorElement>(document.createElement("a"))

  const exportConfig = async () => {
    setLoading(true)
    try {
      const config = await getDeviceConfig()
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json",
      })

      const url = URL.createObjectURL(blob)
      linkElement.current.href = url
      linkElement.current.download = `${metadata.name}-config.json`
      linkElement.current.click()
      toast.success("Configuration exported successfully")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to export config: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={isDemo || loading}
      variant="outline"
      onClick={exportConfig}
    >
      Export Config
    </Button>
  )
}
