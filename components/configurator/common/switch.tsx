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
import { InfoIcon } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch as SwitchComponent } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function Switch({
  className,
  disabled,
  id,
  title,
  description,
  tooltip,
  checked,
  defaultChecked = false,
  onCheckedChange,
  ...props
}: React.ComponentProps<"div"> & {
  disabled?: boolean
  id: string
  title: string
  description?: string
  tooltip?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="flex items-center gap-2">
        <SwitchComponent
          checked={checked ?? defaultChecked}
          disabled={disabled}
          id={id}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor={id}>{title}</Label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="size-4" />
              <span className="sr-only">Info</span>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm text-wrap">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {description && (
        <p
          className={cn(
            "text-sm text-muted-foreground",
            disabled && "opacity-50",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
