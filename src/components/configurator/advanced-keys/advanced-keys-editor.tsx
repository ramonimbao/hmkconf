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

import { useGetAdvancedKeys } from "@/api/use-get-advanced-keys"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { AK_TYPE_TO_METADATA } from "@/constants/devices"
import {
  DeviceAdvancedKey,
  DeviceAdvancedKeyMetadata,
  DeviceAKType,
} from "@/types/devices"
import { createContext, useContext, useLayoutEffect } from "react"
import { KeyboardEditorLayout } from "../common/keyboard-editor"
import { AKDeleteDialog } from "./ak-delete-dialog"
import { DynamicKeystrokeEditor } from "./dynamic-keystroke-editor"
import { Loader } from "./loader"
import { NullBindEditor } from "./null-bind-editor"
import { TapHoldEditor } from "./tap-hold-editor"
import { ToggleEditor } from "./toggle-editor"

type AdvancedKeysEditorState = {
  advancedKeys: DeviceAdvancedKey[]
  akMetadata: DeviceAdvancedKeyMetadata
  akIndex: number
}

const AdvancedKeysEditorContext = createContext<AdvancedKeysEditorState>(
  {} as AdvancedKeysEditorState,
)

export const useAdvancedKeysEditor = () => useContext(AdvancedKeysEditorContext)

export function AdvancedKeysEditor() {
  const {
    profile,
    advancedKeys: { akIndex, setAKIndex },
  } = useConfigurator()

  const { isSuccess, data: advancedKeys } = useGetAdvancedKeys(profile)

  const disabled =
    !isSuccess ||
    akIndex === null ||
    akIndex >= advancedKeys.length ||
    advancedKeys[akIndex].ak.type === DeviceAKType.NONE

  useLayoutEffect(() => {
    if (disabled) {
      setAKIndex(null)
    }
  }, [disabled, setAKIndex])

  if (disabled) {
    return <Loader />
  }

  const currentAK = advancedKeys[akIndex]
  const akMetadata = AK_TYPE_TO_METADATA[currentAK.ak.type]

  return (
    <KeyboardEditorLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold leading-none tracking-tight">
            {akMetadata.name}
          </p>
          <div className="flex items-center gap-2">
            <AKDeleteDialog akIndex={akIndex}>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AKDeleteDialog>
            <Button size="sm" onClick={() => setAKIndex(null)}>
              Done
            </Button>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col">
          <AdvancedKeysEditorContext.Provider
            value={{
              advancedKeys,
              akMetadata,
              akIndex,
            }}
          >
            {akMetadata.type === DeviceAKType.NULL_BIND ? (
              <NullBindEditor />
            ) : akMetadata.type === DeviceAKType.DYNAMIC_KEYSTROKE ? (
              <DynamicKeystrokeEditor />
            ) : akMetadata.type === DeviceAKType.TAP_HOLD ? (
              <TapHoldEditor />
            ) : akMetadata.type === DeviceAKType.TOGGLE ? (
              <ToggleEditor />
            ) : (
              <></>
            )}
          </AdvancedKeysEditorContext.Provider>
        </div>
      </div>
    </KeyboardEditorLayout>
  )
}
