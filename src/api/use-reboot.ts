import { useDevice } from "@/components/providers/device-provider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useReboot() {
  const { id, reboot } = useDevice()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reboot,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [id] }),
  })
}
