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

import { z } from "zod"

const keyboardLayoutSchema = z.array(
  z.array(
    z.object({
      key: z.number().int().min(0).max(255),
      w: z.number().min(1).default(1),
      h: z.number().min(1).default(1),
      x: z.number().default(0),
      y: z.number().default(0),
    }),
  ),
)

export type KeyboardLayout = z.infer<typeof keyboardLayoutSchema>

export const deviceMetadataSchema = z
  .object({
    name: z.string(),
    vendorId: z.number().int().min(0x0000).max(0xffff),
    productId: z.number().int().min(0x0000).max(0xffff),
    numProfiles: z.number().int().min(1).max(8),
    numLayers: z.number().int().min(1).max(8),
    numKeys: z.number().int().min(1).max(256),
    numAdvancedKeys: z.number().int().min(1).max(64),
    layout: keyboardLayoutSchema,
    defaultKeymap: z.array(z.array(z.number().int().min(0).max(255))),
  })
  .refine(
    (data) =>
      data.defaultKeymap.length === data.numLayers &&
      data.defaultKeymap.every((layer) => layer.length === data.numKeys),
  )

export type DeviceMetadata = z.infer<typeof deviceMetadataSchema>
