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

import { useSetAdvancedKeys } from "@/api/use-set-advanced-keys"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { AK_TYPE_TO_METADATA } from "@/constants/devices"
import { DeviceAKType } from "@/types/devices"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { KeyboardEditorLayout } from "../common/keyboard-editor"
import { KeycodeButton } from "../common/keycode-button"
import { useAdvancedKeys } from "./advanced-keys-tab"

export const AdvancedKeysCreate = () => {
  const {
    profile,
    advancedKeys: { layer, setAKIndex },
  } = useConfigurator()
  const { metadata } = useDevice()
  const {
    keymap,
    advancedKeys,
    newAKType,
    newAKKeys,
    newAKKeysIndex,
    setNewAKType,
    setNewAKKeys,
    setNewAKKeysIndex,
  } = useAdvancedKeys()

  const { mutate: setAdvancedKeys } = useSetAdvancedKeys(profile)

  return (
    <KeyboardEditorLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold leading-none tracking-tight">
            {AK_TYPE_TO_METADATA[newAKType].name}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewAKType(DeviceAKType.NONE)
                setNewAKKeys([null, null])
                setNewAKKeysIndex(null)
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={
                newAKKeys.filter((key) => key !== null).length !==
                AK_TYPE_TO_METADATA[newAKType].numKeys
              }
              size="sm"
              onClick={() => {
                if (advancedKeys.length >= metadata.numAdvancedKeys) {
                  return
                }

                const keys = newAKKeys.filter((key) => key !== null)
                setAdvancedKeys([
                  ...advancedKeys,
                  AK_TYPE_TO_METADATA[newAKType].create(
                    layer,
                    keys,
                    keys.map((key) => keymap[layer][key]),
                  ),
                ])
                setNewAKType(DeviceAKType.NONE)
                setNewAKKeys([null, null])
                setNewAKKeysIndex(null)
                setAKIndex(null)
              }}
            >
              Continue
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold">
          Select{" "}
          {AK_TYPE_TO_METADATA[newAKType].keycodes.length > 1
            ? `${AK_TYPE_TO_METADATA[newAKType].keycodes.length} keys`
            : "a key"}{" "}
          from the keyboard to assign {AK_TYPE_TO_METADATA[newAKType].name}.
        </p>
        <p className="text-sm text-muted-foreground">
          {AK_TYPE_TO_METADATA[newAKType].description}
        </p>
        <ToggleGroup
          type="single"
          value={newAKKeysIndex === null ? "" : newAKKeysIndex.toString()}
          onValueChange={(value) => {
            if (value !== "") {
              const index = parseInt(value)
              setNewAKKeys(
                index === 0 ? [null, newAKKeys[1]] : [newAKKeys[0], null],
              )
              setNewAKKeysIndex(index)
            }
          }}
          className="mt-4 flex w-full items-center justify-center"
        >
          {[...Array(AK_TYPE_TO_METADATA[newAKType].numKeys)].map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <p className="text-sm">Key {i + 1}</p>
              <div className="size-16 p-0.5">
                <ToggleGroupItem value={i.toString()} asChild>
                  {newAKKeys[i] === null ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-full border-dashed text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                    >
                      Assign
                    </Button>
                  ) : (
                    <KeycodeButton
                      keycode={keymap[layer][newAKKeys[i]]}
                      className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                    />
                  )}
                </ToggleGroupItem>
              </div>
            </div>
          ))}
        </ToggleGroup>
      </div>
    </KeyboardEditorLayout>
  )
}
