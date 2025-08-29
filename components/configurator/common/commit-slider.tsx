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

import { createContext, useContext, useEffect, useState } from "react"

import { Slider } from "@/components/ui/slider"
import { cn, optMap } from "@/lib/utils"

type CommitSliderProps = {
  disabled?: boolean
  currentValue: number
  setCurrentValue: (value: number) => void
}

const CommitSliderContext = createContext({} as CommitSliderProps)

export function CommitSliderProvider({
  children,
  className,
  disabled,
  title,
  description,
  display,
  defaultValue = 0,
  ...props
}: React.ComponentProps<"div"> & {
  disabled?: boolean
  title: string
  description?: string
  display?: (value: number) => string
  defaultValue?: number
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue)

  return (
    <CommitSliderContext.Provider
      value={{ disabled, currentValue, setCurrentValue }}
    >
      <div className={cn("flex flex-col", className)} {...props}>
        <div className={cn("grid text-sm", disabled && "opacity-50")}>
          <span className="font-medium">
            {title}: {display?.(currentValue) ?? currentValue}
          </span>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
        {children}
      </div>
    </CommitSliderContext.Provider>
  )
}

export function CommitSlider({
  className,
  committedValue,
  onCommit,
  ...props
}: React.ComponentProps<typeof Slider> & {
  committedValue?: number
  onCommit?: (value: number) => void
}) {
  const { disabled, currentValue, setCurrentValue } =
    useContext(CommitSliderContext)

  useEffect(
    () => optMap(committedValue, setCurrentValue),
    [setCurrentValue, committedValue],
  )

  return (
    <Slider
      className={cn("mt-3", className)}
      disabled={disabled}
      onValueChange={([value]) => setCurrentValue(value)}
      onValueCommit={() => onCommit?.(currentValue)}
      value={[currentValue]}
      {...props}
    />
  )
}
