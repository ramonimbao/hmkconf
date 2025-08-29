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
import { KeyboardSetGamepadButtonsOptions } from "@/types/keyboard"

type Variables = Omit<KeyboardSetGamepadButtonsOptions, "profile">

export function useSetGamepadButtons(options: { profile: number }) {
  const { profile } = options
  const { id, setGamepadButtons } = useKeyboard()

  return useOptimisticMutation({
    queryKey: [id, profile, "gamepadButtons"],
    mutationFn: (variables: Variables) =>
      setGamepadButtons({ profile, ...variables }),
    generateOptimisticData: ({ offset, buttons }, previousData: number[]) =>
      produce(previousData, (draft) => {
        for (let i = 0; i < buttons.length; i++) {
          draft[offset + i] = buttons[i]
        }
      }),
  })
}
