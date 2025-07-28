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

export function useSetTickRate(profile: number) {
  const { id, setTickRate } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profile, "tickRate"]

  return useMutation({
    mutationFn: (tickRate: number) => setTickRate(profile, tickRate),
    onMutate: async (tickRate) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTickRate = queryClient.getQueryData<number>(queryKey)
      queryClient.setQueryData(queryKey, tickRate)

      return { previousTickRate }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousTickRate)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
