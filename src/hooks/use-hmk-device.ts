import { DEVICE_METADATA } from "@/constants/device-metadata"
import { NUM_LAYERS } from "@/constants/devices"
import { GAUSS64 } from "@/constants/devices/GAUSS64"
import { displayUInt16, isWebUsbSupported } from "@/lib/utils"
import {
  DeviceAction,
  DeviceAKC,
  DeviceAKCType,
  DeviceRequest,
  DeviceState,
} from "@/types/devices"
import { create } from "zustand"

const HMK_DEVICE_TIMOUT = 4000

const HMK_DEVICE_FILTERS: USBDeviceFilter[] = DEVICE_METADATA.map(
  ({ vendorId, productId }) => ({
    vendorId,
    productId,
  }),
)

type HMKDeviceState = DeviceState &
  (
    | {
        status: "disconnected"
        usbDevice?: undefined
        interfaceNum?: undefined
      }
    | {
        status: "connected"
        usbDevice: USBDevice
        interfaceNum: number
      }
  )

type HMKDevice = HMKDeviceState & DeviceAction

const initialState: HMKDeviceState = {
  id: "HMK_DEVICE",
  metadata: GAUSS64,
  isDemo: false,
  status: "disconnected",
}

const findVendorSpecificInterface = (usbDevice: USBDevice): number => {
  for (const usbInterface of usbDevice.configuration?.interfaces ?? []) {
    for (const alternate of usbInterface.alternates) {
      if (alternate.interfaceClass === 0xff) {
        return usbInterface.interfaceNumber
      }
    }
  }

  throw new Error("No vendor specific interface found")
}

const withTimeout = <T>(fn: () => Promise<T>, timeout?: number) =>
  new Promise<T>(async (resolve, reject) => {
    let canceled = false

    const timer = setTimeout(() => {
      canceled = true
      reject(new Error("Failed to complete operation within timeout"))
    }, timeout ?? HMK_DEVICE_TIMOUT)

    const result = await fn()
    if (!canceled) {
      clearTimeout(timer)
      resolve(result)
    }
  })

const sendRaw = (
  device: HMKDevice,
  request: number,
  value: number,
  payload?: BufferSource,
) =>
  withTimeout(async () => {
    if (device.status !== "connected") {
      throw new Error("Device not connected")
    }

    const { usbDevice, interfaceNum } = device
    const result = await usbDevice.controlTransferOut(
      {
        requestType: "class",
        recipient: "interface",
        request,
        value,
        index: interfaceNum,
      },
      payload,
    )

    if (result.status !== "ok") {
      throw new Error(`Failed to send request: ${result.status}`)
    }
  })

const receiveRaw = (
  device: HMKDevice,
  request: number,
  value: number,
  length: number,
) =>
  withTimeout(async () => {
    if (device.status !== "connected") {
      throw new Error("Device not connected")
    }

    const { usbDevice, interfaceNum } = device
    const result = await usbDevice.controlTransferIn(
      {
        requestType: "class",
        recipient: "interface",
        request,
        value,
        index: interfaceNum,
      },
      length,
    )

    if (result.status !== "ok" || result.data === undefined) {
      throw new Error(`Failed to receive request: ${result.status}`)
    }
    if (result.data.byteLength !== length) {
      throw new Error(
        `Invalid response length: expect ${length}, got ${result.data.byteLength}`,
      )
    }

    return result.data
  })

export const useHMKDevice = create<HMKDevice>()((set, get) => ({
  ...initialState,

  async connect() {
    if (!isWebUsbSupported()) {
      throw new Error("WebUSB is not supported")
    }

    const usbDevice = await navigator.usb.requestDevice({
      filters: HMK_DEVICE_FILTERS,
    })
    const metadata = DEVICE_METADATA.find(
      (metadata) =>
        metadata.vendorId === usbDevice.vendorId &&
        metadata.productId === usbDevice.productId,
    )

    if (metadata === undefined) {
      throw new Error("Unsupported device")
    }

    if (usbDevice.opened) {
      throw new Error("Device already opened")
    }

    await usbDevice.open()

    try {
      if (usbDevice.configuration === null) {
        await usbDevice.selectConfiguration(1)
      }

      const interfaceNum = findVendorSpecificInterface(usbDevice)
      await usbDevice.claimInterface(interfaceNum)
      await usbDevice.selectAlternateInterface(interfaceNum, 0)

      navigator.usb.addEventListener("disconnect", get().disconnect)

      set({
        id: `HMK_DEVICE:${displayUInt16(usbDevice.vendorId)}_${displayUInt16(usbDevice.productId)}`,
        metadata,
        status: "connected",
        usbDevice,
        interfaceNum,
      })
    } catch (err) {
      console.error("Failed to connect to device", err)
      await usbDevice.close()
    }
  },

  async disconnect() {
    const device = get()
    if (device.status !== "connected") {
      return
    }

    navigator.usb.removeEventListener("disconnect", device.disconnect)

    set({ ...initialState })
    await device.usbDevice.close()
  },

  async firmwareVersion() {
    const response = await receiveRaw(
      get(),
      DeviceRequest.CLASS_REQUEST_FIRMWARE_VERSION,
      0,
      2,
    )
    return response.getUint16(0, true)
  },

  async reboot() {
    await sendRaw(get(), DeviceRequest.CLASS_REQUEST_REBOOT, 0)
  },

  async bootloader() {
    await sendRaw(get(), DeviceRequest.CLASS_REQUEST_BOOTLOADER, 0)
  },

  async factoryReset() {
    await sendRaw(get(), DeviceRequest.CLASS_REQUEST_FACTORY_RESET, 0)
  },

  async recalibrate() {
    await sendRaw(get(), DeviceRequest.CLASS_REQUEST_RECALIBRATE, 0)
  },

  async debug() {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.CLASS_REQUEST_DEBUG,
      0,
      device.metadata.numKeys * 3,
    )

    return Array.from({ length: device.metadata.numKeys }, (_, i) => ({
      adcValue: response.getUint16(i * 3, true),
      distance: response.getUint8(i * 3 + 2),
    }))
  },

  async getKeymap(profileNum) {
    const device = get()
    const response = await receiveRaw(
      get(),
      DeviceRequest.CLASS_REQUEST_GET_KEYMAP,
      profileNum,
      NUM_LAYERS * device.metadata.numKeys,
    )

    return Array.from({ length: NUM_LAYERS }, (_, i) =>
      Array.from({ length: device.metadata.numKeys }, (_, j) =>
        response.getUint8(i * device.metadata.numKeys + j),
      ),
    )
  },

  async setKeymap(profileNum, keymap) {
    const device = get()
    const payload = new Uint8Array(keymap.flat())

    if (payload.length !== NUM_LAYERS * device.metadata.numKeys) {
      throw new Error("Invalid keymap length")
    }

    await sendRaw(
      device,
      DeviceRequest.CLASS_REQUEST_SET_KEYMAP,
      profileNum,
      payload,
    )
  },

  async getActuations(profileNum) {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.CLASS_REQUEST_GET_ACTUATIONS,
      profileNum,
      device.metadata.numKeys * 4,
    )

    return Array.from({ length: device.metadata.numKeys }, (_, i) => ({
      actuationPoint: response.getUint8(i * 4),
      rtDown: response.getUint8(i * 4 + 1),
      rtUp: response.getUint8(i * 4 + 2),
      continuous: response.getUint8(i * 4 + 3) === 1,
    }))
  },

  async setActuations(profileNum, actuations) {
    const device = get()
    const payload = new Uint8Array(
      actuations.flatMap(({ actuationPoint, rtDown, rtUp, continuous }) => [
        actuationPoint,
        rtDown,
        rtUp,
        continuous ? 1 : 0,
      ]),
    )

    if (payload.length !== device.metadata.numKeys * 4) {
      throw new Error("Invalid actuations length")
    }

    await sendRaw(
      device,
      DeviceRequest.CLASS_REQUEST_SET_ACTUATIONS,
      profileNum,
      payload,
    )
  },

  async getAKC(profileNum) {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.CLASS_REQUEST_GET_AKC,
      profileNum,
      device.metadata.numAKC * 12,
    )
    const akc: DeviceAKC[] = Array.from(
      { length: device.metadata.numAKC },
      (_, i) => {
        const offset = i * 12
        const layer = response.getUint8(offset)
        const key = response.getUint8(offset + 1)
        const type = response.getUint8(offset + 2)

        switch (type) {
          case DeviceAKCType.AKC_NULL_BIND:
            return {
              layer,
              key,
              akc: {
                type: DeviceAKCType.AKC_NULL_BIND,
                secondaryKey: response.getUint8(offset + 3),
                behavior: response.getUint8(offset + 4),
                bottomOutPoint: response.getUint8(offset + 5),
              },
            }

          case DeviceAKCType.AKC_DKS:
            return {
              layer,
              key,
              akc: {
                type: DeviceAKCType.AKC_DKS,
                keycodes: Array.from({ length: 4 }, (_, j) =>
                  response.getUint8(offset + 3 + j),
                ),
                bitmap: Array.from({ length: 4 }, (_, j) => {
                  const mask = response.getUint8(offset + 7 + j)
                  return Array.from(
                    { length: 4 },
                    (_, k) => (mask >> (k * 2)) & 3,
                  )
                }),
                bottomOutPoint: response.getUint8(offset + 11),
              },
            }

          case DeviceAKCType.AKC_TAP_HOLD:
            return {
              layer,
              key,
              akc: {
                type: DeviceAKCType.AKC_TAP_HOLD,
                tapKeycode: response.getUint8(offset + 3),
                holdKeycode: response.getUint8(offset + 4),
                tappingTerm: response.getUint16(offset + 5, true),
              },
            }

          case DeviceAKCType.AKC_TOGGLE:
            return {
              layer,
              key,
              akc: {
                type: DeviceAKCType.AKC_TOGGLE,
                keycode: response.getUint8(offset + 3),
                tappingTerm: response.getUint16(offset + 4, true),
              },
            }

          case DeviceAKCType.AKC_NONE:
          default:
            return { layer, key, akc: { type: DeviceAKCType.AKC_NONE } }
        }
      },
    )

    return akc.filter(({ akc }) => akc.type !== DeviceAKCType.AKC_NONE)
  },

  async setAKC(profileNum, akc) {
    const device = get()
    const payload = new Uint8Array([
      ...akc.flatMap(({ layer, key, akc }) => {
        const buffer = [layer, key, akc.type]

        switch (akc.type) {
          case DeviceAKCType.AKC_NULL_BIND:
            buffer.push(akc.secondaryKey, akc.behavior, akc.bottomOutPoint)
            break

          case DeviceAKCType.AKC_DKS:
            buffer.push(
              ...akc.keycodes,
              ...akc.bitmap.map((actions) =>
                actions.reduce((acc, val, i) => acc | (val << (i * 2)), 0),
              ),
              akc.bottomOutPoint,
            )
            break

          case DeviceAKCType.AKC_TAP_HOLD:
            buffer.push(akc.tapKeycode, akc.holdKeycode)
            buffer.push(
              (akc.tappingTerm >> 0) & 0xff,
              (akc.tappingTerm >> 8) & 0xff,
            )
            break

          case DeviceAKCType.AKC_TOGGLE:
            buffer.push(akc.keycode)
            buffer.push(
              (akc.tappingTerm >> 0) & 0xff,
              (akc.tappingTerm >> 8) & 0xff,
            )
            break

          case DeviceAKCType.AKC_NONE:
          default:
            break
        }

        while (buffer.length < 12) {
          buffer.push(0)
        }

        return buffer
      }),
      ...Array((device.metadata.numAKC - akc.length) * 12).fill(0),
    ])

    if (payload.length !== device.metadata.numAKC * 12) {
      throw new Error("Invalid akc length")
    }

    await sendRaw(
      device,
      DeviceRequest.CLASS_REQUEST_SET_AKC,
      profileNum,
      payload,
    )
  },
}))
