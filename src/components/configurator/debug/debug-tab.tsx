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

import { useKeyInfo } from "@/api/use-key-info"
import { useRecalibrate } from "@/api/use-recalibrate"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, displayDistance } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"
import {
  KeyTesterKeyPress,
  KeyTesterKeyRelease,
  KeyTesterProvider,
} from "../common/key-tester"
import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
} from "../common/keyboard-editor"

export function DebugTab() {
  const { isSuccess: isKeyInfoSuccess, data: keyInfo } = useKeyInfo()
  const { mutate: recalibrate } = useRecalibrate()

  return (
    <KeyboardEditor>
      <KeyboardEditorLayout isKeyboard>
        <KeyboardEditorHeader>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                <TriangleAlert />
                Warning
              </TooltipTrigger>
              <TooltipContent className="max-w-56">
                This tab continuously requests keyboard matrix data at a high
                frequency, which may cause the keyboard to slow down or become
                unresponsive. Ensure that this tab is not left open while using
                the keyboard.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </KeyboardEditorHeader>
        <KeyboardEditorKeyboard
          disabled={!isKeyInfoSuccess}
          elt={(key) => (
            <div
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-full flex-col gap-0 text-xs",
              )}
            >
              {isKeyInfoSuccess && (
                <>
                  <p>{keyInfo[key].adcValue}</p>
                  <p>{displayDistance(keyInfo[key].distance)}</p>
                </>
              )}
            </div>
          )}
        />
      </KeyboardEditorLayout>
      <KeyboardEditorLayout>
        <div className="mx-auto flex w-full max-w-5xl">
          <div className="flex flex-1 flex-col p-4">
            <p className="font-semibold leading-none tracking-tight">
              Recalibrate
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Recalibration will erase and resample the stored minimum and
              maximum ADC values for each switch. Ensure that all keys are fully
              released before recalibrating, and press each key down completely
              once calibration is finished.
            </p>
            <div className="mt-3">
              <Button onClick={() => recalibrate()}>Recalibrate</Button>
            </div>
          </div>
          <div className="grid w-80 shrink-0 gap-4 p-4">
            <KeyTesterProvider>
              <div className="flex flex-col">
                <p className="font-semibold leading-none tracking-tight">
                  Pressed Keys
                </p>
                <KeyTesterKeyPress className="mt-2 h-32" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold leading-none tracking-tight">
                  Released Keys
                </p>
                <KeyTesterKeyRelease className="mt-2 h-32" />
              </div>
            </KeyTesterProvider>
          </div>
        </div>
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
