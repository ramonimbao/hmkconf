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

  const getDeviceConfig = async () => {
    const firmwareVersion = await device.firmwareVersion()
    const profiles = await Promise.all(
      [...Array(device.metadata.numProfiles)].map(async (_, i) => {
        const keymap = await device.getKeymap(i)
        const actuationMap = await device.getActuationMap(i)
        const advancedKeys = await device.getAdvancedKeys(i)
        const tickRate = await device.getTickRate(i)

        return {
          keymap,
          actuationMap,
          advancedKeys,
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
      profiles,
    }
  }

  const setDeviceConfig = async (config: unknown) => {
    const { metadata, profiles } = schema.parse(config)

    if (
      metadata.vendorId !== device.metadata.vendorId ||
      metadata.productId !== device.metadata.productId
    ) {
      throw new Error(
        "Device metadata does not match the provided configuration.",
      )
    }

    await Promise.all(
      profiles.map(async (profile, i) => {
        const { keymap, actuationMap, advancedKeys, tickRate } = profile

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
