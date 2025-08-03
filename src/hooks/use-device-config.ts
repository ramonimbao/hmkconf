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

import { useDevice } from "@/components/providers/device-provider"
import { deviceConfigSchema } from "@/types/device-config"
import { useQueryClient } from "@tanstack/react-query"

export function useDeviceConfig() {
  const device = useDevice()

  const queryClient = useQueryClient()

  const schema = deviceConfigSchema
    .refine(
      (data) =>
        data.metadata.vendorId === device.metadata.vendorId &&
        data.metadata.productId === device.metadata.productId,
      {
        error: "Device metadata does not match the provided configuration.",
      },
    )
    .refine((data) => data.profiles.length === device.metadata.numProfiles, {
      error: `Expected ${device.metadata.numProfiles} profiles`,
    })
    .refine(
      (data) =>
        data.profiles.every(({ keymap }) =>
          keymap
            ? keymap.length === device.metadata.numLayers &&
              keymap.every((layer) => layer.length === device.metadata.numKeys)
            : true,
        ),
      {
        error: `Expected keymap to have ${device.metadata.numLayers} layers and each layer to have ${device.metadata.numKeys} keys`,
      },
    )
    .refine(
      (data) =>
        data.profiles.every(({ actuationMap }) =>
          actuationMap ? actuationMap.length === device.metadata.numKeys : true,
        ),
      {
        error: `Expected actuationMap to have ${device.metadata.numKeys} keys`,
      },
    )
    .refine(
      (data) =>
        data.profiles.every(({ advancedKeys }) =>
          advancedKeys
            ? advancedKeys.length === device.metadata.numAdvancedKeys
            : true,
        ),
      {
        error: `Expected advancedKeys to have ${device.metadata.numAdvancedKeys} keys`,
      },
    )
    .refine(
      (data) =>
        data.profiles.every(({ gamepadButtons }) =>
          gamepadButtons
            ? gamepadButtons.length === device.metadata.numKeys
            : true,
        ),
      {
        error: `Expected gamepadButtons to have ${device.metadata.numKeys} buttons`,
      },
    )

  const getDeviceConfig = async () => {
    const firmwareVersion = await device.firmwareVersion()
    const options = await device.getOptions()
    const profiles = await Promise.all(
      [...Array(device.metadata.numProfiles)].map(async (_, i) => {
        const keymap = await device.getKeymap(i)
        const actuationMap = await device.getActuationMap(i)
        const advancedKeys = await device.getAdvancedKeys(i)
        const gamepadButtons = await device.getGamepadButtons(i)
        const gamepadOptions = await device.getGamepadOptions(i)
        const tickRate = await device.getTickRate(i)

        return {
          keymap,
          actuationMap,
          advancedKeys,
          gamepadButtons,
          gamepadOptions,
          tickRate,
        }
      }),
    )

    return {
      timestamp: new Date().toISOString().split("T")[0],
      metadata: {
        vendorId: device.metadata.vendorId,
        productId: device.metadata.productId,
        firmwareVersion,
      },
      options,
      profiles,
    }
  }

  const setDeviceConfig = async (config: unknown) => {
    const { options, profiles } = schema.parse(config)

    if (options) {
      await device.setOptions(options)
      await queryClient.invalidateQueries({
        queryKey: [device.id, "options"],
      })
    }

    await Promise.all(
      profiles.map(async (profile, i) => {
        const {
          keymap,
          actuationMap,
          advancedKeys,
          gamepadButtons,
          gamepadOptions,
          tickRate,
        } = profile

        if (keymap) {
          await Promise.all(
            [...Array(device.metadata.numLayers)].map(async (_, layer) =>
              device.setKeymap(i, layer, 0, keymap[layer]),
            ),
          )
          await queryClient.invalidateQueries({
            queryKey: [device.id, i, "keymap"],
          })
        }

        if (actuationMap) {
          await device.setActuationMap(i, 0, actuationMap)
          await queryClient.invalidateQueries({
            queryKey: [device.id, i, "actuationMap"],
          })
        }

        if (advancedKeys) {
          await device.setAdvancedKeys(i, 0, advancedKeys)
          await queryClient.invalidateQueries({
            queryKey: [device.id, i, "advancedKeys"],
          })
        }

        if (gamepadButtons) {
          await device.setGamepadButtons(i, 0, gamepadButtons)
          await queryClient.invalidateQueries({
            queryKey: [device.id, i, "gamepadButtons"],
          })
        }

        if (gamepadOptions) {
          await device.setGamepadOptions(i, gamepadOptions)
          await queryClient.invalidateQueries({
            queryKey: [device.id, i, "gamepadOptions"],
          })
        }

        if (tickRate !== undefined) {
          await device.setTickRate(i, tickRate)
          await queryClient.invalidateQueries({
            queryKey: [device.id, i, "tickRate"],
          })
        }
      }),
    )
  }

  return { getDeviceConfig, setDeviceConfig }
}
