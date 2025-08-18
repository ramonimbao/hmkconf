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

import z from "zod"

import {
  MAX_NUM_ADVANCED_KEYS,
  MAX_NUM_KEYS,
  MAX_NUM_LAYERS,
  MAX_NUM_PROFILES,
} from "@/constants/libhmk"
import { MO, PF } from "@/lib/libhmk/keycodes"

import { uint8Schema, uint16Schema } from "../common/integer"
import { Keycode } from "../libhmk/keycodes"

const uint16HexSchema = z.union([
  z
    .string()
    .regex(/0x[0-9a-fA-F]{4}/, {
      error: `Invalid hexadecimal string. Expected format: 0xXXXX`,
    })
    .transform((val) => parseInt(val, 16)),
  uint16Schema,
])

const keycodeSchema = z.union([
  z.string().transform((val, ctx) => {
    const moKeycode = val.match(/^MO\((\d+\))$/)
    if (moKeycode) {
      return MO(parseInt(moKeycode[1]))
    }

    const pfKeycode = val.match(/^PF\((\d+\))$/)
    if (pfKeycode) {
      return PF(parseInt(pfKeycode[1]))
    }

    if (!Object.keys(Keycode).includes(val)) {
      ctx.addIssue({
        code: "custom",
        message: `Unknown keycode: ${val}`,
        input: val,
      })

      return z.NEVER
    }

    return Keycode[val as keyof typeof Keycode]
  }),
  uint8Schema,
])

const keyboardLayoutSchema = z.array(
  z.array(
    z.object({
      key: uint8Schema,
      w: z.number().min(1).default(1),
      h: z.number().min(1).default(1),
      x: z.number().default(0),
      y: z.number().default(0),
    }),
  ),
)

export type KeyboardLayout = z.infer<typeof keyboardLayoutSchema>

export const keyboardMetadataSchema = z
  .object({
    name: z.string(),
    vendorId: uint16HexSchema,
    productId: uint16HexSchema,

    adcBits: z.int().min(1).max(16),
    numProfiles: z.int().min(1).max(MAX_NUM_PROFILES),
    numLayers: z.int().min(1).max(MAX_NUM_LAYERS),
    numKeys: z.int().min(1).max(MAX_NUM_KEYS),
    numAdvancedKeys: z.int().min(1).max(MAX_NUM_ADVANCED_KEYS),

    layout: keyboardLayoutSchema,
    defaultKeymap: z.array(z.array(keycodeSchema)),
  })
  .superRefine((val, ctx) => {
    if (val.defaultKeymap.length !== val.numLayers) {
      ctx.addIssue({
        code: "custom",
        message: `Expected defaultKeymap to have ${val.numLayers} layers`,
      })
    }

    if (val.defaultKeymap.some((layer) => layer.length !== val.numKeys)) {
      ctx.addIssue({
        code: "custom",
        message: `Expected defaultKeymap layers to have ${val.numKeys} keys`,
      })
    }
  })

export type KeyboardMetadata = z.infer<typeof keyboardMetadataSchema>
