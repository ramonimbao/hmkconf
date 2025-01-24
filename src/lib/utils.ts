import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWebUsbSupported() {
  return !!navigator.usb
}

export function distanceToActuationPoint(distance: number) {
  return Math.round((distance * 255) / 40)
}
