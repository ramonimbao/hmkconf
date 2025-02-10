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

import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { keycodeToMetadata } from "@/constants/keycodes"
import { cn, displayDistance } from "@/lib/utils"
import { DeviceActuation } from "@/types/devices"
import { ComponentProps, useMemo } from "react"

interface ActuationButtonProps extends ComponentProps<typeof Button> {
  keycode: number
  actuation: DeviceActuation
}

export function ActuationButton({
  keycode,
  actuation,
  className,
  ...props
}: ActuationButtonProps) {
  const {
    performance: { showKeymap },
  } = useConfigurator()

  const keycodeMetadata = useMemo(() => keycodeToMetadata(keycode), [keycode])

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
