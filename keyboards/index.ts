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

import { keyboardMetadataSchema } from "@/types/keyboard/metadata"

import HE16 from "./HE16.json"
import HE60 from "./HE60.json"
import M256_WHE from "./M256-WHE.json"

export const KEYBOARD_METADATA = [HE16, HE60, M256_WHE].map((metadata) =>
  keyboardMetadataSchema.parse(metadata),
)
