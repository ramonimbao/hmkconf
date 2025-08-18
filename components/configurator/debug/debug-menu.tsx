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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { Button } from "@/components/ui/button"
import { useGetCalibration } from "@/queries/get-calibration"
import { useRecalibrate } from "@/queries/recalibrate"

import { CommitSlider, CommitSliderProvider } from "../common/commit-slider"
import {
  KeyTesterKeyPress,
  KeyTesterKeyRelease,
  KeyTesterProvider,
} from "../common/key-tester"

export function DebugMenu() {
  const {
    metadata: { adcBits },
    isDemo,
  } = useKeyboard()

  const { isSuccess, data: calibration } = useGetCalibration()
  const { mutate: recalibrate } = useRecalibrate()

  return (
    <div className="grid size-full grid-cols-[minmax(0,1fr)_24rem]">
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-4">
          <CommitSliderProvider
            description="The initial noise floor represents the estimated analog value when a key is at rest. It should be set slightly higher than the actual analog readings of all keys in their resting position to prevent deadzones. Recalibrate the keyboard to apply changes. This setting applies globally across all profiles."
            disabled={!isSuccess || isDemo}
            title="Initial Noise Floor"
          >
            <CommitSlider
              committedValue={calibration?.initialRestValue}
              min={0}
              max={(1 << adcBits) - 1}
              step={10}
            />
          </CommitSliderProvider>
          <CommitSliderProvider
            description="The initial bottom out threshold represents the estimated change in analog value when a key is fully pressed. It should be set slightly lower than the actual change in analog readings when keys are fully pressed to prevent deadzones. Recalibrate the keyboard to apply changes. This setting applies globally across all profiles."
            disabled={!isSuccess || isDemo}
            title="Initial Bottom Out Threshold"
          >
            <CommitSlider
              committedValue={calibration?.initialBottomOutThreshold}
              min={0}
              max={(1 << adcBits) - 1}
              step={10}
            />
          </CommitSliderProvider>
          <div>
            <Button disabled={isDemo} onClick={() => recalibrate()} size="sm">
              Recalibrate
            </Button>
          </div>
        </div>
      </FixedScrollArea>
      <FixedScrollArea>
        <KeyTesterProvider>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Pressed Keys</div>
              <KeyTesterKeyPress className="h-32" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Released Keys</div>
              <KeyTesterKeyRelease className="h-32" />
            </div>
          </div>
        </KeyTesterProvider>
      </FixedScrollArea>
    </div>
  )
}
