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

export const HE16: DeviceMetadata = deviceMetadataSchema.parse({
  name: "HE16",
  vendorId: 0xab50,
  productId: 0xab16,
  numProfiles: 4,
  numLayers: 4,
  numKeys: 16,
  numAdvancedKeys: 32,
  layout: [
    [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }],
    [{ key: 4 }, { key: 5 }, { key: 6 }, { key: 7 }],
    [{ key: 8 }, { key: 9 }, { key: 10 }, { key: 11 }],
    [{ key: 12 }, { key: 13 }, { key: 14 }, { key: 15 }],
  ],
  defaultKeymap: [
    Array(16).fill(Keycode._______),
    Array(16).fill(Keycode._______),
    Array(16).fill(Keycode._______),
    Array(16).fill(Keycode._______),
  ],
})
