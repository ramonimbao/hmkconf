import { useDevice } from "@/components/providers/device-provider"
import { DeviceAKC } from "@/types/devices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetAKC(profileNum: number) {
  const { id, setAKC } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, "akc", profileNum]

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
