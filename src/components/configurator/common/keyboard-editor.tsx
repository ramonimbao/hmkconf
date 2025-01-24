"use client"

import { useDevice } from "@/components/device-provider"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ComponentProps, HTMLAttributes, ReactNode, useMemo } from "react"

export function KeyboardEditor({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-[calc(100vh-57px)] flex-col divide-y", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function KeyboardEditorLayout({
  className,
  children,
  ...props
}: ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea className={cn("max-h-[50%] w-full", className)} {...props}>
      <div className="flex flex-col">{children}</div>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export function KeyboardEditorHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex h-14 w-full items-center justify-between px-4",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}

interface KeyboardLayoutProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  size?: number
  elt(key: number): ReactNode
}

export function KeyboardEditorKeyboard({
  disabled,
  size: keySize,
  elt,
  className,
  style,
  ...props
}: KeyboardLayoutProps) {
  const { metadata } = useDevice()

  const size = keySize ?? 64
  const { width, height, keys } = useMemo(() => {
    let width = 0,
      height = 0
    let currentX = 0,
      currentY = 0

    const keys = []
    for (const row of metadata.layout) {
      for (const { key, w, h, x, y } of row) {
        currentX += x
        currentY += y
        width = Math.max(width, currentX + w)
        height = Math.max(height, currentY + h)

        keys.push(
          <div
            key={keys.length}
            className="absolute p-0.5"
            style={{
              width: w * size,
              height: h * size,
              left: currentX * size,
              top: currentY * size,
            }}
          >
            {elt(key)}
          </div>,
        )

        currentX += w
      }
      currentX = 0
      currentY++
    }

    return { width, height, keys }
  }, [elt, metadata.layout, size])

  return (
    <main
      className={cn(
        "flex flex-col items-center p-4 pt-0",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <div
        className="relative"
        style={{
          ...style,
          width: width * size,
          height: height * size,
        }}
      >
        {keys}
      </div>
    </main>
  )
}

interface KeyboardEditorSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
}

export function KeyboardEditorSkeleton({
  size,
  ...props
}: KeyboardEditorSkeletonProps) {
  return (
    <KeyboardEditorKeyboard
      size={size}
      elt={() => <Skeleton className="size-full rounded-sm" />}
      {...props}
    />
  )
}
