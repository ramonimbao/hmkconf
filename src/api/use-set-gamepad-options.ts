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
import { HMKGamepadOptions } from "@/types/libhmk"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetGamepadOptions(profile: number) {
  const { id, setGamepadOptions } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profile, "gamepadOptions"]

  return useMutation({
    mutationFn: (options: HMKGamepadOptions) =>
      setGamepadOptions(profile, options),
    onMutate: async (options) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOptions =
        queryClient.getQueryData<HMKGamepadOptions>(queryKey)
      queryClient.setQueryData(queryKey, options)

      return { previousOptions }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousOptions)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
