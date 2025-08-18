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

import { XIcon } from "lucide-react"
import { useMemo, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useKeycode } from "@/hooks/use-keycode"
import { getUnitSizeCSS } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { keycodeCategories, KeycodeCategory } from "@/types/keycodes"
import { Keycode } from "@/types/libhmk/keycodes"

import { KeycodeButton, KeycodeButtonTooltip } from "./keycode-button"

export function KeycodeAccordions({
  onKeycodeSelected,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  onKeycodeSelected: (keycode: number) => void
}) {
  const { categorizedKeycodes, getKeycodeMetadata } = useKeycode()

  const [search, setSearch] = useState("")
  const filteredKeycodes = useMemo<[KeycodeCategory, Keycode[]][]>(() => {
    const searchLower = search.toLowerCase()
    return search === ""
      ? categorizedKeycodes
      : categorizedKeycodes.map(([category, keycodes]) => [
          category,
          keycodes.filter((keycode) => {
            const { name, tooltip = "" } = getKeycodeMetadata(keycode)
            return (
              name.toLowerCase().includes(searchLower) ||
              tooltip.toLowerCase().includes(searchLower)
            )
          }),
        ])
  }, [categorizedKeycodes, getKeycodeMetadata, search])

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      <div className="flex items-center justify-end">
        <div className="relative">
          <Input
            className="pr-8"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            value={search}
          />
          <Button
            className="absolute top-1/2 right-1.5 size-6 -translate-y-1/2 text-muted-foreground"
            onClick={() => setSearch("")}
            size="icon"
            variant="ghost"
          >
            <XIcon />
            <span className="sr-only">Clear Search</span>
          </Button>
        </div>
      </div>
      <Accordion
        defaultValue={["Basic"]}
        type="multiple"
        value={search === "" ? undefined : Object.values(keycodeCategories)}
      >
        {filteredKeycodes.map(([category, keycodes]) =>
          keycodes.length === 0 ? null : (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent className="flex flex-wrap text-sm">
                {keycodes.map((keycode) => (
                  <div key={keycode} className="p-0.5" style={getUnitSizeCSS()}>
                    <KeycodeButtonTooltip keycode={keycode}>
                      <KeycodeButton
                        keycode={keycode}
                        onClick={() => onKeycodeSelected(keycode)}
                      />
                    </KeycodeButtonTooltip>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </div>
  )
}
