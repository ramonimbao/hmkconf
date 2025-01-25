"use client"

import { useGetKeymapWithAKC } from "@/api/use-get-keymap-with-akc"
import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AKC_METADATA, DEFAULT_AKC } from "@/constants/devices"
import { KEYCODE_TO_METADATA } from "@/constants/keycodes"
import { cn } from "@/lib/utils"
import { DeviceAKC, DeviceAKCType } from "@/types/devices"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { produce } from "immer"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
  KeyboardEditorSkeleton,
} from "../common/keyboard-editor"
import { KeycodeButton } from "../common/keycode-button"
import { LayerSelector } from "../common/layer-selector"

const getKeysFromAKC = (akc: DeviceAKC) => {
  switch (akc.akc.type) {
    case DeviceAKCType.AKC_NULL_BIND:
      return [akc.key, akc.akc.secondaryKey]

    case DeviceAKCType.AKC_DKS:
    case DeviceAKCType.AKC_TAP_HOLD:
    case DeviceAKCType.AKC_TOGGLE:
      return [akc.key]

    default:
      return []
  }
}

export function AdvancedKeysTab() {
  const {
    profileNum,
    advancedKeys: { layer, keys, setLayer, setKeys },
  } = useConfigurator()
  const { metadata } = useDevice()

  const { isSuccess, keymap, akc, akcIndices } = useGetKeymapWithAKC(profileNum)
  const { mutate: setAKC } = useSetAKC(profileNum)

  const [newAKCType, setNewAKCType] = useState(DeviceAKCType.AKC_NONE)
  const [newAKCKeys, setNewAKCKeys] = useState<number[]>([])

  const filteredAKC = useMemo(
    () =>
      isSuccess
        ? akc.filter((akc) => akc.akc.type !== DeviceAKCType.AKC_NONE)
        : [],
    [akc, isSuccess],
  )

  const onAKCSelected = (keys: number[]) => {
    if (!isSuccess || newAKCType !== DeviceAKCType.AKC_NONE) {
      return
    }

    if (keys.length === 0) {
      setKeys([])
    } else {
      const akcIndex = akcIndices[layer][keys[0]]
      if (akcIndex !== null) {
        setKeys(getKeysFromAKC(akc[akcIndex]))
      }
    }
  }

  const onNewAKCKeySelected = (keys: number[]) => {
    if (!isSuccess || newAKCType === DeviceAKCType.AKC_NONE) {
      return
    }

    const maxKeys = newAKCType === DeviceAKCType.AKC_NULL_BIND ? 2 : 1
    keys = keys.slice(0, maxKeys)
    if (keys.every((key) => akcIndices[layer][key] === null)) {
      setNewAKCKeys(keys)
    }
  }

  const onRightClickAKC = (key: number) => {
    if (!isSuccess || newAKCType !== DeviceAKCType.AKC_NONE) {
      return
    }

    const akcIndex = akcIndices[layer][key]
    if (akcIndex !== null && (keys.length === 0 || keys.includes(key))) {
      setAKC(
        produce(akc, (draft) => {
          draft[akcIndex] = DEFAULT_AKC
        }),
      )
      setKeys([])
    }
  }

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <LayerSelector layer={layer} setLayer={setLayer} />
        </KeyboardEditorHeader>
        {!isSuccess ? (
          <KeyboardEditorSkeleton />
        ) : (
          <ToggleGroup
            type="multiple"
            value={(newAKCType === DeviceAKCType.AKC_NONE
              ? keys
              : newAKCKeys
            ).map((key) => key.toString())}
            onValueChange={(keys) => {
              const newKeys = keys.map((key) => parseInt(key))
              if (newAKCType === DeviceAKCType.AKC_NONE) {
                onAKCSelected(newKeys)
              } else {
                onNewAKCKeySelected(newKeys)
              }
            }}
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem value={key.toString()} asChild>
                  <KeycodeButton
                    disabled={
                      (newAKCType === DeviceAKCType.AKC_NONE) ===
                      (akcIndices[layer][key] === null)
                    }
                    keycodeMetadata={KEYCODE_TO_METADATA[keymap[layer][key]]}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      onRightClickAKC(key)
                    }}
                    className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  />
                </ToggleGroupItem>
              )}
            />
          </ToggleGroup>
        )}
      </KeyboardEditorLayout>
      <KeyboardEditorLayout>
        {keys.length > 0 ? (
          <div></div>
        ) : newAKCType === DeviceAKCType.AKC_NONE ? (
          <div
            className={cn(
              "mx-auto flex w-full max-w-5xl flex-col p-4",
              !isSuccess && "pointer-events-none opacity-50",
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold leading-none tracking-tight">
                Advanced Key Bindings: {filteredAKC.toString().padStart(2, "0")}
                /{metadata.numAKC.toString().padStart(2, "0")}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger
                  disabled={!isSuccess || filteredAKC.length >= metadata.numAKC}
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
                      onClick={() => setNewAKCType(akcMetadata.type)}
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
            {filteredAKC.length > 0 ? (
              <div className="mt-4 grid gap-4 p-4"></div>
            ) : (
              <div className="mt-4 flex h-56 flex-col items-center justify-center rounded-sm border border-dashed border-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No advanced key bindings have been set up yet.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
            <div className="flex items-center justify-between gap-4"></div>
          </div>
        )}
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
