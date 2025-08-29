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

import { useMemo } from "react"

import { KeyboardLayout } from "@/types/keyboard/metadata"

type KeyboardLayoutUI = {
  width: number
  height: number
  keyPositions: {
    [key: number]: {
      x: number
      y: number
    }
  }
}

export function useKeyboardLayout(options: { layout: KeyboardLayout }) {
  const { layout } = options
  const allKeys = useMemo<number[]>(
    () => layout.flat().map((k) => k.key),
    [layout],
  )

  const layoutUI = useMemo(() => {
    const ret: KeyboardLayoutUI = { width: 0, height: 0, keyPositions: {} }
    const position = { x: 0, y: 0 }

    for (const row of layout) {
      for (const { key, w, h, x, y } of row) {
        position.x += x
        position.y += y
        ret.width = Math.max(ret.width, position.x + w)
        ret.height = Math.max(ret.height, position.y + h)
        ret.keyPositions[key] = { ...position }
        position.x += w
      }
      position.x = 0
      position.y += 1
    }

    return ret
  }, [layout])

  const nextKey = (key: number) => {
    const index = allKeys.indexOf(key)
    return index !== -1 && index < allKeys.length - 1
      ? allKeys[index + 1]
      : null
  }

  return { allKeys, layoutUI, nextKey }
}
