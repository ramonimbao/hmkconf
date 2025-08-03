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

import { useDevice } from "@/components/providers/device-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { categoryToKeycodes } from "@/constants/keycodes"
import { cn } from "@/lib/utils"
import { HTMLAttributes, useMemo } from "react"
import { KeycodeButton } from "./keycode-button"
import { KeycodeButtonTooltip } from "./keycode-button-tooltip"

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
  const { metadata } = useDevice()
  const size = keySize ?? 64

  const keycodeCategoriesMap = useMemo(
    () => categoryToKeycodes(metadata),
    [metadata],
  )

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
        {Object.entries(keycodeCategoriesMap).map(([category, keycodes]) => (
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
                    <KeycodeButtonTooltip keycode={keycode}>
                      <KeycodeButton
                        keycode={keycode}
                        onClick={() => onKeycodeSelected(keycode)}
                      />
                    </KeycodeButtonTooltip>
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
