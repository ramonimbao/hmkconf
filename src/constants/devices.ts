import { DeviceActuation, DeviceAKC, DeviceAKCType } from "@/types/devices"

export const SWITCH_DISTANCE = 80

export const NUM_PROFILES = 4
export const NUM_LAYERS = 4

export const DEFAULT_ACTUATION_POINT = 128

export const DEFAULT_ACTUATION: DeviceActuation = {
  actuationPoint: DEFAULT_ACTUATION_POINT,
  rtDown: 0,
  rtUp: 0,
  continuous: false,
}

export const DEFAULT_AKC: DeviceAKC = {
  layer: 0,
  key: 0,
  akc: { type: DeviceAKCType.AKC_NONE },
}
