"use client"

import { buttonVariants } from "@/components/ui/button"
import { NUM_LAYERS } from "@/constants/devices"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { ComponentProps } from "react"

interface LayerSelectorProps
  extends Omit<ComponentProps<typeof RadioGroup>, "value" | "onValueChange"> {
  layer: number
  setLayer: (layer: number) => void
}

export function LayerSelector({
  layer,
  setLayer,
  className,
  ...props
}: LayerSelectorProps) {
  return (
    <RadioGroup
      value={layer.toString()}
      onValueChange={(value) => setLayer(parseInt(value))}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <p className="font-semibold">Layer</p>
      <div className="grid grid-flow-col gap-1">
        {[...Array(NUM_LAYERS)].map((_, i) => (
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
