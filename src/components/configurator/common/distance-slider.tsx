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

import { Slider } from "@/components/ui/slider"
import {
  cn,
  displayDistance,
  distanceToSwitchDistance,
  switchDistanceToDistance,
} from "@/lib/utils"
import { HTMLAttributes } from "react"

interface DistanceSliderProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  size?: "default" | "sm"
  title: string
  description?: string
  min?: number
  max?: number
  distance?: number
  onDistanceChange?: (distance: number) => void
  onDistanceCommit?: (distance: number) => void
}

export function DistanceSlider({
  disabled,
  size,
  title,
  description,
  min,
  max,
  distance,
  onDistanceChange,
  onDistanceCommit,
  className,
  ...props
}: DistanceSliderProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <p
        className={cn(
          "font-semibold leading-none tracking-tight",
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        {title}: {displayDistance(distance ?? 0)}mm
      </p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      <Slider
        disabled={disabled}
        {...(min !== undefined && { min })}
        {...(max !== undefined && { max })}
        {...(distance !== undefined && {
          value: [distanceToSwitchDistance(distance)],
        })}
        {...(onDistanceChange && {
          onValueChange: ([value]) =>
            onDistanceChange(switchDistanceToDistance(value)),
        })}
        {...(onDistanceCommit && {
          onValueCommit: ([value]) =>
            onDistanceCommit(switchDistanceToDistance(value)),
        })}
        className="mt-3"
      />
    </div>
  )
}
