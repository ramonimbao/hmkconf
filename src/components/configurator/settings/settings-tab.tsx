"use client"

import { useBootloader } from "@/api/use-bootloader"
import { useFactoryReset } from "@/api/use-factory-reset"
import { useReboot } from "@/api/use-reboot"
import { useDevice } from "@/components/providers/device-provider"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsTab() {
  const { isDemo } = useDevice()

  const { mutate: reboot } = useReboot()
  const { mutate: bootloader } = useBootloader()
  const { mutate: factoryReset } = useFactoryReset()

  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
        <div className="flex flex-col">
          <p className="font-semibold leading-none tracking-tight">
            Restart Device
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Restart the device. No changes are made to the device configuration.
          </p>
          <div className="mt-3">
            <Button
              disabled={isDemo}
              variant="outline"
              onClick={() => reboot()}
            >
              Restart Device
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold leading-none tracking-tight">
            Enter Bootloader
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Restart the device and enter the bootloader. If the bootloader is
            not configured in the device firmware, nothing will happen.
          </p>
          <div className="mt-3">
            <Button
              disabled={isDemo}
              variant="outline"
              onClick={() => bootloader()}
            >
              Enter Bootloader
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold leading-none tracking-tight">
            Factory Reset
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Revert the device configuration to the default settings defined in
            the firmware.
          </p>
          <div className="mt-3">
            <Dialog>
              <DialogTrigger disabled={isDemo} asChild>
                <Button variant="destructive">Factory Reset</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Factory Reset?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to reset the device to its default
                    settings? All changes will be lost and cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    Cancel
                  </DialogClose>
                  <DialogClose
                    className={buttonVariants({
                      variant: "destructive",
                      size: "sm",
                    })}
                    onClick={() => factoryReset()}
                  >
                    Factory Reset
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
