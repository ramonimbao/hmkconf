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
import { DeviceActuation } from "@/types/devices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetActuations(profileNum: number) {
  const { id, setActuations } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profileNum, "actuations"]

  return useMutation({
    mutationFn: (actuations: DeviceActuation[]) =>
      setActuations(profileNum, actuations),
    onMutate: async (actuations) => {
      await queryClient.cancelQueries({ queryKey })
      const previousActuations =
        queryClient.getQueryData<DeviceActuation[]>(queryKey)
      queryClient.setQueryData(queryKey, actuations)

      return { previousActuations }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousActuations)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
