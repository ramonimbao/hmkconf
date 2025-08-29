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

import { ToggleGroup } from "@radix-ui/react-toggle-group"
import { produce } from "immer"

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { DKS_BIT_COLUMN_WIDTH } from "@/constants/advanced-keys"

import { useDynamicKeystroke } from "."
import { useAdvancedKeysConfig } from ".."
import { DynamicKeystrokeHeader } from "./dynamic-keystroke-header"
import { DynamicKeystrokeKeys } from "./dynamic-keystroke-keys"
import { DynamicKeystrokeRow } from "./dynamic-keystroke-row"

export function DynamicKeystrokeBindings() {
  const { updateAdvancedKey } = useAdvancedKeysConfig()
  const { action, bindingIndex, setBindingIndex } = useDynamicKeystroke()

  return (
    <FixedScrollArea>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="grid text-sm">
          <span className="font-medium">Configure DKS Bindings</span>
          <span className="text-muted-foreground">
            Assign bindings using the menu on the left. For a tap action, click
            the plus icon once. For a hold action, click the plus icon and drag
            it to the desired key position based on your preferred behavior.
          </span>
        </div>
        <ToggleGroup
          asChild
          onValueChange={(bindingIndex) =>
            setBindingIndex(bindingIndex === "" ? null : parseInt(bindingIndex))
          }
          type="single"
          value={bindingIndex === null ? "" : bindingIndex.toString()}
        >
          <div
            className="grid grid-rows-[2rem_repeat(4,minmax(0,1fr))] gap-y-2"
            style={{
              gridTemplateColumns: `5rem repeat(4, ${DKS_BIT_COLUMN_WIDTH}px)`,
              gridTemplateAreas: `
                "bindings icon0 icon1 icon2 icon3"
                "key0 action0 action0 action0 action0"
                "key1 action1 action1 action1 action1"
                "key2 action2 action2 action2 action2"
                "key3 action3 action3 action3 action3"
              `,
            }}
          >
            <DynamicKeystrokeHeader />
            <DynamicKeystrokeKeys />
            {[...Array(4)].map((_, row) => (
              <DynamicKeystrokeRow
                key={row}
                row={row}
                bitmap={action.bitmap[row]}
                onBitmapCommit={(value) =>
                  updateAdvancedKey((advancedKey) => ({
                    ...advancedKey,
                    action: {
                      ...action,
                      bitmap: produce(action.bitmap, (draft) => {
                        draft[row] = value
                      }),
                    },
                  }))
                }
              />
            ))}
          </div>
        </ToggleGroup>
      </div>
    </FixedScrollArea>
  )
}
