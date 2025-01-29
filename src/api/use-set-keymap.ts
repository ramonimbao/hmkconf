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

export function useSetKeymap(profileNum: number) {
  const { id, setKeymap } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profileNum, "keymap"]

  return useMutation({
    mutationFn: (keymap: number[][]) => setKeymap(profileNum, keymap),
    onMutate: async (keymap) => {
      await queryClient.cancelQueries({ queryKey })
      const previousKeymap = queryClient.getQueryData<number[][]>(queryKey)
      queryClient.setQueryData(queryKey, keymap)

      return { previousKeymap }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousKeymap)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
