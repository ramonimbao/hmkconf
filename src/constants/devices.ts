import { distanceToActuationPoint } from "@/lib/utils"
import { DeviceActuation, DeviceAKC, DeviceAKCType } from "@/types/devices"

export const NUM_PROFILES = 4
export const NUM_LAYERS = 4

export const DEFAULT_ACTUATION_POINT = distanceToActuationPoint(20)

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
