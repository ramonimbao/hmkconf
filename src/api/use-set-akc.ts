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
import { DeviceAKC } from "@/types/devices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetAKC(profileNum: number) {
  const { id, setAKC } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profileNum, "akc"]

  return useMutation({
    mutationFn: (akc: DeviceAKC[]) => setAKC(profileNum, akc),
    onMutate: async (akc) => {
      await queryClient.cancelQueries({ queryKey })
      const previousAKC = queryClient.getQueryData<DeviceAKC[]>(queryKey)
      queryClient.setQueryData(queryKey, akc)

      return { previousAKC }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousAKC)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
