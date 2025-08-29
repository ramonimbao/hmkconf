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

import { EllipsisVerticalIcon } from "lucide-react"
import { toast } from "sonner"
import z from "zod"

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { useKeyboard } from "@/components/providers/keyboard-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MAX_KEYBOARD_CONFIG_SIZE } from "@/constants/keyboard"
import { useBlob } from "@/hooks/use-blob"
import { useFileDialog } from "@/hooks/use-file-dialog"
import { useKeyboardConfig } from "@/hooks/use-keyboard-config"
import { useDuplicateProfile } from "@/queries/duplicate-profile"
import { useGetProfile } from "@/queries/get-profile"
import { useResetProfile } from "@/queries/reset-profile"

export function ProfilesTab() {
  const {
    metadata: { name, numProfiles },
  } = useKeyboard()

  const { getKeyboardConfig, setKeyboardConfig } = useKeyboardConfig()
  const { data: currentProfile } = useGetProfile()
  const { mutate: resetProfile } = useResetProfile()
  const { mutate: duplicateProfile } = useDuplicateProfile()

  const { openFileDialog } = useFileDialog({ accept: "application/json" })
  const { downloadBlob } = useBlob()

  const importProfile = async (profile: number) =>
    openFileDialog(async (file) => {
      try {
        if (file.size > MAX_KEYBOARD_CONFIG_SIZE) {
          throw new Error("The selected file is too large.")
        }

        const json = JSON.parse(await file.text())
        await setKeyboardConfig(profile, json)
        toast.success(`Successfully imported Profile ${profile}.`)
      } catch (err) {
        if (err instanceof SyntaxError) {
          toast.error("The selected file is not a valid JSON.")
        } else if (err instanceof z.ZodError) {
          toast.error(
            "The selected file is not a valid keyboard metadata. See console for details.",
          )
          console.error(z.treeifyError(err))
        } else if (err instanceof Error) {
          toast.error(err.message)
        } else {
          console.error(err)
        }
      }
    })

  const exportProfile = async (profile: number) => {
    try {
      const keyboardConfig = await getKeyboardConfig(profile)
      const blob = new Blob([JSON.stringify(keyboardConfig)], {
        type: "application/json",
      })
      downloadBlob(blob, `${name}-profile-${profile}.json`)
      toast.success(`Successfully exported Profile ${profile}.`)
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(
          "There is a bug in the keyboard configuration schema. Please report the issue. See console for details.",
        )
        console.error(z.treeifyError(err))
      } else if (err instanceof Error) {
        toast.error(err.message)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <div className="mx-auto flex size-full max-w-3xl flex-col">
      <FixedScrollArea>
        <div className="flex flex-col gap-4 p-4">
          <div className="grid shrink-0">
            <span className="font-semibold">Configure Profiles</span>
            <span className="text-sm text-muted-foreground">
              Manage your keyboard profiles here. You can import, export, and
              customize them.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(numProfiles)].map((_, profile) => (
              <div
                key={profile}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
              >
                <div className="grid flex-1 truncate font-semibold">
                  Profile {profile}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {currentProfile === profile && <Badge>Active</Badge>}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <EllipsisVerticalIcon />
                        <span className="sr-only">Open Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onSelect={() => importProfile(profile)}
                        >
                          Import
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => exportProfile(profile)}
                        >
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Duplicate From
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {[...Array(numProfiles)].map((_, i) =>
                              i === profile ? null : (
                                <DropdownMenuItem
                                  key={i}
                                  onSelect={() =>
                                    duplicateProfile({ profile, srcProfile: i })
                                  }
                                >
                                  Profile {i}
                                </DropdownMenuItem>
                              ),
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem
                          onSelect={() => resetProfile({ profile })}
                        >
                          Restore Default
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FixedScrollArea>
    </div>
  )
}
