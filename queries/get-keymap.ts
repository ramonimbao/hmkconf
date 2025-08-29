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

import { useQueries, useQuery } from "@tanstack/react-query"

import { useKeyboard } from "@/components/providers/keyboard-provider"

export function useGetKeymap(options: { profile: number; layer: number }) {
  const { profile, layer } = options
  const { id, getKeymap } = useKeyboard()

  return useQuery({
    queryKey: [id, profile, "keymap", layer],
    queryFn: () => getKeymap({ profile, layer }),
  })
}

export function useGetKeymapAllLayers(options: { profile: number }) {
  const { profile } = options
  const {
    id,
    metadata: { numLayers },
    getKeymap,
  } = useKeyboard()

  return useQueries({
    queries: [...Array(numLayers)].map((_, layer) => ({
      queryKey: [id, profile, "keymap", layer],
      queryFn: () => getKeymap({ profile, layer }),
    })),
  })
}
