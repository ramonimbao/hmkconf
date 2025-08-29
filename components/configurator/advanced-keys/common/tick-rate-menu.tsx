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

import { InfoIcon } from "lucide-react"

import { useConfiguratorGlobal } from "@/components/providers/configurator-provider"
import { useGetTickRate } from "@/queries/get-tick-rate"
import { useSetTickRate } from "@/queries/set-tick-rate"

import { CommitSlider, CommitSliderProvider } from "../../common/commit-slider"

export function TickRateMenu() {
  const { profile } = useConfiguratorGlobal()

  const { isSuccess, data: tickRate } = useGetTickRate({ profile })
  const { mutate: setTickRate } = useSetTickRate({ profile })

  return (
    <div className="flex flex-col gap-4">
      <CommitSliderProvider
        disabled={!isSuccess}
        title="Tick Rate"
        description="The tick rate determines the delay between two consecutive actions performed by Advanced Keys. For example, a tap action performs a key press and release consecutively. A lower tick rate means less delay, but may result in missed inputs if the game or application cannot keep up with processing the inputs."
      >
        <CommitSlider
          committedValue={tickRate}
          min={0}
          max={255}
          onCommit={(tickRate) => setTickRate({ tickRate })}
          step={5}
        />
      </CommitSliderProvider>
      <div className="flex items-center gap-2 text-muted-foreground">
        <InfoIcon className="size-4" />
        <p className="text-sm">
          The tick rate is per profile and only affects Dynamic Keystroke and
          Tap-Hold keys.
        </p>
      </div>
    </div>
  )
}
