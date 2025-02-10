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

import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AK_METADATA, AK_TYPE_TO_METADATA } from "@/constants/devices"
import { DeviceAKType } from "@/types/devices"
import { Edit, Plus, Trash } from "lucide-react"
import { KeyboardEditorLayout } from "../common/keyboard-editor"
import { useAdvancedKeys } from "./advanced-keys-tab"
import { AKDeleteDialog } from "./ak-delete-dialog"

export function AdvancedKeysMenu() {
  const {
    advancedKeys: { setLayer, setAKIndex },
  } = useConfigurator()
  const { metadata } = useDevice()
  const { advancedKeys, setNewAKType, setNewAKKeys, setNewAKKeysIndex } =
    useAdvancedKeys()

  return (
    <KeyboardEditorLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold leading-none tracking-tight">
            Advanced Key Bindings:{" "}
            {advancedKeys.length.toString().padStart(2, "0")}/
            {metadata.numAdvancedKeys.toString().padStart(2, "0")}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={advancedKeys.length >= metadata.numAdvancedKeys}
              asChild
            >
              <Button variant="outline" size="sm">
                <Plus /> New Advanced Key
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-96">
              {AK_METADATA.map((akMetadata) => (
                <DropdownMenuItem
                  key={akMetadata.type}
                  onClick={() => {
                    setNewAKType(akMetadata.type)
                    setNewAKKeys([null, null])
                    setNewAKKeysIndex(0)
                  }}
                >
                  <div className="flex flex-col">
                    <p>{akMetadata.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {akMetadata.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {advancedKeys.length === 0 ? (
          <div className="mt-4 flex h-56 w-full flex-col items-center justify-center rounded-md border border-dashed p-4 text-center text-sm opacity-50">
            No advanced key bindings have been configured...
          </div>
        ) : (
          <div className="mt-4 grid w-full gap-4">
            {advancedKeys.map((advancedKeys, i) => {
              const akMetadata = AK_TYPE_TO_METADATA[advancedKeys.ak.type]
              return (
                <div
                  key={i}
                  className="flex w-full items-center rounded-md border bg-card p-4 shadow-sm"
                >
                  <div className="flex-1 text-sm font-semibold leading-none tracking-tight">
                    {akMetadata.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setNewAKType(DeviceAKType.NONE)
                        setNewAKKeys([null, null])
                        setNewAKKeysIndex(null)
                        setLayer(advancedKeys.layer)
                        setAKIndex(i)
                      }}
                    >
                      <Edit />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <AKDeleteDialog akIndex={i}>
                      <Button variant="outline" size="icon">
                        <Trash />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AKDeleteDialog>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </KeyboardEditorLayout>
  )
}
