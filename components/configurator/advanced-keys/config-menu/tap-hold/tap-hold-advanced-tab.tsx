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

import {
  CommitSlider,
  CommitSliderProvider,
} from "@/components/configurator/common/commit-slider"
import { Switch } from "@/components/configurator/common/switch"
import {
  MAX_TAPPING_TERM,
  MIN_TAPPING_TERM,
} from "@/constants/libhmk/advanced-keys"

import { useTapHold } from "."
import { useAdvancedKeysConfig } from ".."
import { TickRateMenu } from "../../common/tick-rate-menu"

export function TapHoldAdvancedTab() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action } = useTapHold()

  return (
    <div className="flex flex-col gap-4">
      <Switch
        checked={action.holdOnOtherKeyPress}
        description="Immediately perform the hold action if another non-Tap-Hold key is pressed."
        id="hold-on-other-key-press"
        onCheckedChange={(holdOnOtherKeyPress) =>
          updateAdvancedKey((advancedKey) => ({
            ...advancedKey,
            action: {
              ...action,
              holdOnOtherKeyPress,
            },
          }))
        }
        title="Hold on Other Key Press"
      />
      <CommitSliderProvider
        title="Tapping Term"
        description="Set the duration the key must be held to perform the hold action."
        display={(tappingTerm) => `${tappingTerm}ms`}
      >
        <CommitSlider
          committedValue={action.tappingTerm}
          min={MIN_TAPPING_TERM}
          max={MAX_TAPPING_TERM}
          onCommit={(tappingTerm) =>
            updateAdvancedKey((advancedKey) => ({
              ...advancedKey,
              action: {
                ...action,
                tappingTerm,
              },
            }))
          }
          step={10}
        />
      </CommitSliderProvider>
      <TickRateMenu />
    </div>
  )
}
