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

import { useGetAKC } from "@/api/use-get-akc"
import { useSetAKC } from "@/api/use-set-akc"
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
import { ReactNode } from "react"

interface AKCDeleteDialogProps {
  akcIndex: number
  children: ReactNode
}

export function AKCDeleteDialog({ akcIndex, children }: AKCDeleteDialogProps) {
  const { profileNum } = useConfigurator()

  const { isSuccess, data: akc } = useGetAKC(profileNum)
  const { mutate: setAKC } = useSetAKC(profileNum)

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
              isSuccess && setAKC(akc.filter((_, i) => i !== akcIndex))
            }
          >
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
