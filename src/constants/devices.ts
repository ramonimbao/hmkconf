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

export const DEFAULT_BOTTOM_OUT_POINT = 230
export const DEFAULT_TAPPING_TERM = 200

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
    keycodes: [Keycode.KC_NULL_BIND_PRIMARY, Keycode.KC_NULL_BIND_SECONDARY],
    constructDefault: (layer, keys) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_NULL_BIND,
        secondaryKey: keys[1],
        behavior: 0,
        bottomOutPoint: DEFAULT_BOTTOM_OUT_POINT,
      },
    }),
  },
  {
    type: DeviceAKCType.AKC_DKS,
    name: "Dynamic Keystroke",
    description:
      "Assign up to 4 keycodes to a single key. Each keycode can be assigned up to 4 actions for 4 different parts of the keystroke.",
    keycodes: [Keycode.KC_DKS],
    constructDefault: (layer, keys) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_DKS,
        keycodes: [0, 0, 0, 0],
        bitmap: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        bottomOutPoint: DEFAULT_BOTTOM_OUT_POINT,
      },
    }),
  },
  {
    type: DeviceAKCType.AKC_TAP_HOLD,
    name: "Tap-Hold",
    description:
      "Send a different keycode depending on whether the key is tapped or held.",
    keycodes: [Keycode.KC_TAP_HOLD],
    constructDefault: (layer, keys) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_TAP_HOLD,
        tapKeycode: Keycode.KC_NO,
        holdKeycode: Keycode.KC_NO,
        tappingTerm: DEFAULT_TAPPING_TERM,
      },
    }),
  },
  {
    type: DeviceAKCType.AKC_TOGGLE,
    name: "Toggle",
    description:
      "Toggle between key press and key release. Hold the key for normal behavior.",
    keycodes: [Keycode.KC_TOGGLE],
    constructDefault: (layer, keys) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_TOGGLE,
        keycode: Keycode.KC_NO,
        tappingTerm: DEFAULT_TAPPING_TERM,
      },
    }),
  },
]

export const AKC_TYPE_TO_METADATA: Record<number, DeviceAKCMetadata> =
  AKC_METADATA.reduce(
    (acc, metadata) => ({ ...acc, [metadata.type]: metadata }),
    {},
  )
