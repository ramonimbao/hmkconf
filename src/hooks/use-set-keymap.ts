import { useDevice } from "@/components/device-provider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSetKeymap(profileNum: number) {
  const { id, metadata, setKeymap } = useDevice()

  const queryClient = useQueryClient()
  const queryKey = [id, "keymap", profileNum]

  return useMutation({
    mutationFn: (keymap: number[][]) => setKeymap(profileNum, keymap),
    onMutate: async (keymap) => {
      await queryClient.cancelQueries({ queryKey })
      const previousKeymap =
        queryClient.getQueryData<number[][]>(queryKey) ?? metadata.defaultKeymap
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
