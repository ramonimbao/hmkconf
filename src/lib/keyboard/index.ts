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

import { Context } from "runed"
import type { KeyboardMetadata } from "./metadata"

type GetProfileParams = { profile: number }
type SetProfileParams<T> = { profile: number; offset: number; data: T[] }

export type GetKeymapParams = GetProfileParams
export type SetKeymapParams = SetProfileParams<number> & { layer: number }

export type KeyboardState = {
  id: string
  metadata: KeyboardMetadata
  demo: boolean
}

export type KeyboardAction = {
  disconnect(): Promise<void>
  forget(): Promise<void>

  getProfile(): Promise<number>

  getKeymap(params: GetKeymapParams): Promise<number[][]>
  setKeymap(params: SetKeymapParams): Promise<void>
}

export type Keyboard = KeyboardState & KeyboardAction

export const keyboardContext = new Context<Keyboard>("hmk-keyboard")
