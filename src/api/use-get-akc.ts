import { useDevice } from "@/components/providers/device-provider"
import { useQuery } from "@tanstack/react-query"

export function useGetAKC(profileNum: number) {
  const { id, getAKC } = useDevice()

  return useQuery({
    queryKey: [id, profileNum, "akc"],
    queryFn: () => getAKC(profileNum),
  })
}
