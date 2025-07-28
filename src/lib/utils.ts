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

import { SWITCH_DISTANCE } from "@/constants/devices"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayUInt16(value: number) {
  return `0x${value.toString(16).toUpperCase().padStart(4, "0")}`
}

export function isWebHIDSupported() {
  return typeof window !== "undefined" && !!navigator.hid
}

export function switchDistanceToDistance(distance: number) {
  return Math.round((distance * 255) / SWITCH_DISTANCE)
}

export function distanceToSwitchDistance(distance: number) {
  return Math.round((distance * SWITCH_DISTANCE) / 255)
}

export function displayDistance(distance: number) {
  return (distanceToSwitchDistance(distance) / 20).toFixed(2)
}

export function asyncDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
