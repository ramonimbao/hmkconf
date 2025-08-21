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

import { KeyboardIcon } from "lucide-react"

import { useGetProfile } from "@/queries/get-profile"

import { useConfiguratorGlobal } from "../providers/configurator-provider"
import { useKeyboard } from "../providers/keyboard-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function ProfileSelect({
  ...props
}: React.ComponentProps<typeof Select>) {
  const { profile, setProfile } = useConfiguratorGlobal()
  const { metadata } = useKeyboard()

  const { data: currentProfile } = useGetProfile()

  return (
    <Select
      onValueChange={(profile) => setProfile(parseInt(profile))}
      value={profile.toString()}
      {...props}
    >
      <SelectTrigger className="w-48" size="sm">
        <SelectValue placeholder="Select Profile" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(metadata.numProfiles)].map((_, i) => (
          <SelectItem key={i} value={i.toString()}>
            <span className="flex-1">Profile {i}</span>
            {currentProfile === i && (
              <Tooltip>
                <TooltipTrigger>
                  <KeyboardIcon className="size-4" />
                  <span className="sr-only">Active</span>
                </TooltipTrigger>
                <TooltipContent>Current active profile</TooltipContent>
              </Tooltip>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
