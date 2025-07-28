/*
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { useDevice } from "@/components/providers/device-provider"
import { useQuery } from "@tanstack/react-query"

const REFETCH_INTERVAL = 1000

export function useGetTickRate(profile: number) {
  const { id, getTickRate } = useDevice()

  return useQuery({
    queryKey: [id, profile, "tickRate"],
    queryFn: () => getTickRate(profile),
    refetchInterval: REFETCH_INTERVAL,
  })
}
