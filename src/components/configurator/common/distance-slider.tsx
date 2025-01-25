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
      <p className="font-semibold leading-none tracking-tight">
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
