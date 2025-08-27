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

import type { ResourceReturn } from "runed"
import { ActuationQuery, actuationQueryContext } from "./actuation-query.svelte"
import { KeymapQuery, keymapQueryContext } from "./keymap-query.svelte"
import { ProfileQuery, profileQueryContext } from "./profile-query.svelte"

export async function optimisticUpdate<T>(options: {
  resource: ResourceReturn<T>
  optimisticFn: (current: T) => T
  updateFn: () => Promise<void>
}) {
  const { resource, optimisticFn, updateFn } = options

  const current = resource.current
  if (current) resource.mutate(optimisticFn(current))

  try {
    await updateFn()
  } catch (err) {
    if (current !== undefined) resource.mutate(current)
    console.error(err)
  } finally {
    resource.refetch()
  }
}

export function setConfiguratorQueryContext() {
  profileQueryContext.set(new ProfileQuery())
  keymapQueryContext.set(new KeymapQuery())
  actuationQueryContext.set(new ActuationQuery())
}
