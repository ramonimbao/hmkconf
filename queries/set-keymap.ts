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

import { useKeyboard } from "@/components/providers/keyboard-provider"
import { useOptimisticMutation } from "@/hooks/use-optimistic-mutation"
import { KeyboardSetKeymapOptions } from "@/types/keyboard"

type Variables = Omit<KeyboardSetKeymapOptions, "profile" | "layer">

export function useSetKeymap(options: { profile: number; layer: number }) {
  const { profile, layer } = options
  const { id, setKeymap } = useKeyboard()

  return useOptimisticMutation({
    queryKey: [id, profile, "keymap", layer],
    mutationFn: (variables: Variables) =>
      setKeymap({ profile, layer, ...variables }),
    generateOptimisticData: ({ offset, keymap }, previousData: number[]) =>
      produce(previousData, (draft) => {
        for (let i = 0; i < keymap.length; i++) {
          draft[offset + i] = keymap[i]
        }
      }),
  })
}
