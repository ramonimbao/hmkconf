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

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWebHIDSupported() {
  return !!navigator.hid
}

export function optMap<T, U>(value: T | null | undefined, f: (value: T) => U) {
  return value !== null && value !== undefined ? f(value) : undefined
}

export function partitionIntArray(arr: number[]) {
  const uniqueSortedArr = Array.from(new Set(arr)).sort((a, b) => a - b)
  const partitions: [number, number][] = []
  let curr: number[] = []

  for (const x of uniqueSortedArr) {
    if (curr.length === 0 || curr[curr.length - 1] + 1 === x) {
      curr.push(x)
    } else {
      partitions.push([curr[0], curr.length])
      curr = [x]
    }
  }

  if (curr.length > 0) {
    partitions.push([curr[0], curr.length])
  }

  return partitions
}

export function uInt16ToUInt8s(value: number) {
  return [value & 0xff, (value >> 8) & 0xff]
}

export function uInt32ToUInt8s(value: number) {
  return [
    value & 0xff,
    (value >> 8) & 0xff,
    (value >> 16) & 0xff,
    (value >> 24) & 0xff,
  ]
}
