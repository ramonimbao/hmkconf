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
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { Button } from "@/components/ui/button"
import { ADVANCED_KEYS_METADATA } from "@/constants/advanced-keys"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"

import { ActiveAdvancedKey } from "./active-advanced-key"

export function AdvancedKeysCreateMenu() {
  const {
    profile,
    advancedKeys: { setIndex, setNewType },
  } = useConfigurator()
  const {
    metadata: { numAdvancedKeys },
  } = useKeyboard()

  const { isSuccess, advancedKeyCount, advancedKeys } = useDisplayAdvancedKeys({
    profile,
  })

  return (
    <div className="grid size-full grid-cols-[28rem_minmax(0,1fr)]">
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-4">
          <div className="font-semibold">Add Advanced Key</div>
          <div className="flex flex-col gap-2">
            {ADVANCED_KEYS_METADATA.map(
              ({ type, icon: Icon, title, description }) => (
                <Button
                  key={type}
                  className="h-full gap-4"
                  disabled={!isSuccess || advancedKeyCount >= numAdvancedKeys}
                  onClick={() => {
                    setNewType(type)
                    setIndex(null)
                  }}
                  variant="outline"
                >
                  <Icon className="size-6" />
                  <div className="grid text-left text-sm font-normal text-wrap">
                    <div className="font-medium">{title}</div>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </Button>
              ),
            )}
          </div>
        </div>
      </FixedScrollArea>
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-4">
          <div className="font-semibold">
            Active Advanced Keys:{" "}
            {(advancedKeyCount ?? 0).toString().padStart(2, "0")}/
            {numAdvancedKeys.toString().padStart(2, "0")}
          </div>
          {!isSuccess || advancedKeyCount === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-8">
              <p className="text-sm text-muted-foreground">
                No active advanced keys...
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {advancedKeys.map((advancedKey, index) => (
                <ActiveAdvancedKey
                  key={index}
                  index={index}
                  advancedKey={advancedKey}
                />
              ))}
            </div>
          )}
        </div>
      </FixedScrollArea>
    </div>
  )
}
