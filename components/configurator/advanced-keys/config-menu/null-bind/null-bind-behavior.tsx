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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { Switch } from "@/components/configurator/common/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NULL_BIND_BEHAVIOR_METADATA } from "@/constants/advanced-keys"
import { DEFAULT_BOTTOM_OUT_POINT } from "@/constants/libhmk/advanced-keys"

import { useNullBind } from "."
import { useAdvancedKeysConfig } from ".."

export function NullBindBehavior() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action } = useNullBind()

  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="grid text-sm">
          <span className="font-medium">
            Configure Null Bind Resolution Behavior
          </span>
          <span className="text-muted-foreground">
            Select how Null Bind resolves key presses when both keys are pressed
            simultaneously.
          </span>
        </div>
        <RadioGroup
          onValueChange={(behavior) =>
            updateAdvancedKey((advancedKey) => ({
              ...advancedKey,
              action: {
                ...action,
                behavior: parseInt(behavior),
              },
            }))
          }
          value={action.behavior.toString()}
        >
          {NULL_BIND_BEHAVIOR_METADATA.map(
            ({ behavior, title, description }) => (
              <div key={behavior} className="flex items-center gap-3">
                <RadioGroupItem
                  id={behavior.toString()}
                  value={behavior.toString()}
                />
                <div className="flex items-center gap-2">
                  <Label className="flex-1" htmlFor={behavior.toString()}>
                    {title}
                  </Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="size-4" />
                      <span className="sr-only">Info</span>
                    </TooltipTrigger>
                    <TooltipContent>{description}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ),
          )}
        </RadioGroup>
        <Switch
          checked={action.bottomOutPoint > 0}
          description="Enable this option to register both key presses when keys are fully pressed simultaneously, bypassing the resolution behavior."
          id="alternative-fully-pressed-behavior"
          onCheckedChange={(behaviorEnabled) =>
            updateAdvancedKey((advancedKey) => ({
              ...advancedKey,
              action: {
                ...action,
                bottomOutPoint: behaviorEnabled ? DEFAULT_BOTTOM_OUT_POINT : 0,
              },
            }))
          }
          title="Alternative Fully Pressed Behavior"
        />
      </div>
    </FixedScrollArea>
  )
}
