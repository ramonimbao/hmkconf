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

import { useDevice } from "@/components/providers/device-provider"
import { DeviceAdvancedKey, DeviceAKType } from "@/types/devices"
import { Keycode } from "@/types/keycodes"
import { produce } from "immer"
import { useGetAdvancedKeys } from "./use-get-advanced-keys"
import { useGetKeymap } from "./use-get-keymap"

export function useGetKeymapWithAdvancedKeys(profile: number):
  | {
      isSuccess: false
      keymap?: undefined
      normalKeymap?: undefined
      advancedKeys?: undefined
      akIndices?: undefined
    }
  | {
      isSuccess: true
      keymap: number[][]
      normalKeymap: number[][]
      advancedKeys: DeviceAdvancedKey[]
      akIndices: (number | null)[][]
    } {
  const { metadata } = useDevice()

  const { isSuccess: isKeymapSuccess, data: keymap } = useGetKeymap(profile)
  const { isSuccess: isAdvancedKeysSuccess, data: advancedKeys } =
    useGetAdvancedKeys(profile)

  if (!isKeymapSuccess || !isAdvancedKeysSuccess) {
    return { isSuccess: false }
  }

  const akIndices = Array.from({ length: metadata.numLayers }, () =>
    Array(metadata.numKeys).fill(null),
  )
  const keymapWithAdvancedKeys = produce(keymap, (draft) => {
    for (let i = 0; i < advancedKeys.length; i++) {
      const { layer, key, ak } = advancedKeys[i]

      if (ak.type !== DeviceAKType.NONE) {
        akIndices[layer][key] = i
      }

      switch (ak.type) {
        case DeviceAKType.NULL_BIND:
          draft[layer][key] = Keycode.AK_NULL_BIND_PRIMARY
          draft[layer][ak.secondaryKey] = Keycode.AK_NULL_BIND_SECONDARY
          akIndices[layer][ak.secondaryKey] = i
          break

        case DeviceAKType.DYNAMIC_KEYSTROKE:
          draft[layer][key] = Keycode.AK_DYNAMIC_KEYSTROKE
          break

        case DeviceAKType.TAP_HOLD:
          draft[layer][key] = Keycode.AK_TAP_HOLD
          break

        case DeviceAKType.TOGGLE:
          draft[layer][key] = Keycode.AK_TOGGLE
          break

        default:
          break
      }
    }
  })

  return {
    isSuccess: true,
    keymap: keymapWithAdvancedKeys,
    normalKeymap: keymap,
    advancedKeys,
    akIndices,
  }
}
