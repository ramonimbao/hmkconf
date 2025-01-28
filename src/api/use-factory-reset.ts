import { useDevice } from "@/components/providers/device-provider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useFactoryReset() {
  const { id, factoryReset } = useDevice()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: factoryReset,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [id] }),
  })
}
