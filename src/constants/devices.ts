import {
  DeviceActuation,
  DeviceAKC,
  DeviceAKCMetadata,
  DeviceAKCType,
} from "@/types/devices"
import { Keycode } from "@/types/keycodes"

export const SWITCH_DISTANCE = 80

export const NUM_PROFILES = 4
export const NUM_LAYERS = 4

export const DEFAULT_ACTUATION_POINT = 128
export const DEFAULT_RT_DOWN = 32

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

export const AKC_METADATA: DeviceAKCMetadata[] = [
  {
    type: DeviceAKCType.AKC_NULL_BIND,
    name: "Null Bind (Rappy Snappy + SOCD)",
    description:
      "Monitor 2 keys and select which one is active based on the chosen behavior.",
    keycode: [Keycode.KC_NULL_BIND_PRIMARY, Keycode.KC_NULL_BIND_SECONDARY],
  },
  {
    type: DeviceAKCType.AKC_DKS,
    name: "Dynamic Keystroke",
    description:
      "Assign up to 4 keycodes to a single key. Each keycode can be assigned up to 4 actions for 4 different parts of the keystroke.",
    keycode: [Keycode.KC_DKS],
  },
  {
    type: DeviceAKCType.AKC_TAP_HOLD,
    name: "Tap-Hold",
    description:
      "Send a different keycode depending on whether the key is tapped or held.",
    keycode: [Keycode.KC_TAP_HOLD],
  },
  {
    type: DeviceAKCType.AKC_TOGGLE,
    name: "Toggle",
    description:
      "Toggle between key press and key release. Hold the key for normal behavior.",
    keycode: [Keycode.KC_TOGGLE],
  },
]

export const AKC_TYPE_TO_METADATA: Record<number, DeviceAKCMetadata> =
  AKC_METADATA.reduce(
    (acc, metadata) => ({ ...acc, [metadata.type]: metadata }),
    {},
  )
