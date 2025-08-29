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

import { cva, VariantProps } from "class-variance-authority"

import { toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

const keyButtonVariants = cva(
  cn(
    toggleVariants({ variant: "outline" }),
    "size-full flex-col gap-0 p-0 text-[length:inherit] whitespace-pre-wrap",
  ),
  {
    variants: {
      size: {
        default:
          "leading-[1em] [&_span]:text-[length:0.875em] [&_svg:not([class*='size-'])]:size-[1em]",
        sm: "leading-[1em] [&_span]:text-[length:0.75em] [&_svg:not([class*='size-'])]:size-[1em]",
      },
    },
    defaultVariants: { size: "default" },
  },
)

export function KeyButton({
  className,
  size,
  as,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof keyButtonVariants> & {
    as?: React.ElementType
  }) {
  const Comp = as ?? "button"

  return (
    <Comp className={cn(keyButtonVariants({ size, className }))} {...props} />
  )
}

export function KeyButtonSkeleton() {
  return <div className="size-full rounded-md border opacity-50" />
}
