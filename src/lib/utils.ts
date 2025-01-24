import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayUint16(value: number) {
  return `0x${value.toString(16).toUpperCase().padStart(4, "0")}`
}

export function isWebUsbSupported() {
  return !!navigator.usb
}

export function distanceToActuationPoint(distance: number) {
  return Math.round((distance * 255) / 40)
}
