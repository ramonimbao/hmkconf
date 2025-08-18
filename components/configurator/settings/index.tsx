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

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { useKeyboard } from "@/components/providers/keyboard-provider"
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
import { useBootloader } from "@/queries/bootloader"
import { useFactoryReset } from "@/queries/factory-reset"
import { useReboot } from "@/queries/reboot"

export function SettingsTab() {
  const { isDemo } = useKeyboard()

  const { mutate: reboot } = useReboot()
  const { mutate: bootloader } = useBootloader()
  const { mutate: factoryReset } = useFactoryReset()

  return (
    <div className="mx-auto flex size-full max-w-3xl flex-col">
      <FixedScrollArea>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-2">
            <div className="grid">
              <span className="font-semibold">Restart Keyboard</span>
              <span className="text-sm text-muted-foreground">
                The keyboard will disconnect and reconnect. No changes will be
                made to your keyboard settings.
              </span>
            </div>
            <div>
              <Button
                disabled={isDemo}
                onClick={() => reboot()}
                size="sm"
                variant="outline"
              >
                Restart Keyboard
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid">
              <span className="font-semibold">Enter Bootloader Mode</span>
              <span className="text-sm text-muted-foreground">
                The keyboard will restart and enter bootloader mode if it is
                supported by the firmware. No changes will be made to your
                keyboard settings.
              </span>
            </div>
            <div>
              <Button
                disabled={isDemo}
                onClick={() => bootloader()}
                size="sm"
                variant="outline"
              >
                Enter Bootloader Mode
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid">
              <span className="font-semibold">Factory Reset</span>
              <span className="text-sm text-muted-foreground">
                Revert the keyboard to its factory settings defined by the
                firmware. All user data and settings will be lost.
              </span>
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={isDemo} size="sm" variant="destructive">
                    Factory Reset
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Factory Reset?</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to factory reset your keyboard?
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
                        onClick={() => factoryReset()}
                        size="sm"
                        variant="destructive"
                      >
                        Factory Reset
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </FixedScrollArea>
    </div>
  )
}
