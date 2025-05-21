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

import { DeviceMetadata, deviceMetadataSchema } from "@/types/device-metadata"
import { Keycode } from "@/types/keycodes"

export const VALOR: DeviceMetadata = deviceMetadataSchema.parse({
  name: "Valor",
  vendorId: 0xab50,
  productId: 0xabae,
  numProfiles: 4,
  numLayers: 4,
  numKeys: 67,
  numAdvancedKeys: 32,
  layout: [
    [
      { key: 0 },
      { key: 1, x: 0.25 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
      { key: 5 },
      { key: 6 },
      { key: 7 },
      { key: 8, x: 1.5 },
      { key: 9 },
      { key: 10 },
      { key: 11 },
      { key: 12 },
      { key: 13 },
      { key: 15, w: 2 },
      { key: 14 },
      { key: 16 },
    ],
    [
      { key: 17 },
      { key: 18, w: 1.5, x: 0.25 },
      { key: 19 },
      { key: 20 },
      { key: 21 },
      { key: 22 },
      { key: 23 },
      { key: 24, x: 1.5 },
      { key: 25 },
      { key: 26 },
      { key: 27 },
      { key: 28 },
      { key: 29 },
      { key: 30 },
      { key: 31, w: 1.5 },
    ],
    [
      { key: 32 },
      { key: 33, w: 1.75, x: 0.25 },
      { key: 34 },
      { key: 35 },
      { key: 36 },
      { key: 37 },
      { key: 38 },
      { key: 39, x: 1.5 },
      { key: 40 },
      { key: 41 },
      { key: 42 },
      { key: 43 },
      { key: 44 },
      { key: 45, w: 2.25 },
    ],
    [
      { key: 46, w: 2.25, x: 1.25 },
      { key: 47 },
      { key: 48 },
      { key: 49 },
      { key: 50 },
      { key: 51 },
      { key: 52, x: 0.5 },
      { key: 53 },
      { key: 54 },
      { key: 55 },
      { key: 56 },
      { key: 57 },
      { key: 58, w: 1.75 },
      { key: 59 },
    ],
    [
      { key: 60, w: 1.5, x: 1.25 },
      { key: 61, w: 1.5, x: 1 },
      { key: 62, w: 2 },
      { key: 63, w: 1.25 },
      { key: 64, w: 2.75, x: 0.5 },
      { key: 65, w: 1.5 },
      { key: 66, w: 1.5, x: 3 },
    ],
  ],
  defaultKeymap: [
    Array(67).fill(Keycode._______),
    Array(67).fill(Keycode._______),
    Array(67).fill(Keycode._______),
    Array(67).fill(Keycode._______),
  ],
})
