import { useDevice } from "@/components/providers/device-provider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useRecalibrate() {
  const { id, recalibrate } = useDevice()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: recalibrate,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [id, "debug"] }),
  })
}
