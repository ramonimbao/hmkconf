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

import { produce } from "immer"
import { useMemo } from "react"

import { useKeyboard } from "@/components/providers/keyboard-provider"
import { DEFAULT_ADVANCED_KEY } from "@/constants/libhmk/advanced-keys"
import { useGetAdvancedKeys } from "@/queries/get-advanced-keys"
import { useGetKeymapAllLayers } from "@/queries/get-keymap"
import { useSetAdvancedKeys } from "@/queries/set-advanced-keys"
import { HMKAdvancedKey, HMKAKType } from "@/types/libhmk"
import { Keycode } from "@/types/libhmk/keycodes"

type DisplayAdvancedKeysState = {
  advancedKeyCount: number
  advancedKeyIndices: (number | null)[][]
  advancedKeymap: Keycode[][]
  advancedKeys: HMKAdvancedKey[]
  keymap: Keycode[][]
}

type DisplayAdvancedKeysAction = {
  addAdvancedKey: (advancedKey: HMKAdvancedKey) => number | null
  removeAdvancedKey: (index: number) => void
}

export type DisplayAdvancedKeysProps = DisplayAdvancedKeysState &
  DisplayAdvancedKeysAction

export function useDisplayAdvancedKeys(options: {
  profile: number
}): (
  | ({ isSuccess: false } & Partial<DisplayAdvancedKeysState>)
  | ({ isSuccess: true } & DisplayAdvancedKeysState)
) &
  DisplayAdvancedKeysAction {
  const { profile } = options
  const {
    metadata: { numLayers, numKeys },
  } = useKeyboard()

  const { isSuccess: advancedKeysSuccess, data: advancedKeys } =
    useGetAdvancedKeys({ profile })
  const keymapResults = useGetKeymapAllLayers({
    profile,
  })
  const { mutate: setAdvancedKeys } = useSetAdvancedKeys({ profile })

  const isSuccess =
    advancedKeysSuccess && keymapResults.every((result) => result.isSuccess)

  const displayData = useMemo(() => {
    if (!isSuccess) {
      return { isSuccess }
    }

    const keymap = keymapResults.map((result) => result.data)

    let advancedKeyCount = 0
    const advancedKeyIndices: (number | null)[][] = [...Array(numLayers)].map(
      () => Array(numKeys).fill(null),
    )
    const advancedKeymap = produce(keymap, (draft) => {
      for (let i = 0; i < advancedKeys.length; i++) {
        const { layer, key, action } = advancedKeys[i]

        if (action.type === HMKAKType.NONE) {
          continue
        }

        advancedKeyCount++
        advancedKeyIndices[layer][key] = i
        switch (action.type) {
          case HMKAKType.NULL_BIND:
            draft[layer][key] = Keycode.AK_NULL_BIND_PRIMARY
            draft[layer][action.secondaryKey] = Keycode.AK_NULL_BIND_SECONDARY
            advancedKeyIndices[layer][action.secondaryKey] = i
            break
          case HMKAKType.DYNAMIC_KEYSTROKE:
            draft[layer][key] = Keycode.AK_DYNAMIC_KEYSTROKE
            break
          case HMKAKType.TAP_HOLD:
            draft[layer][key] = Keycode.AK_TAP_HOLD
            break
          case HMKAKType.TOGGLE:
            draft[layer][key] = Keycode.AK_TOGGLE
            break
        }
      }
    })

    return {
      isSuccess,
      advancedKeyCount,
      advancedKeyIndices,
      advancedKeymap,
      advancedKeys,
      keymap,
    }
  }, [advancedKeys, isSuccess, keymapResults, numKeys, numLayers])

  const addAdvancedKey = (advancedKey: HMKAdvancedKey) => {
    const index = isSuccess
      ? advancedKeys.findIndex(({ action }) => action.type === HMKAKType.NONE)
      : null

    if (index !== null) {
      setAdvancedKeys({ offset: index, advancedKeys: [advancedKey] })
    }

    return index
  }

  const removeAdvancedKey = (index: number) =>
    isSuccess &&
    setAdvancedKeys({ offset: index, advancedKeys: [DEFAULT_ADVANCED_KEY] })

  return { ...displayData, addAdvancedKey, removeAdvancedKey }
}
