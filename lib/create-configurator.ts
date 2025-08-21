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

import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import { Configurator, ConfiguratorState } from "@/types/configurator"
import { HMKAKType } from "@/types/libhmk"

import { getAdvancedKeyMetadata } from "./advanced-keys"

const initialState: ConfiguratorState = {
  global: {
    tab: "remap",
    profile: 0,
  },
  remap: {
    layer: 0,
    key: null,
  },
  performance: {
    keys: [],
    showKeymap: false,
  },
  advancedKeys: {
    layer: 0,
    index: null,
    newType: HMKAKType.NONE,
    keyIndex: null,
    keys: [],
  },
  gamepad: {
    key: null,
    tab: "setup",
  },
}

export function createConfigurator() {
  return create<Configurator>()(
    immer((set, _, store) => ({
      ...initialState,

      global: {
        ...initialState.global,
        reset: () => set(store.getInitialState()),
        setTab: (tab) =>
          set((state) => {
            state.global.tab = tab
          }),
        setProfile: (profile) =>
          set((state) => ({
            ...store.getInitialState(),
            global: { tab: state.global.tab, profile },
          })),
      },

      remap: {
        ...initialState.remap,
        setLayer: (layer) =>
          set((state) => {
            state.remap.layer = layer
            state.remap.key = null
          }),
        setKey: (key) =>
          set((state) => {
            state.remap.key = key
          }),
      },

      performance: {
        ...initialState.performance,
        setKeys: (keys) =>
          set((state) => {
            if (typeof keys === "function") {
              state.performance.keys = keys(state.performance.keys)
            } else {
              state.performance.keys = keys
            }
          }),
        setShowKeymap: (show) =>
          set((state) => {
            state.performance.showKeymap = show
          }),
      },

      advancedKeys: {
        ...initialState.advancedKeys,
        setLayer: (layer) =>
          set((state) => {
            state.advancedKeys.layer = layer
            state.advancedKeys.index = null
          }),
        setIndex: (index) =>
          set((state) => {
            state.advancedKeys.index = index
          }),
        setNewType: (newType) =>
          set((state) => {
            state.advancedKeys.newType = newType
            if (newType === HMKAKType.NONE) {
              state.advancedKeys.keyIndex = null
              state.advancedKeys.keys = []
            } else {
              state.advancedKeys.keyIndex = 0
              state.advancedKeys.keys = Array(
                getAdvancedKeyMetadata(newType).numKeys,
              ).fill(null)
            }
          }),
        setKeyIndex: (keyIndex) =>
          set((state) => {
            state.advancedKeys.keyIndex = keyIndex
            if (state.advancedKeys.keys[keyIndex] !== null) {
              state.advancedKeys.keys[keyIndex] = null
            }
          }),
        setKey: (key) =>
          set((state) => {
            const index = state.advancedKeys.keys.indexOf(key)
            if (index !== -1) {
              state.advancedKeys.keys[index] = null
              state.advancedKeys.keyIndex = index
            } else if (state.advancedKeys.keyIndex !== null) {
              state.advancedKeys.keys[state.advancedKeys.keyIndex] = key

              const nextNullIndex = state.advancedKeys.keys.indexOf(null)
              state.advancedKeys.keyIndex =
                nextNullIndex !== -1 ? nextNullIndex : null
            }
          }),
      },

      gamepad: {
        ...initialState.gamepad,
        setKey: (key) =>
          set((state) => {
            state.gamepad.key = key
          }),
        setTab: (tab) =>
          set((state) => {
            state.gamepad.tab = tab
          }),
      },
    })),
  )
}
