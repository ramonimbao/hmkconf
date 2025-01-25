import { useDevice } from "@/components/providers/device-provider"
import { DeviceActuation } from "@/types/devices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetActuations(profileNum: number) {
  const { id, setActuations } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, "actuations", profileNum]

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
