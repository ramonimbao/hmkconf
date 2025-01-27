import { SWITCH_DISTANCE } from "@/constants/devices"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayUInt16(value: number) {
  return `0x${value.toString(16).toUpperCase().padStart(4, "0")}`
}

export function isWebUsbSupported() {
  return !!navigator.usb
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
