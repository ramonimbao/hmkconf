"use client"

import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { cn, displayDistance } from "@/lib/utils"
import { DeviceActuation } from "@/types/devices"
import { KeycodeMetadata } from "@/types/keycodes"
import { ComponentProps } from "react"

interface ActuationButtonProps extends ComponentProps<typeof Button> {
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
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "size-full flex-col gap-0 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {showKeymap ? (
        (keycodeMetadata.display ?? keycodeMetadata.id)
      ) : (
        <span className="text-xs">
          {actuation.rtDown === 0 ? (
            displayDistance(actuation.actuationPoint)
          ) : (
            <>
              <p>
                {displayDistance(actuation.actuationPoint)}
                {actuation.continuous && "C"}
              </p>
              <p>
                {displayDistance(actuation.rtDown)}
                {actuation.continuous && "C"}
              </p>
              {actuation.rtUp > 0 && (
                <p>
                  {displayDistance(actuation.rtUp)}
                  {actuation.continuous && "C"}
                </p>
              )}
            </>
          )}
        </span>
      )}
    </Button>
  )
}
