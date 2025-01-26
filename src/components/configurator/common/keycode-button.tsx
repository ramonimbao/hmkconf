import { Button } from "@/components/ui/button"
import { KEYCODE_TO_METADATA } from "@/constants/keycodes"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

interface KeycodeButtonProps extends ComponentProps<typeof Button> {
  keycode: number
}

export function KeycodeButton({
  keycode,
  className,
  ...props
}: KeycodeButtonProps) {
  const keycodeMetadata = KEYCODE_TO_METADATA[keycode]

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("size-full flex-col gap-0", className)}
      {...props}
    >
      {keycodeMetadata.display ?? keycodeMetadata.id}
    </Button>
  )
}
