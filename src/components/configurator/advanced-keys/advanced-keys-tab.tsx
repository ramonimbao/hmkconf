"use client"

import { useGetKeymapWithAKC } from "@/api/use-get-keymap-with-akc"
import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { useDevice } from "@/components/providers/device-provider"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AKC_METADATA,
  AKC_TYPE_TO_METADATA,
  DEFAULT_AKC,
} from "@/constants/devices"
import { KEYCODE_TO_METADATA } from "@/constants/keycodes"
import { cn } from "@/lib/utils"
import { DeviceAKC, DeviceAKCType } from "@/types/devices"
import { Keycode } from "@/types/keycodes"
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

export function AdvancedKeysTab() {
  const {
    profileNum,
    advancedKeys: { layer, akcIndex, setLayer, setAKCIndex },
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
    if (akcIndex !== null) {
      setAKC(
        produce(akc, (draft) => {
          draft[akcIndex] = DEFAULT_AKC
        }),
      )
      setAKCIndex(null)
    }
  }

  const onCreateNewAKC = (newAKC: DeviceAKC) => {
    if (!isSuccess) {
      return
    }

    const akcIndex = akc.findIndex(
      (akc) => akc.akc.type === DeviceAKCType.AKC_NONE,
    )
    if (akcIndex !== -1) {
      setAKC(
        produce(akc, (draft) => {
          draft[akcIndex] = newAKC
        }),
      )
      setNewAKCType(DeviceAKCType.AKC_NONE)
      setNewAKCKeys([])
      setAKCIndex(akcIndex)
    }
  }

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <LayerSelector
            disabled={newAKCType !== DeviceAKCType.AKC_NONE}
            layer={layer}
            setLayer={setLayer}
          />
        </KeyboardEditorHeader>
        {!isSuccess ? (
          <KeyboardEditorSkeleton />
        ) : newAKCType === DeviceAKCType.AKC_NONE ? (
          <ToggleGroup
            type="single"
            value={akcIndex === null ? "" : akcIndex.toString()}
            onValueChange={(akcIndex) =>
              setAKCIndex(akcIndex === "" ? null : parseInt(akcIndex))
            }
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem
                  value={
                    akcIndices[layer][key] === null
                      ? ""
                      : akcIndices[layer][key].toString()
                  }
                  asChild
                >
                  <KeycodeButton
                    disabled={akcIndices[layer][key] === null}
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
        ) : (
          <ToggleGroup
            type="multiple"
            value={newAKCKeys.map((key) => key.toString())}
            onValueChange={(keys) =>
              onNewAKCKeySelected(keys.map((key) => parseInt(key)))
            }
          >
            <KeyboardEditorKeyboard
              elt={(key) => (
                <ToggleGroupItem value={key.toString()} asChild>
                  <KeycodeButton
                    disabled={akcIndices[layer][key] !== null}
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
        {akcIndex !== null ? (
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
                Advanced Key Bindings:{" "}
                {filteredAKC.length.toString().padStart(2, "0")}/
                {metadata.numAKC.toString().padStart(2, "0")}
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
                      onClick={() => {
                        setNewAKCType(akcMetadata.type)
                        setNewAKCKeys([])
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
            {filteredAKC.length > 0 ? (
              <div className="mt-4 grid gap-4">
                {filteredAKC.map((akc, i) => (
                  <div
                    key={i}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "p-4",
                    )}
                  ></div>
                ))}
              </div>
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
                    setNewAKCKeys([])
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    newAKCKeys.length !==
                    AKC_TYPE_TO_METADATA[newAKCType].keycodes.length
                  }
                  size="sm"
                  onClick={() =>
                    onCreateNewAKC(
                      AKC_TYPE_TO_METADATA[newAKCType].constructDefault(
                        layer,
                        newAKCKeys,
                      ),
                    )
                  }
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
              from the keyboard to assign{" "}
              {AKC_TYPE_TO_METADATA[newAKCType].name}.
            </p>
            <p className="text-sm text-muted-foreground">
              {AKC_TYPE_TO_METADATA[newAKCType].description}
            </p>
            <div className="mt-4 flex w-full items-center justify-center">
              {AKC_TYPE_TO_METADATA[newAKCType].keycodes.map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <p className="text-sm">Key {i + 1}</p>
                  <div className="size-16 p-0.5">
                    <KeycodeButton
                      keycodeMetadata={
                        KEYCODE_TO_METADATA[
                          isSuccess && newAKCKeys.length > i
                            ? keymap[layer][newAKCKeys[i]]
                            : Keycode.KC_NO
                        ]
                      }
                      onContextMenu={(e) => {
                        e.preventDefault()
                        onNewAKCKeySelected(
                          newAKCKeys.filter((_, j) => j !== i),
                        )
                      }}
                      className={cn(newAKCKeys.length <= i && "border-dashed")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
