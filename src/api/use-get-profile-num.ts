import { useDevice } from "@/components/providers/device-provider"
import { useQuery } from "@tanstack/react-query"

const REFETCH_INTERVAL = 1000

export function useGetProfileNum() {
  const { id, getProfileNum } = useDevice()

  return useQuery({
    queryKey: [id, "profileNum"],
    queryFn: getProfileNum,
    refetchInterval: REFETCH_INTERVAL,
  })
}
