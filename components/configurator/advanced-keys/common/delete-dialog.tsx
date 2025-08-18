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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"
import { getAdvancedKeyMetadata } from "@/lib/advanced-keys"
import { HMKAdvancedKey } from "@/types/libhmk"

export function AdvancedKeysDeleteDialog({
  children,
  index,
  advancedKey: {
    action: { type },
  },
  ...props
}: React.ComponentProps<typeof DialogTrigger> & {
  index: number
  advancedKey: HMKAdvancedKey
}) {
  const {
    profile,
    advancedKeys: { setIndex },
  } = useConfigurator()

  const { title } = getAdvancedKeyMetadata(type)
  const { removeAdvancedKey } = useDisplayAdvancedKeys({ profile })

  return (
    <Dialog>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove this {title} binding?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this binding?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                removeAdvancedKey(index)
                setIndex(null)
              }}
              size="sm"
              variant="destructive"
            >
              Remove
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
