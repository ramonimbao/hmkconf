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

import { useKeyboard } from "@/components/providers/keyboard-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export function LayerSelect({
  className,
  disabled,
  layer,
  onLayerChange,
  ...props
}: React.ComponentProps<"div"> & {
  disabled?: boolean
  layer: number
  onLayerChange: (layer: number) => void
}) {
  const {
    metadata: { numLayers },
  } = useKeyboard()

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div className={cn("text-sm font-medium", disabled && "opacity-50")}>
        Layer
      </div>
      <ToggleGroup
        disabled={disabled}
        onValueChange={(value) => value && onLayerChange(parseInt(value))}
        type="single"
        value={layer.toString()}
        variant="outline"
      >
        {[...Array(numLayers)].map((_, i) => (
          <ToggleGroupItem key={i} className="size-8 p-0" value={i.toString()}>
            {i}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
