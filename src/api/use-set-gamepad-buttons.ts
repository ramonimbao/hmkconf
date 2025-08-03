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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"

type SetGamepadButtonsParams = {
  start: number
  buttons: number[]
}

export function useSetGamepadButtons(profile: number) {
  const { id, setGamepadButtons } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profile, "gamepadButtons"]

  return useMutation({
    mutationFn: ({ start, buttons }: SetGamepadButtonsParams) =>
      setGamepadButtons(profile, start, buttons),
    onMutate: async ({ start, buttons }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousButtons = queryClient.getQueryData<number[]>(queryKey)
      queryClient.setQueryData(
        queryKey,
        produce(previousButtons, (draft) => {
          if (draft) {
            for (let i = 0; i < buttons.length; i++) {
              draft[start + i] = buttons[i]
            }
          }
        }),
      )

      return { previousButtons }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousButtons)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
