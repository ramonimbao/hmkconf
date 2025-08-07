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
import { HMK_DEVICE_USAGE_ID, HMK_DEVICE_USAGE_PAGE } from "@/constants/libhmk"
import { getActuationMap, setActuationMap } from "@/lib/commands/actuation-map"
import { getAdvancedKeys, setAdvancedKeys } from "@/lib/commands/advanced-keys"
import {
  getGamepadButtons,
  getGamepadOptions,
  setGamepadButtons,
  setGamepadOptions,
} from "@/lib/commands/gamepad"
import {
  analogInfo,
  bootloader,
  factoryReset,
  firmwareVersion,
  getCalibration,
  getOptions,
  getProfile,
  reboot,
  recalibrate,
  setCalibration,
  setOptions,
} from "@/lib/commands/general"
import { getKeymap, setKeymap } from "@/lib/commands/keymap"
import { getTickRate, setTickRate } from "@/lib/commands/tick-rate"
import { clearTaskQueue, setupHIDDevice } from "@/lib/hid"
import { displayUInt16, isWebHIDSupported } from "@/lib/utils"
import {
  HMKConnectedDevice,
  HMKDevice,
  HMKDeviceState,
} from "@/types/hmk-device"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

const initialState: HMKDeviceState = {
  id: "HMK_DEVICE",
  metadata: HE60,
  isDemo: false,
  status: "disconnected",
}

const f = <T extends unknown[], U>(
  get: () => HMKDevice,
  command: (device: HMKConnectedDevice, ...args: T) => U,
): ((...args: T) => U) => {
  return (...args: T) => {
    const device = get()
    if (device.status !== "connected") {
      throw new Error("Device is not connected")
    }
    return command(device, ...args)
  }
}

export const useHMKDevice = create<HMKDevice>()(
  immer((set, get) => ({
    ...initialState,

    async connect() {
      if (!isWebHIDSupported()) {
        throw new Error("WebHID is not supported")
      }

      const hidDevices = (await navigator.hid.getDevices()).filter(
        (device) =>
          device.collections[0].usagePage === HMK_DEVICE_USAGE_PAGE &&
          device.collections[0].usage === HMK_DEVICE_USAGE_ID,
      )

      if (hidDevices.length === 0) {
        hidDevices.push(
          ...(await navigator.hid.requestDevice({
            filters: DEVICE_METADATA.map(({ vendorId, productId }) => ({
              vendorId,
              productId,
              usagePage: HMK_DEVICE_USAGE_PAGE,
              usage: HMK_DEVICE_USAGE_ID,
            })),
          })),
        )
      }

      const hidDevice = hidDevices[0]

      if (!hidDevice) {
        throw new Error("No device selected")
      }

      const metadata = DEVICE_METADATA.find(
        (metadata) =>
          metadata.vendorId === hidDevice.vendorId &&
          metadata.productId === hidDevice.productId,
      )

      if (!metadata) {
        await hidDevice.forget()
        throw new Error("Unsupported device")
      }

      if (!hidDevice.opened) {
        await hidDevice.open()
      }

      const connectedDevice: HMKConnectedDevice = {
        ...initialState,
        id: `HMK_DEVICE:${displayUInt16(hidDevice.vendorId)}_${displayUInt16(hidDevice.productId)}`,
        metadata,
        status: "connected",
        hidDevice,
      }

      navigator.hid.ondisconnect = () => get().disconnect(false)
      await setupHIDDevice(connectedDevice)

      set(connectedDevice)
    },

    async disconnect(forget: boolean) {
      const device = get()
      if (device.status !== "connected") {
        return
      }

      navigator.hid.ondisconnect = null
      await clearTaskQueue(device)

      await device.hidDevice.close()
      if (forget) {
        await device.hidDevice.forget()
      }

      set({ ...initialState })
    },

    firmwareVersion: f(get, firmwareVersion),
    reboot: f(get, reboot),
    bootloader: f(get, bootloader),
    factoryReset: f(get, factoryReset),
    recalibrate: f(get, recalibrate),
    analogInfo: f(get, analogInfo),
    getCalibration: f(get, getCalibration),
    setCalibration: f(get, setCalibration),
    getOptions: f(get, getOptions),
    setOptions: f(get, setOptions),
    getProfile: f(get, getProfile),
    getKeymap: f(get, getKeymap),
    setKeymap: f(get, setKeymap),
    getActuationMap: f(get, getActuationMap),
    setActuationMap: f(get, setActuationMap),
    getAdvancedKeys: f(get, getAdvancedKeys),
    setAdvancedKeys: f(get, setAdvancedKeys),
    getTickRate: f(get, getTickRate),
    setTickRate: f(get, setTickRate),
    getGamepadButtons: f(get, getGamepadButtons),
    setGamepadButtons: f(get, setGamepadButtons),
    getGamepadOptions: f(get, getGamepadOptions),
    setGamepadOptions: f(get, setGamepadOptions),
  })),
)
