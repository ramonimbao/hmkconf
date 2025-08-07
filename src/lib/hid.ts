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

import { HMK_RAW_HID_EP_SIZE } from "@/constants/libhmk"
import { HMKConnectedDevice } from "@/types/hmk-device"
import { TaskQueue } from "./task-queue"

const taskQueue = new TaskQueue()
const responseQueue: DataView[] = []

export async function setupHIDDevice(device: HMKConnectedDevice) {
  await clearTaskQueue(device)
  device.hidDevice.oninputreport = (e: HIDInputReportEvent) => {
    if (e.data.byteLength === HMK_RAW_HID_EP_SIZE) {
      responseQueue.push(e.data)
    } else {
      console.error(
        `Unexpected input report length: ${e.data.byteLength}, expected ${HMK_RAW_HID_EP_SIZE} bytes`,
      )
    }
  }
}

export async function clearTaskQueue({ hidDevice }: HMKConnectedDevice) {
  hidDevice.oninputreport = null
  await taskQueue.clear()
  responseQueue.length = 0
}

export async function sendCommandReport(
  { hidDevice }: HMKConnectedDevice,
  commandId: number,
  payload?: number[],
  timeout = 4000,
) {
  const buffer = [commandId]

  buffer.push(...(payload ?? []))
  if (buffer.length > HMK_RAW_HID_EP_SIZE) {
    throw new Error(
      `Command report exceeds maximum size of ${HMK_RAW_HID_EP_SIZE} bytes`,
    )
  }
  buffer.push(...Array(HMK_RAW_HID_EP_SIZE - buffer.length).fill(0))

  return taskQueue.enqueue(
    (abortController) =>
      new Promise<DataView>(async (resolve, reject) => {
        try {
          await hidDevice.sendReport(0, new Uint8Array(buffer))
        } catch (error) {
          reject(error)
        }

        const interval = setInterval(() => {
          while (responseQueue.length > 0) {
            const response = responseQueue.shift()
            if (response && response.getUint8(0) === commandId) {
              clearInterval(interval)
              resolve(response)
            }
          }
        }, 10)

        abortController.signal.addEventListener("abort", () => {
          clearInterval(interval)
          reject(new Error("Operation was aborted"))
        })

        setTimeout(() => {
          clearInterval(interval)
          reject(new Error("Operation timed out"))
        }, timeout)
      }),
  )
}
