"use client"

import { displayUint16 } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
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
            <Button variant="outline" className="h-auto px-3">
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
      </div>
    </ScrollArea>
  )
}
