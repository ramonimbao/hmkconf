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

import { useEffect, useRef } from "react"

export function useFileDialog({ accept }: { accept: string }) {
  const ref = useRef<HTMLInputElement | null>(null)

  const openFileDialog = (f: (file: File) => void) => {
    if (ref.current !== null) {
      ref.current.onchange = null
      ref.current.value = ""
      ref.current.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file !== undefined) {
          f(file)
        }
      }
      ref.current.click()
    }
  }

  useEffect(() => {
    ref.current = document.createElement("input")
    ref.current.type = "file"
    ref.current.accept = accept
  }, [accept])

  return { openFileDialog }
}
