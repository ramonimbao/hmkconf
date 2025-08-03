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

import { zodIgnoreOnError } from "@/lib/utils"
import z from "zod"
import {
  deviceActuationSchema,
  deviceAdvancedKeySchema,
  deviceGamepadOptionsSchema,
  deviceOptionsSchema,
} from "./devices"

export const deviceConfigMetadataSchema = z.object({
  vendorId: z.int().min(0x0000).max(0xffff),
  productId: z.int().min(0x0000).max(0xffff),
  firmwareVersion: z.int().min(0x0000).max(0xffff),
})

export type DeviceConfigMetadata = z.infer<typeof deviceConfigMetadataSchema>

export const deviceConfigProfileSchema = z.object({
  keymap: zodIgnoreOnError(z.array(z.array(z.int().min(0).max(255)))),
  actuationMap: zodIgnoreOnError(z.array(deviceActuationSchema)),
  advancedKeys: zodIgnoreOnError(z.array(deviceAdvancedKeySchema)),
  gamepadButtons: zodIgnoreOnError(z.array(z.int().min(0).max(255))),
  gamepadOptions: zodIgnoreOnError(deviceGamepadOptionsSchema),
  tickRate: zodIgnoreOnError(z.int().min(0).max(255).optional()),
})

export type DeviceConfigProfile = z.infer<typeof deviceConfigProfileSchema>

export const deviceConfigSchema = z.object({
  timestamp: z.iso.date(),
  metadata: deviceConfigMetadataSchema,
  options: zodIgnoreOnError(deviceOptionsSchema),
  profiles: z.array(deviceConfigProfileSchema),
})

export type DeviceConfig = z.infer<typeof deviceConfigSchema>
