"use client"

import { useDebug } from "@/api/use-debug"
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
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorKeyboard,
  KeyboardEditorLayout,
} from "../common/keyboard-editor"

export function DebugTab() {
  const { isSuccess, data: debugInfo } = useDebug()
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
          disabled={!isSuccess}
          elt={(key) => (
            <div
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-full flex-col gap-0 text-xs",
              )}
            >
              {isSuccess && (
                <>
                  <p>{debugInfo[key].adcValue}</p>
                  <p>{displayDistance(debugInfo[key].distance)}</p>
                </>
              )}
            </div>
          )}
        />
      </KeyboardEditorLayout>
      <KeyboardEditorLayout>
        <div className="flex w-full flex-col p-4">
          <div className="mx-auto flex w-full max-w-prose flex-col">
            <div>
              <Button size="lg" onClick={() => recalibrate()}>
                Recalibrate
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Recalibration will erase and resample the stored minimum and
              maximum ADC values for each switch. Ensure that all keys are fully
              released before recalibrating, and press each key down completely
              once calibration is finished.
            </p>
          </div>
        </div>
      </KeyboardEditorLayout>
    </KeyboardEditor>
  )
}
