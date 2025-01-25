import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { KeycodeMetadata } from "@/types/keycodes"
import { ComponentProps } from "react"

interface KeycodeButtonProps extends ComponentProps<typeof Button> {
  keycodeMetadata: KeycodeMetadata
}

export function KeycodeButton({
  keycodeMetadata,
  className,
  ...props
}: KeycodeButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        keycodeMetadata.highlight && "font-extrabold",
        "size-full flex-col gap-0",
        className,
      )}
      {...props}
    >
      {keycodeMetadata.display ?? keycodeMetadata.id}
    </Button>
  )
}
