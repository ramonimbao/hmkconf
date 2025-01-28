import { useDevice } from "@/components/providers/device-provider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useBootloader() {
  const { id, bootloader } = useDevice()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bootloader,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [id] }),
  })
}
