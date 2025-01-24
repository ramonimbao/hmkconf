import { useDevice } from "@/components/providers/device-provider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetKeymap(profileNum: number) {
  const { id, setKeymap } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, "keymap", profileNum]

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
