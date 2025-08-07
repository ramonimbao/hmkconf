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
import { HMKActuation } from "@/types/libhmk"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { produce } from "immer"

type SetActuationMapParams = {
  start: number
  actuationMap: HMKActuation[]
}

export function useSetActuationMap(profile: number) {
  const { id, setActuationMap } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, profile, "actuationMap"]

  return useMutation({
    mutationFn: ({ start, actuationMap }: SetActuationMapParams) =>
      setActuationMap(profile, start, actuationMap),
    onMutate: async ({ start, actuationMap }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousActuationMap =
        queryClient.getQueryData<HMKActuation[]>(queryKey)
      queryClient.setQueryData(
        queryKey,
        produce(previousActuationMap, (draft) => {
          if (draft) {
            for (let i = 0; i < actuationMap.length; i++) {
              draft[start + i] = actuationMap[i]
            }
          }
        }),
      )

      return { previousActuationMap }
    },
    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(queryKey, context?.previousActuationMap)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
