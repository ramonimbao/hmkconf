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

import { useGetTickRate } from "@/api/use-get-tick-rate"
import { useSetTickRate } from "@/api/use-set-tick-rate"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"

export function TickRateTab() {
  const { profile } = useConfigurator()

  const { isSuccess, data: tickRate } = useGetTickRate(profile)
  const { mutate: setTickRate } = useSetTickRate(profile)

  const [uiTickRate, setUITickRate] = useState(0)

  useEffect(() => {
    if (isSuccess) {
      setUITickRate(tickRate)
    }
  }, [isSuccess, tickRate])

  return (
    <div className="flex flex-col rounded-md border bg-card p-4 shadow-sm">
      <p className="text-sm font-semibold leading-none tracking-tight">
        Tick Rate: {uiTickRate}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        The tick rate determines the delay between two actions performed by a
        single operation, such as a tap action which performs a key press and
        release. A lower tick rate means a lower delay, but may result in missed
        inputs if the game or application processes inputs too slowly.
      </p>
      <Slider
        disabled={!isSuccess}
        min={0}
        max={255}
        step={5}
        value={[uiTickRate]}
        onValueChange={([value]) => setUITickRate(value)}
        onValueCommit={() => setTickRate(uiTickRate)}
        className="mt-3"
      />
    </div>
  )
}
