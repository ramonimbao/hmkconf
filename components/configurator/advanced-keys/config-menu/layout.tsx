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

import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useAdvancedKeysConfig } from "."
import { AdvancedKeysDeleteDialog } from "../common/delete-dialog"

export function AdvancedKeysConfigLayout({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    advancedKeys: { setIndex },
  } = useConfigurator()

  const {
    index,
    advancedKey,
    metadata: { title },
  } = useAdvancedKeysConfig()

  return (
    <div className={cn("flex size-full flex-col", className)} {...props}>
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          <AdvancedKeysDeleteDialog
            asChild
            index={index}
            advancedKey={advancedKey}
          >
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </AdvancedKeysDeleteDialog>
          <Button onClick={() => setIndex(null)} size="sm">
            Done
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}
