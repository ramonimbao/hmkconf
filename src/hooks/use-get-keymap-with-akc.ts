import { useDevice } from "@/components/providers/device-provider"
import { NUM_LAYERS } from "@/constants/devices"
import { DeviceAKCType } from "@/types/devices"
import { Keycode } from "@/types/keycodes"
import { produce } from "immer"
import { useGetAKC } from "./use-get-akc"
import { useGetKeymap } from "./use-get-keymap"

export function useGetKeymapWithAKC(
  profileNum: number,
):
  | { isSuccess: false; keymap?: undefined; akcIndices?: undefined }
  | { isSuccess: true; keymap: number[][]; akcIndices: number[][] } {
  const { metadata } = useDevice()

  const { isSuccess: isKeymapSuccess, data: keymap } = useGetKeymap(profileNum)
  const { isSuccess: isAKCSuccess, data: akc } = useGetAKC(profileNum)

  if (!isKeymapSuccess || !isAKCSuccess) {
    return { isSuccess: false }
  }

  const akcIndices = Array.from({ length: NUM_LAYERS }, () =>
    Array(metadata.numKeys).fill(0),
  )
  const keymapWithAKC = produce(keymap, (draft) => {
    for (let i = 0; i < akc.length; i++) {
      const { layer, key, akc: akConfig } = akc[i]

      akcIndices[layer][key] = i + 1
      switch (akConfig.type) {
        case DeviceAKCType.AKC_NULL_BIND:
          draft[layer][key] = Keycode.KC_NULL_BIND_PRIMARY
          draft[layer][akConfig.secondaryKey] = Keycode.KC_NULL_BIND_SECONDARY
          akcIndices[layer][akConfig.secondaryKey] = i + 1
          break

        case DeviceAKCType.AKC_DKS:
          draft[layer][key] = Keycode.KC_DKS
          break

        case DeviceAKCType.AKC_TAP_HOLD:
          draft[layer][key] = Keycode.KC_TAP_HOLD
          break

        case DeviceAKCType.AKC_TOGGLE:
          draft[layer][key] = Keycode.KC_TOGGLE
          break

        default:
          break
      }
    }
  })

  return {
    isSuccess: true,
    keymap: keymapWithAKC,
    akcIndices,
  }
}
