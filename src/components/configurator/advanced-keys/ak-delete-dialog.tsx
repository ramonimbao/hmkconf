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

"use client"

import { useGetAdvancedKeys } from "@/api/use-get-advanced-keys"
import { useSetAdvancedKeys } from "@/api/use-set-advanced-keys"
import { useConfigurator } from "@/components/providers/configurator-provider"
import { buttonVariants } from "@/components/ui/button"
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
import { HMKAKType } from "@/types/libhmk"
import { ReactNode } from "react"

interface AKDeleteDialogProps {
  akIndex: number
  children: ReactNode
}

export function AKDeleteDialog({ akIndex, children }: AKDeleteDialogProps) {
  const { profile } = useConfigurator()

  const { isSuccess, data: advancedKeys } = useGetAdvancedKeys(profile)
  const { mutate: setAdvancedKeys } = useSetAdvancedKeys(profile)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove this binding?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this binding?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Cancel
          </DialogClose>
          <DialogClose
            disabled={!isSuccess}
            className={buttonVariants({
              variant: "destructive",
              size: "sm",
            })}
            onClick={() =>
              isSuccess &&
              setAdvancedKeys({
                start: akIndex,
                advancedKeys: [
                  ...advancedKeys.slice(akIndex + 1),
                  {
                    layer: 0,
                    key: 0,
                    ak: { type: HMKAKType.NONE },
                  },
                ],
              })
            }
          >
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
