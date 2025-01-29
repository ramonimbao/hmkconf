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

import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import { AKC_TYPE_TO_METADATA } from "@/constants/devices"
import { DeviceAKCType } from "@/types/devices"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { KeyboardEditorLayout } from "../common/keyboard-editor"
import { KeycodeButton } from "../common/keycode-button"
import { useAdvancedKeys } from "./advanced-keys-tab"

export const AdvancedKeysCreate = () => {
  const {
    profileNum,
    advancedKeys: { layer, setAKCIndex },
  } = useConfigurator()
  const { metadata } = useDevice()
  const {
    keymap,
    akc,
    newAKCType,
    newAKCKeys,
    newAKCKeysIndex,
    setNewAKCType,
    setNewAKCKeys,
    setNewAKCKeysIndex,
  } = useAdvancedKeys()

  const { mutate: setAKC } = useSetAKC(profileNum)

  return (
    <KeyboardEditorLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold leading-none tracking-tight">
            {AKC_TYPE_TO_METADATA[newAKCType].name}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewAKCType(DeviceAKCType.AKC_NONE)
                setNewAKCKeys([null, null])
                setNewAKCKeysIndex(null)
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={
                newAKCKeys.filter((key) => key !== null).length !==
                AKC_TYPE_TO_METADATA[newAKCType].numKeys
              }
              size="sm"
              onClick={() => {
                if (akc.length >= metadata.numAKC) {
                  return
                }

                const keys = newAKCKeys.filter((key) => key !== null)
                setAKC([
                  ...akc,
                  AKC_TYPE_TO_METADATA[newAKCType].create(
                    layer,
                    keys,
                    keys.map((key) => keymap[layer][key]),
                  ),
                ])
                setNewAKCType(DeviceAKCType.AKC_NONE)
                setNewAKCKeys([null, null])
                setNewAKCKeysIndex(null)
                setAKCIndex(null)
              }}
            >
              Continue
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold">
          Select{" "}
          {AKC_TYPE_TO_METADATA[newAKCType].keycodes.length > 1
            ? `${AKC_TYPE_TO_METADATA[newAKCType].keycodes.length} keys`
            : "a key"}{" "}
          from the keyboard to assign {AKC_TYPE_TO_METADATA[newAKCType].name}.
        </p>
        <p className="text-sm text-muted-foreground">
          {AKC_TYPE_TO_METADATA[newAKCType].description}
        </p>
        <ToggleGroup
          type="single"
          value={newAKCKeysIndex === null ? "" : newAKCKeysIndex.toString()}
          onValueChange={(value) => {
            if (value !== "") {
              const index = parseInt(value)
              setNewAKCKeys(
                index === 0 ? [null, newAKCKeys[1]] : [newAKCKeys[0], null],
              )
              setNewAKCKeysIndex(index)
            }
          }}
          className="mt-4 flex w-full items-center justify-center"
        >
          {[...Array(AKC_TYPE_TO_METADATA[newAKCType].numKeys)].map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <p className="text-sm">Key {i + 1}</p>
              <div className="size-16 p-0.5">
                <ToggleGroupItem value={i.toString()} asChild>
                  {newAKCKeys[i] === null ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-full border-dashed text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                    >
                      Assign
                    </Button>
                  ) : (
                    <KeycodeButton
                      keycode={keymap[layer][newAKCKeys[i]]}
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
