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

import { Configurator, ConfiguratorState } from "@/types/configurator"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

const initialState: ConfiguratorState = {
  tab: "remap",
  profileNum: 0,
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
    akcIndex: null,
  },
}

export function createConfigurator() {
  return create<Configurator>()(
    immer((set) => ({
      ...initialState,

      reset: () =>
        set((state) => ({
          ...initialState,
          remap: { ...state.remap, ...initialState.remap },
          performance: { ...state.performance, ...initialState.performance },
          advancedKeys: { ...state.advancedKeys, ...initialState.advancedKeys },
        })),
      setTab: (tab) => set({ tab }),
      setProfileNum: (profileNum) =>
        set((state) => ({
          ...state,
          profileNum,
          remap: { ...state.remap, ...initialState.remap },
          performance: { ...state.performance, ...initialState.performance },
          advancedKeys: { ...state.advancedKeys, ...initialState.advancedKeys },
        })),

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
            state.performance.keys = keys
          }),
        setShowKeymap: (showKeymap) =>
          set((state) => {
            state.performance.showKeymap = showKeymap
          }),
      },

      advancedKeys: {
        ...initialState.advancedKeys,

        setLayer: (layer) =>
          set((state) => {
            state.advancedKeys.layer = layer
            state.advancedKeys.akcIndex = null
          }),
        setAKCIndex: (akcIndex) =>
          set((state) => {
            state.advancedKeys.akcIndex = akcIndex
          }),
      },
    })),
  )
}
