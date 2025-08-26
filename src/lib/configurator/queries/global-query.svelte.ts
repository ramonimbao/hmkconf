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

import { keyboardContext } from "$lib/keyboard"
import { Context, resource, useInterval, type ResourceReturn } from "runed"
import { RemapQuery, remapQueryContext } from "./remap-query.svelte"

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

const PROFILE_REFETCH_INTERVAL = 1000

class GlobalQuery {
  profile: ResourceReturn<number>

  remapQuery = remapQueryContext.get()

  #keyboard = keyboardContext.get()

  constructor() {
    this.profile = resource(
      () => {},
      () => this.#keyboard.getProfile(),
    )
    useInterval(() => this.profile.refetch(), PROFILE_REFETCH_INTERVAL)
  }
}

export const globalQueryContext = new Context<GlobalQuery>("hmk-global-query")

export function setConfiguratorQueryContext() {
  remapQueryContext.set(new RemapQuery())
  globalQueryContext.set(new GlobalQuery())
}
