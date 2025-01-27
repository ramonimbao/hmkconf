import {
  DeviceActuation,
  DeviceAKCDKSAction,
  DeviceAKCMetadata,
  DeviceAKCNullBindBehavior,
  DeviceAKCNullBindBehaviorMetadata,
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
export const MIN_TAPPING_TERM = 10
export const MAX_TAPPING_TERM = 1000

export const AKC_METADATA: DeviceAKCMetadata[] = [
  {
    type: DeviceAKCType.AKC_NULL_BIND,
    name: "Null Bind (Rappy Snappy + SOCD)",
    description:
      "Monitor 2 keys and select which one is active based on the chosen behavior.",
    numKeys: 2,
    keycodes: [Keycode.KC_NULL_BIND_PRIMARY, Keycode.KC_NULL_BIND_SECONDARY],
    create: (layer, keys) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_NULL_BIND,
        secondaryKey: keys[1],
        behavior: 0,
        bottomOutPoint: 0,
      },
    }),
  },
  {
    type: DeviceAKCType.AKC_DKS,
    name: "Dynamic Keystroke",
    description:
      "Assign up to 4 keycodes to a single key. Each keycode can be assigned up to 4 actions for 4 different parts of the keystroke.",
    numKeys: 1,
    keycodes: [Keycode.KC_DKS],
    create: (layer, keys, keymap) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_DKS,
        keycodes: [keymap[0], Keycode.KC_NO, Keycode.KC_NO, Keycode.KC_NO],
        bitmap: [
          [
            DeviceAKCDKSAction.DKS_PRESS,
            DeviceAKCDKSAction.DKS_HOLD,
            DeviceAKCDKSAction.DKS_HOLD,
            DeviceAKCDKSAction.DKS_RELEASE,
          ],
          Array(4).fill(DeviceAKCDKSAction.DKS_HOLD),
          Array(4).fill(DeviceAKCDKSAction.DKS_HOLD),
          Array(4).fill(DeviceAKCDKSAction.DKS_HOLD),
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
    numKeys: 1,
    keycodes: [Keycode.KC_TAP_HOLD],
    create: (layer, keys, keymap) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_TAP_HOLD,
        tapKeycode: keymap[0],
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
    numKeys: 1,
    keycodes: [Keycode.KC_TOGGLE],
    create: (layer, keys, keymap) => ({
      layer,
      key: keys[0],
      akc: {
        type: DeviceAKCType.AKC_TOGGLE,
        keycode: keymap[0],
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

export const AKC_NULL_BIND_BEHAVIOR_METADATA: DeviceAKCNullBindBehaviorMetadata[] =
  [
    {
      behavior: DeviceAKCNullBindBehavior.NULL_BIND_DISTANCE,
      name: "Distance (Rappy Snappy)",
      description: "Activate whichever key is pressed down further.",
    },
    {
      behavior: DeviceAKCNullBindBehavior.NULL_BIND_LAST,
      name: "Last Input",
      description: "Activate the key that was pressed last.",
    },
    {
      behavior: DeviceAKCNullBindBehavior.NULL_BIND_PRIMARY,
      name: "Absolute Priority (Key 1)",
      description: "Key 1 will take priority over key 2.",
    },
    {
      behavior: DeviceAKCNullBindBehavior.NULL_BIND_SECONDARY,
      name: "Absolute Priority (Key 2)",
      description: "Key 2 will take priority over key 1.",
    },
    {
      behavior: DeviceAKCNullBindBehavior.NULL_BIND_NEUTRAL,
      name: "Neutral",
      description: "Neither key will be activated.",
    },
  ]
