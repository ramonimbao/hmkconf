/*
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { DEVICE_METADATA } from "@/constants/device-metadata"
import { HE60 } from "@/constants/devices/HE60"
import { TaskQueue } from "@/lib/task-queue"
import { displayUInt16, isWebUsbSupported } from "@/lib/utils"
import {
  DeviceAction,
  DeviceAdvancedKey,
  DeviceAKType,
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
        taskQueue?: undefined
      }
    | {
        status: "connected"
        usbDevice: USBDevice
        interfaceNum: number
        taskQueue: TaskQueue
      }
  )

type HMKDevice = HMKDeviceState & DeviceAction

const initialState: HMKDeviceState = {
  id: "HMK_DEVICE",
  metadata: HE60,
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
) => {
  if (device.status !== "connected") {
    throw new Error("Device not connected")
  }

  return device.taskQueue.enqueue(() =>
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
    }),
  )
}

const receiveRaw = (
  device: HMKDevice,
  request: number,
  value: number,
  length: number,
  strictLength = true,
) => {
  if (device.status !== "connected") {
    throw new Error("Device not connected")
  }

  return device.taskQueue.enqueue(() =>
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
      if (strictLength && result.data.byteLength !== length) {
        throw new Error(
          `Invalid response length: expect ${length}, got ${result.data.byteLength}`,
        )
      }

      return result.data
    }),
  )
}

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
        taskQueue: new TaskQueue(),
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
    await device.taskQueue.clear()
    await device.usbDevice.close()
  },

  async firmwareVersion() {
    const response = await receiveRaw(
      get(),
      DeviceRequest.FIRMWARE_VERSION,
      0,
      2,
    )
    return response.getUint16(0, true)
  },

  async reboot() {
    await sendRaw(get(), DeviceRequest.REBOOT, 0)
  },

  async bootloader() {
    await sendRaw(get(), DeviceRequest.BOOTLOADER, 0)
  },

  async factoryReset() {
    await sendRaw(get(), DeviceRequest.FACTORY_RESET, 0)
  },

  async recalibrate() {
    await sendRaw(get(), DeviceRequest.RECALIBRATE, 0)
  },

  async keyInfo() {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.KEY_INFO,
      0,
      device.metadata.numKeys * 3,
    )

    return Array.from({ length: device.metadata.numKeys }, (_, i) => ({
      adcValue: response.getUint16(i * 3, true),
      distance: response.getUint8(i * 3 + 2),
    }))
  },

  async getCalibration() {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.GET_CALIBRATION,
      0,
      4,
    )

    return {
      initialRestValue: response.getUint16(0, true),
      initialBottomOutThreshold: response.getUint16(2, true),
    }
  },

  async setCalibration(calibration) {
    const device = get()
    const payload = new Uint8Array([
      calibration.initialRestValue & 0xff,
      (calibration.initialRestValue >> 8) & 0xff,
      calibration.initialBottomOutThreshold & 0xff,
      (calibration.initialBottomOutThreshold >> 8) & 0xff,
    ])

    await sendRaw(device, DeviceRequest.SET_CALIBRATION, 0, payload)
  },

  async getProfile() {
    const response = await receiveRaw(get(), DeviceRequest.GET_PROFILE, 0, 1)

    return response.getUint8(0)
  },

  async log() {
    const response = await receiveRaw(get(), DeviceRequest.LOG, 0, 1024, false)

    return new TextDecoder().decode(response).split("\0")[0]
  },

  async getKeymap(profile) {
    const device = get()
    const response = await receiveRaw(
      get(),
      DeviceRequest.GET_KEYMAP,
      profile,
      device.metadata.numLayers * device.metadata.numKeys,
    )

    return Array.from({ length: device.metadata.numLayers }, (_, i) =>
      Array.from({ length: device.metadata.numKeys }, (_, j) =>
        response.getUint8(i * device.metadata.numKeys + j),
      ),
    )
  },

  async setKeymap(profile, keymap) {
    const device = get()
    const payload = new Uint8Array(keymap.flat())

    if (
      payload.length !==
      device.metadata.numLayers * device.metadata.numKeys
    ) {
      throw new Error("Invalid keymap length")
    }

    await sendRaw(device, DeviceRequest.SET_KEYMAP, profile, payload)
  },

  async getActuationMap(profile) {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.GET_ACTUATION_MAP,
      profile,
      device.metadata.numKeys * 4,
    )

    return Array.from({ length: device.metadata.numKeys }, (_, i) => ({
      actuationPoint: response.getUint8(i * 4),
      rtDown: response.getUint8(i * 4 + 1),
      rtUp: response.getUint8(i * 4 + 2),
      continuous: response.getUint8(i * 4 + 3) === 1,
    }))
  },

  async setActuationMap(profile, actuationMap) {
    const device = get()
    const payload = new Uint8Array(
      actuationMap.flatMap(({ actuationPoint, rtDown, rtUp, continuous }) => [
        actuationPoint,
        rtDown,
        rtUp,
        continuous ? 1 : 0,
      ]),
    )

    if (payload.length !== device.metadata.numKeys * 4) {
      throw new Error("Invalid actuation map length")
    }

    await sendRaw(device, DeviceRequest.SET_ACTUATION_MAP, profile, payload)
  },

  async getAdvancedKeys(profile) {
    const device = get()
    const response = await receiveRaw(
      device,
      DeviceRequest.GET_ADVANCED_KEYS,
      profile,
      device.metadata.numAdvancedKeys * 12,
    )
    const advancedKeys: DeviceAdvancedKey[] = Array.from(
      { length: device.metadata.numAdvancedKeys },
      (_, i) => {
        const offset = i * 12
        const layer = response.getUint8(offset)
        const key = response.getUint8(offset + 1)
        const type = response.getUint8(offset + 2)

        switch (type) {
          case DeviceAKType.NULL_BIND:
            return {
              layer,
              key,
              ak: {
                type: DeviceAKType.NULL_BIND,
                secondaryKey: response.getUint8(offset + 3),
                behavior: response.getUint8(offset + 4),
                bottomOutPoint: response.getUint8(offset + 5),
              },
            }

          case DeviceAKType.DYNAMIC_KEYSTROKE:
            return {
              layer,
              key,
              ak: {
                type: DeviceAKType.DYNAMIC_KEYSTROKE,
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

          case DeviceAKType.TAP_HOLD:
            return {
              layer,
              key,
              ak: {
                type: DeviceAKType.TAP_HOLD,
                tapKeycode: response.getUint8(offset + 3),
                holdKeycode: response.getUint8(offset + 4),
                tappingTerm: response.getUint16(offset + 5, true),
              },
            }

          case DeviceAKType.TOGGLE:
            return {
              layer,
              key,
              ak: {
                type: DeviceAKType.TOGGLE,
                keycode: response.getUint8(offset + 3),
                tappingTerm: response.getUint16(offset + 4, true),
              },
            }

          case DeviceAKType.NONE:
          default:
            return { layer, key, ak: { type: DeviceAKType.NONE } }
        }
      },
    )

    return advancedKeys.filter(({ ak }) => ak.type !== DeviceAKType.NONE)
  },

  async setAdvancedKeys(profile, advancedKeys) {
    const device = get()
    const payload = new Uint8Array([
      ...advancedKeys.flatMap(({ layer, key, ak }) => {
        const buffer = [layer, key, ak.type]

        switch (ak.type) {
          case DeviceAKType.NULL_BIND:
            buffer.push(ak.secondaryKey, ak.behavior, ak.bottomOutPoint)
            break

          case DeviceAKType.DYNAMIC_KEYSTROKE:
            buffer.push(
              ...ak.keycodes,
              ...ak.bitmap.map((actions) =>
                actions.reduce((acc, val, i) => acc | (val << (i * 2)), 0),
              ),
              ak.bottomOutPoint,
            )
            break

          case DeviceAKType.TAP_HOLD:
            buffer.push(ak.tapKeycode, ak.holdKeycode)
            buffer.push(
              (ak.tappingTerm >> 0) & 0xff,
              (ak.tappingTerm >> 8) & 0xff,
            )
            break

          case DeviceAKType.TOGGLE:
            buffer.push(ak.keycode)
            buffer.push(
              (ak.tappingTerm >> 0) & 0xff,
              (ak.tappingTerm >> 8) & 0xff,
            )
            break

          case DeviceAKType.NONE:
          default:
            break
        }

        while (buffer.length < 12) {
          buffer.push(0)
        }

        return buffer
      }),
      ...Array(
        (device.metadata.numAdvancedKeys - advancedKeys.length) * 12,
      ).fill(0),
    ])

    if (payload.length !== device.metadata.numAdvancedKeys * 12) {
      throw new Error("Invalid advanced keys length")
    }

    await sendRaw(device, DeviceRequest.SET_ADVANCED_KEYS, profile, payload)
  },

  async getTickRate(profile) {
    const response = await receiveRaw(
      get(),
      DeviceRequest.GET_TICK_RATE,
      profile,
      1,
    )

    return response.getUint8(0)
  },

  async setTickRate(profile, tickRate) {
    await sendRaw(
      get(),
      DeviceRequest.SET_TICK_RATE,
      profile,
      new Uint8Array([tickRate]),
    )
  },
}))
