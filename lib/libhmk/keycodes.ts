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

import { Keycode } from "@/types/libhmk/keycodes"

export const MO = (layer: number) => Keycode.SP_MO_MIN | layer
export const MO_GET_LAYER = (keycode: number) => keycode & 0x07

export const PF = (profile: number) => Keycode.SP_PF_MIN | profile
export const PF_GET_PROFILE = (keycode: number) => keycode & 0x07
