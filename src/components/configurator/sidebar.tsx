"use client"

import { NUM_PROFILES } from "@/constants/devices"
import { displayUint16 } from "@/lib/utils"
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group"
import { ChevronsUpDown, Circle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useConfigurator } from "../configurator-provider"
import { useDevice } from "../device-provider"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"

export function ConfiguratorSidebar() {
  const { profileNum, setProfileNum } = useConfigurator()
  const { metadata, isDemo, disconnect } = useDevice()

  const router = useRouter()

  const onDisconnect = async () => {
    await disconnect()
    if (isDemo) {
      router.replace("/")
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-57px)]">
      <div className="flex flex-col gap-4 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-auto px-4 py-3">
              <div className="grid flex-1 text-left">
                <p className="text-xs text-muted-foreground">Device</p>
                <span className="truncate">{metadata.name}</span>
              </div>
              <ChevronsUpDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <div className="grid px-2 py-1.5 text-xs text-muted-foreground">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Vendor ID</p>
                <p>{displayUint16(metadata.vendorId)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Product ID</p>
                <p>{displayUint16(metadata.productId)}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onDisconnect}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-col gap-3 rounded-md border bg-card p-4 shadow-sm">
          <p className="font-semibold leading-none">Profiles</p>
          <RadioGroup
            value={profileNum.toString()}
            onValueChange={(value) => setProfileNum(Number(value))}
            className="grid gap-1"
          >
            {[...Array(NUM_PROFILES)].map((_, i) => (
              <RadioGroupItem
                key={i}
                value={i.toString()}
                className="relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
              >
                <span className="absolute left-2 flex size-3.5 items-center justify-center">
                  <RadioGroupIndicator>
                    <Circle className="size-2 fill-current" />
                  </RadioGroupIndicator>
                </span>
                Profile {i}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>
      </div>
    </ScrollArea>
  )
}
