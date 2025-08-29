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
  ArrowDownFromLineIcon,
  ArrowDownToLineIcon,
  ArrowUpFromLineIcon,
  ArrowUpToLineIcon,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DKS_ACTION_SIZE, DKS_ROW_PADDING } from "@/constants/advanced-keys"

const HEADER_ICONS = [
  { icon: ArrowDownFromLineIcon, tooltip: "Key press" },
  { icon: ArrowDownToLineIcon, tooltip: "Key fully pressed" },
  { icon: ArrowUpFromLineIcon, tooltip: "Key release from fully pressed" },
  { icon: ArrowUpToLineIcon, tooltip: "Key release" },
]

export function DynamicKeystrokeHeader() {
  return (
    <>
      <div
        className="flex items-center justify-center"
        style={{ gridArea: "bindings" }}
      >
        <div className="text-sm font-medium">Bindings</div>
      </div>
      {HEADER_ICONS.map((headerIcon, i) => (
        <div
          key={i}
          className="flex items-center"
          style={{ gridArea: `icon${i}` }}
        >
          <Tooltip>
            <TooltipTrigger>
              <headerIcon.icon
                className="size-4 -translate-x-1/2"
                style={{ marginLeft: DKS_ROW_PADDING + DKS_ACTION_SIZE / 2 }}
              />
            </TooltipTrigger>
            <TooltipContent>{headerIcon.tooltip}</TooltipContent>
          </Tooltip>
        </div>
      ))}
    </>
  )
}
