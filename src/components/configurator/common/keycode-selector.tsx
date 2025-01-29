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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  KEYCODE_CATEGORIES_MAP,
  KEYCODE_TO_METADATA,
} from "@/constants/keycodes"
import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"
import { KeycodeButton } from "./keycode-button"

interface KeycodeSelectorTooltipProps {
  keycode: number
  children: ReactNode
}

function KeycodeSelectorTooltip({
  keycode,
  children,
}: KeycodeSelectorTooltipProps) {
  const keycodeMetadata = KEYCODE_TO_METADATA[keycode]

  if (keycodeMetadata.tooltip === undefined) {
    return children
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-56">
          <p>{keycodeMetadata.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface KeycodeSelectorProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  size?: number
  onKeycodeSelected: (keycode: number) => void
}

export function KeycodeSelector({
  disabled,
  size: keySize,
  onKeycodeSelected,
  className,
  ...props
}: KeycodeSelectorProps) {
  const size = keySize ?? 64

  return (
    <div
      className={cn(
        "w-full",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <Accordion type="multiple" defaultValue={["Basic"]} className="w-full">
        {Object.entries(KEYCODE_CATEGORIES_MAP).map(([category, keycodes]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap">
                {keycodes.map((keycode, i) => (
                  <div
                    key={i}
                    className="p-0.5"
                    style={{
                      width: size,
                      height: size,
                    }}
                  >
                    <KeycodeSelectorTooltip keycode={keycode}>
                      <KeycodeButton
                        keycode={keycode}
                        onClick={() => onKeycodeSelected(keycode)}
                      />
                    </KeycodeSelectorTooltip>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
