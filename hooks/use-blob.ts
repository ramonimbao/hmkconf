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

export function useBlob() {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const downloadBlob = (blob: Blob, filename: string) => {
    if (ref.current) {
      const url = URL.createObjectURL(blob)
      ref.current.href = url
      ref.current.download = filename
      ref.current.click()
    }
  }

  useEffect(() => {
    ref.current = document.createElement("a")
  }, [])

  return { downloadBlob }
}
