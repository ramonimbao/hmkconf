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

import { useMemo, useRef } from "react"
import { useResizeObserver } from "usehooks-ts"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useKeyboardLayout } from "@/hooks/use-keyboard-layout"
import { getUnitSizeCSS, unitToEM, unitToEMString } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { KeyboardLayout } from "@/types/keyboard/metadata"

export function KeyboardEditor({
  ...props
}: Omit<React.ComponentProps<typeof ResizablePanelGroup>, "direction">) {
  return <ResizablePanelGroup direction="vertical" {...props} />
}

export function KeyboardEditorView({
  children,
  ...props
}: React.ComponentProps<typeof ResizablePanel>) {
  return (
    <ResizablePanel defaultSize={50} minSize={25} {...props}>
      <div className="mx-auto flex size-full max-w-7xl flex-col">
        {children}
      </div>
    </ResizablePanel>
  )
}

export const KeyboardEditorSeparator = ResizableHandle

export function KeyboardEditorHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "flex h-14 w-full shrink-0 items-center justify-between gap-4 px-4",
        className,
      )}
      {...props}
    />
  )
}

export function KeyboardEditorKeyboard({
  className,
  layout,
  keyGenerator,
  ...props
}: React.ComponentProps<"div"> & {
  layout: KeyboardLayout
  keyGenerator: (key: number) => React.ReactNode
}) {
  const {
    layoutUI: { width, height, keyPositions },
  } = useKeyboardLayout({ layout })

  const ref = useRef({} as HTMLDivElement)
  const { width: containerWidth, height: containerHeight } = useResizeObserver({
    ref,
  })

  const fontSize = useMemo(() => {
    if (containerWidth !== undefined && containerHeight !== undefined) {
      return Math.min(
        containerWidth / unitToEM(width),
        containerHeight / unitToEM(height),
      )
    }
  }, [containerHeight, containerWidth, height, width])

  return (
    <div className={cn("size-full p-4", className)} {...props}>
      <div
        className="relative size-full"
        ref={ref}
        style={{ fontSize: `${fontSize}px` }}
      >
        {fontSize !== undefined && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative" style={getUnitSizeCSS(width, height)}>
              {layout.flatMap((row) =>
                row.map(({ key, w, h }) => (
                  <div
                    key={key}
                    className="absolute p-0.5"
                    style={{
                      ...getUnitSizeCSS(w, h),
                      left: unitToEMString(keyPositions[key].x),
                      top: unitToEMString(keyPositions[key].y),
                    }}
                  >
                    {keyGenerator(key)}
                  </div>
                )),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
