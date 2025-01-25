import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { KeycodeMetadata } from "@/types/keycodes"
import { HTMLAttributes } from "react"

interface KeycodeButtonProps extends HTMLAttributes<HTMLButtonElement> {
  keycodeMetadata: KeycodeMetadata
}

export function KeycodeButton({
  keycodeMetadata,
  className,
  ...props
}: KeycodeButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        keycodeMetadata.highlight && "font-extrabold",
        "size-full flex-col gap-0",
        className,
      )}
      {...props}
    >
      {keycodeMetadata.display ?? keycodeMetadata.id}
    </button>
  )
}
