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

import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { useMemo } from "react"

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import {
  useConfiguratorAdvancedKeys,
  useConfiguratorGlobal,
} from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"
import { getAdvancedKeyMetadata } from "@/lib/advanced-keys"
import { getUnitSizeCSS } from "@/lib/ui"
import { HMKAKType } from "@/types/libhmk"

import { KeyButton } from "../../common/key-button"
import { KeycodeButton } from "../../common/keycode-button"

export function AdvancedKeysCreateDialog() {
  const { profile } = useConfiguratorGlobal()
  const { layer, newType, keyIndex, keys, setIndex, setNewType, setKeyIndex } =
    useConfiguratorAdvancedKeys()

  const { isSuccess, keymap, addAdvancedKey } = useDisplayAdvancedKeys({
    profile,
  })

  const { title, description, numKeys, createDefault } = useMemo(
    () => getAdvancedKeyMetadata(newType),
    [newType],
  )

  if (!isSuccess) {
    return null
  }

  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="font-semibold">{title}</div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setNewType(HMKAKType.NONE)}
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={keys.some((key) => key === null)}
              onClick={() => {
                if (keys.every((key) => key !== null)) {
                  setIndex(
                    addAdvancedKey(
                      createDefault({
                        layer,
                        keys,
                        keycodes: keys.map((key) => keymap[layer][key]),
                      }),
                    ),
                  )
                  setNewType(HMKAKType.NONE)
                }
              }}
              size="sm"
            >
              Continue
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid text-sm">
            <span className="font-medium">{`Select ${numKeys > 1 ? `${numKeys} keys` : `${numKeys} key`} to assign ${title} to.`}</span>
            <span className="text-muted-foreground">{description}</span>
          </div>
          <div className="flex flex-col items-center">
            <ToggleGroup
              className="flex"
              onValueChange={(keyIndex) =>
                keyIndex !== "" && setKeyIndex(parseInt(keyIndex))
              }
              type="single"
              value={keyIndex === null ? "" : keyIndex.toString()}
            >
              {[...Array(numKeys)].map((_, i) => (
                <div key={i} className="flex flex-col items-center text-base">
                  <div className="text-muted-foreground">Key {i + 1}</div>
                  <div className="p-0.5" style={getUnitSizeCSS()}>
                    <ToggleGroupItem asChild value={i.toString()}>
                      {keys[i] === null ? (
                        <KeyButton className="border-dashed font-normal text-muted-foreground">
                          <span>Assign</span>
                        </KeyButton>
                      ) : (
                        <KeycodeButton keycode={keymap[layer][keys[i]]} />
                      )}
                    </ToggleGroupItem>
                  </div>
                </div>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
    </FixedScrollArea>
  )
}
