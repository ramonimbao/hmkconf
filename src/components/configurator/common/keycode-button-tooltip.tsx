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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { keycodeToMetadata } from "@/constants/keycodes"
import { ReactNode, useMemo } from "react"

interface KeycodeButtonTooltipProps {
  keycode: number
  children: ReactNode
}

export function KeycodeButtonTooltip({
  keycode,
  children,
}: KeycodeButtonTooltipProps) {
  const keycodeMetadata = useMemo(() => keycodeToMetadata(keycode), [keycode])

  if (keycodeMetadata.tooltip === undefined) {
    return children
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-56">
          <p>{keycodeMetadata.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
