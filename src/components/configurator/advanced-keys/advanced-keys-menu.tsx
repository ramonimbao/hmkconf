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
import { AKC_METADATA, AKC_TYPE_TO_METADATA } from "@/constants/devices"
import { DeviceAKCType } from "@/types/devices"
import { Edit, Plus, Trash } from "lucide-react"
import { KeyboardEditorLayout } from "../common/keyboard-editor"
import { useAdvancedKeys } from "./advanced-keys-tab"
import { AKCDeleteDialog } from "./akc-delete-dialog"

export function AdvancedKeysMenu() {
  const {
    advancedKeys: { setLayer, setAKCIndex },
  } = useConfigurator()
  const { metadata } = useDevice()
  const { akc, setNewAKCType, setNewAKCKeys, setNewAKCKeysIndex } =
    useAdvancedKeys()

  return (
    <KeyboardEditorLayout>
      <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold leading-none tracking-tight">
            Advanced Key Bindings: {akc.length.toString().padStart(2, "0")}/
            {metadata.numAKC.toString().padStart(2, "0")}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={akc.length >= metadata.numAKC}
              asChild
            >
              <Button variant="outline" size="sm">
                <Plus /> New Advanced Key
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-96">
              {AKC_METADATA.map((akcMetadata) => (
                <DropdownMenuItem
                  key={akcMetadata.type}
                  onClick={() => {
                    setNewAKCType(akcMetadata.type)
                    setNewAKCKeys([null, null])
                    setNewAKCKeysIndex(0)
                  }}
                >
                  <div className="flex flex-col">
                    <p>{akcMetadata.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {akcMetadata.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {akc.length === 0 ? (
          <div className="mt-4 flex h-56 w-full flex-col items-center justify-center rounded-md border border-dashed p-4 text-center text-sm opacity-50">
            No advanced key bindings have been configured...
          </div>
        ) : (
          <div className="mt-4 grid w-full gap-4">
            {akc.map((akc, i) => {
              const akcMetadata = AKC_TYPE_TO_METADATA[akc.akc.type]
              return (
                <div
                  key={i}
                  className="flex w-full items-center rounded-md border bg-card p-4 shadow-sm"
                >
                  <div className="flex-1 text-sm font-semibold leading-none tracking-tight">
                    {akcMetadata.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setNewAKCType(DeviceAKCType.AKC_NONE)
                        setNewAKCKeys([null, null])
                        setNewAKCKeysIndex(null)
                        setLayer(akc.layer)
                        setAKCIndex(i)
                      }}
                    >
                      <Edit />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <AKCDeleteDialog akcIndex={i}>
                      <Button variant="outline" size="icon">
                        <Trash />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AKCDeleteDialog>
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
