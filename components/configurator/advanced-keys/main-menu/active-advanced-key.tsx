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

import { EditIcon, TrashIcon } from "lucide-react"

import { useConfigurator } from "@/components/providers/configurator-provider"
import { Button } from "@/components/ui/button"
import { useDisplayAdvancedKeys } from "@/hooks/use-display-advanced-keys"
import {
  getAdvancedKeyDisplayItems,
  getAdvancedKeyMetadata,
} from "@/lib/advanced-keys"
import { getUnitSizeCSS } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { HMKAdvancedKey, HMKAKType } from "@/types/libhmk"

import { KeycodeButton } from "../../common/keycode-button"
import { AdvancedKeysDeleteDialog } from "../common/delete-dialog"

export function ActiveAdvancedKey({
  className,
  index,
  advancedKey,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
  advancedKey: HMKAdvancedKey
}) {
  const {
    profile,
    advancedKeys: { setLayer, setIndex },
  } = useConfigurator()

  const { layer } = advancedKey
  const { icon: Icon } = getAdvancedKeyMetadata(advancedKey.action.type)
  const { keys, items } = getAdvancedKeyDisplayItems(advancedKey)

  const { isSuccess, keymap } = useDisplayAdvancedKeys({ profile })

  if (!isSuccess || advancedKey.action.type === HMKAKType.NONE) {
    return null
  }

  return (
    <div
      className={cn(
        "flex divide-x rounded-md border bg-card text-card-foreground shadow-xs",
        className,
      )}
      {...props}
    >
      <div className="grid shrink-0 grid-cols-2 p-2 text-xs">
        {keys.map((key) => (
          <div key={key} className="p-0.5" style={getUnitSizeCSS()}>
            <KeycodeButton as="div" keycode={keymap[layer][key]} />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center gap-4 p-2">
        <Icon className="mx-3 size-5" />
        {typeof items === "string" ? (
          <div className="text-sm font-medium">{items}</div>
        ) : (
          <div className="flex items-center text-xs">
            {items.map((keycode, i) => (
              <div key={i} className="p-0.5" style={getUnitSizeCSS()}>
                <KeycodeButton as="div" keycode={keycode} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 p-2">
        <Button
          onClick={() => {
            setLayer(layer)
            setIndex(index)
          }}
          size="icon"
          variant="outline"
        >
          <EditIcon />
          <span className="sr-only">Edit Advanced Key</span>
        </Button>
        <AdvancedKeysDeleteDialog
          asChild
          index={index}
          advancedKey={advancedKey}
        >
          <Button size="icon" variant="outline">
            <TrashIcon />
            <span className="sr-only">Remove Advanced Key</span>
          </Button>
        </AdvancedKeysDeleteDialog>
      </div>
    </div>
  )
}
