"use client"

import { useConfigurator } from "@/components/providers/configurator-provider"
import { buttonVariants } from "@/components/ui/button"
import { cn, displayDistance } from "@/lib/utils"
import { DeviceActuation } from "@/types/devices"
import { KeycodeMetadata } from "@/types/keycodes"
import { HTMLAttributes } from "react"

interface ActuationButtonProps extends HTMLAttributes<HTMLButtonElement> {
  keycodeMetadata: KeycodeMetadata
  actuation: DeviceActuation
}

export function ActuationButton({
  keycodeMetadata,
  actuation,
  className,
  ...props
}: ActuationButtonProps) {
  const {
    performance: { showKeymap },
  } = useConfigurator()

  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        keycodeMetadata.highlight && "font-extrabold",
        "size-full flex-col gap-0 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {showKeymap ? (
        (keycodeMetadata.display ?? keycodeMetadata.id)
      ) : (
        <span className="text-xs">
          {actuation.rtUp === 0 || actuation.rtDown === 0 ? (
            displayDistance(actuation.actuationPoint)
          ) : !actuation.continuous ? (
            <>
              <p>{displayDistance(actuation.actuationPoint)}</p>
              <p>{displayDistance(actuation.rtUp)}</p>
              <p>{displayDistance(actuation.rtDown)}</p>
            </>
          ) : (
            <>
              <p>{displayDistance(actuation.actuationPoint)}C</p>
              <p>{displayDistance(actuation.rtUp)}C</p>
              <p>{displayDistance(actuation.rtDown)}C</p>
            </>
          )}
        </span>
      )}
    </button>
  )
}
