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

import { useDevice } from "@/components/providers/device-provider"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { ComponentProps } from "react"

interface LayerSelectorProps
  extends Omit<ComponentProps<typeof RadioGroup>, "value" | "onValueChange"> {
  layer: number
  setLayer: (layer: number) => void
}

export function LayerSelector({
  disabled,
  layer,
  setLayer,
  className,
  ...props
}: LayerSelectorProps) {
  const { metadata } = useDevice()

  return (
    <RadioGroup
      disabled={disabled}
      value={layer.toString()}
      onValueChange={(value) => setLayer(parseInt(value))}
      className={cn(
        "flex items-center gap-2",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <p className="font-semibold">Layer</p>
      <div className="grid grid-flow-col gap-1">
        {[...Array(metadata.numLayers)].map((_, i) => (
          <RadioGroupItem
            key={i}
            value={i.toString()}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-8 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
            )}
          >
            {i}
          </RadioGroupItem>
        ))}
      </div>
    </RadioGroup>
  )
}
