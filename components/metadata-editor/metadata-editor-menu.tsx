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

import { EyeIcon, TrashIcon, UploadIcon } from "lucide-react"
import { toast } from "sonner"
import z from "zod"

import { MAX_KEYBOARD_METADATA_SIZE } from "@/constants/keyboard"
import { useFileDialog } from "@/hooks/use-file-dialog"
import { useSavedKeyboardMetadata } from "@/hooks/use-saved-keyboard-metadata"
import { displayUInt16 } from "@/lib/ui"
import { keyboardMetadataSchema } from "@/types/keyboard/metadata"

import { useMetadataEditor } from "."
import { FixedScrollArea } from "../common/fixed-scroll-area"
import { Button } from "../ui/button"

export function MetadataEditorMenu() {
  const { savedMetadata, addMetadata, removeMetadata } =
    useSavedKeyboardMetadata()
  const { index, setIndex } = useMetadataEditor()
  const { openFileDialog } = useFileDialog({ accept: "application/json" })

  const uploadKeyboardMetadata = () =>
    openFileDialog(async (file) => {
      try {
        if (file.size > MAX_KEYBOARD_METADATA_SIZE) {
          throw new Error("The selected file is too large.")
        }

        const json = JSON.parse(await file.text())
        const metadata = keyboardMetadataSchema.parse(json)
        addMetadata(metadata)
      } catch (err) {
        if (err instanceof SyntaxError) {
          toast.error("The selected file is not a valid JSON.")
        } else if (err instanceof z.ZodError) {
          toast.error(
            "The selected file is not a valid keyboard metadata. See console for details.",
          )
          console.error(z.treeifyError(err))
        } else if (err instanceof Error) {
          toast.error(err.message)
        } else {
          console.error(err)
        }
      }
    })

  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-end">
          <Button onClick={uploadKeyboardMetadata} size="sm" variant="outline">
            <UploadIcon /> Import Keyboard Metadata
          </Button>
        </div>
        {savedMetadata.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-8">
            <p className="text-sm text-muted-foreground">
              No keyboard metadata found...
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {savedMetadata.map(({ name, vendorId, productId }, i) => (
              <div
                key={i}
                className="flex w-72 flex-col divide-y rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="grid flex-1 p-4 text-sm">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate font-mono text-muted-foreground">
                    {displayUInt16(vendorId)} {displayUInt16(productId)}
                  </span>
                </div>
                <div className="grid shrink-0 grid-cols-2 items-center gap-2 p-2">
                  <Button
                    onClick={() => setIndex(i)}
                    size="sm"
                    variant="outline"
                  >
                    <EyeIcon />
                    Preview
                  </Button>
                  <Button
                    onClick={() => {
                      if (index === i) {
                        setIndex(null)
                      }
                      removeMetadata(i)
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <TrashIcon />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </FixedScrollArea>
  )
}
