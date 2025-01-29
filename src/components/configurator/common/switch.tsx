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

import { Label } from "@/components/ui/label"
import { Switch as SwitchComponent } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  size?: "default" | "sm"
  id: string
  title: string
  description?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  disabled,
  size,
  id,
  title,
  description,
  checked,
  onCheckedChange,
  className,
}: SwitchProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SwitchComponent
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={id}
          className={cn(
            "font-semibold tracking-tight",
            size === "sm" ? "text-sm" : "text-base",
          )}
        >
          {title}
        </Label>
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
