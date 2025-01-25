import { useDevice } from "@/components/providers/device-provider"
import { useQuery } from "@tanstack/react-query"

const REFETCH_INTERVAL = 1000 / 30

export function useDebug() {
  const { id, debug } = useDevice()

  return useQuery({
    queryKey: [id, "debug"],
    queryFn: debug,
    refetchInterval: REFETCH_INTERVAL,
  })
}
