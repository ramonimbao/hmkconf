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

import { useGetProfile } from "@/api/use-get-profile"
import { displayUInt16 } from "@/lib/utils"
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group"
import { ChevronsUpDown, Circle, Keyboard } from "lucide-react"
import { useRouter } from "next/navigation"
import { useConfigurator } from "../providers/configurator-provider"
import { useDevice } from "../providers/device-provider"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ScrollArea } from "../ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export function ConfiguratorSidebar() {
  const { profile, setProfile } = useConfigurator()
  const { metadata, isDemo, disconnect } = useDevice()

  const { isSuccess, data: deviceProfile } = useGetProfile()

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
                <p>{displayUInt16(metadata.vendorId)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Product ID</p>
                <p>{displayUInt16(metadata.productId)}</p>
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
          <TooltipProvider>
            <RadioGroup
              value={profile.toString()}
              onValueChange={(value) => setProfile(parseInt(value))}
              className="grid gap-1"
            >
              {[...Array(metadata.numProfiles)].map((_, i) => (
                <RadioGroupItem
                  key={i}
                  value={i.toString()}
                  className="relative flex items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                >
                  <span className="absolute left-2 flex size-3.5 items-center justify-center">
                    <RadioGroupIndicator>
                      <Circle className="size-2 fill-current" />
                    </RadioGroupIndicator>
                  </span>
                  Profile {i}
                  {isSuccess && i === deviceProfile && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Keyboard className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-56">
                        Device current profile
                      </TooltipContent>
                    </Tooltip>
                  )}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </TooltipProvider>
        </div>
      </div>
    </ScrollArea>
  )
}
