"use client"

import { useGetAKC } from "@/api/use-get-akc"
import { useSetAKC } from "@/api/use-set-akc"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AKC_TYPE_TO_METADATA, DEFAULT_AKC } from "@/constants/devices"
import { DeviceAKCType } from "@/types/devices"
import { produce } from "immer"

export function AdvancedKeysEditor() {
  const {
    profileNum,
    advancedKeys: { akcIndex, setAKCIndex },
  } = useConfigurator()

  const { isSuccess, data: akc } = useGetAKC(profileNum)
  const { mutate: setAKC } = useSetAKC(profileNum)

  const onDeleteAKC = () => {
    if (!isSuccess || akcIndex === null) {
      return
    }

    setAKC(
      produce(akc, (draft) => {
        draft[akcIndex] = DEFAULT_AKC
      }),
    )
    setAKCIndex(null)
  }

  if (
    !isSuccess ||
    akcIndex === null ||
    akc[akcIndex].akc.type === DeviceAKCType.AKC_NONE
  ) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 p-4">
        <Skeleton className="h-8 w-full rounded-full" />
        <Skeleton className="h-8 w-1/2 rounded-full" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold leading-none tracking-tight">
          {AKC_TYPE_TO_METADATA[akc[akcIndex].akc.type].name}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onDeleteAKC}>
            Delete
          </Button>
          <Button size="sm" onClick={() => setAKCIndex(null)}>
            Done
          </Button>
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col"></div>
    </div>
  )
}
