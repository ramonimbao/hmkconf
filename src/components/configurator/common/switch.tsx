import { Label } from "@/components/ui/label"
import { Switch as SwitchComponent } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  size?: "default" | "sm"
  id: string
  title: string
  description?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  disabled,
  size,
  id,
  title,
  description,
  checked,
  onCheckedChange,
  className,
}: SwitchProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SwitchComponent
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={id}
          className={cn(
            "font-semibold tracking-tight",
            size === "sm" ? "text-sm" : "text-base",
          )}
        >
          {title}
        </Label>
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
