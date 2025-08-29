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

import { useKeyboard } from "@/components/providers/keyboard-provider"
import { HMK_VERSION } from "@/constants/libhmk"
import { keyboardConfigSchema } from "@/types/keyboard/config"

export function useKeyboardConfig() {
  const {
    metadata,
    firmwareVersion,
    getKeymap,
    setKeymap,
    getActuationMap,
    setActuationMap,
    getAdvancedKeys,
    setAdvancedKeys,
    getGamepadButtons,
    setGamepadButtons,
    getGamepadOptions,
    setGamepadOptions,
    getTickRate,
    setTickRate,
  } = useKeyboard()

  const schema = keyboardConfigSchema.superRefine((val, ctx) => {
    const { numLayers, numKeys, numAdvancedKeys } = metadata
    const {
      metadata: { version, vendorId, productId },
      profile: { keymap, actuationMap, advancedKeys, gamepadButtons },
    } = val

    if (version > HMK_VERSION) {
      ctx.addIssue({
        code: "custom",
        message: "The firmware version is not supported.",
      })
      return
    }

    if (vendorId !== metadata.vendorId || productId !== metadata.productId) {
      ctx.addIssue({
        code: "custom",
        message: "The config does not match the current keyboard.",
      })
      return
    }

    if (keymap !== undefined) {
      if (keymap.length !== numLayers) {
        ctx.addIssue({
          code: "custom",
          message: `Expected keymap to have exactly ${numLayers} layers.`,
        })
      }
      if (keymap.some((layer) => layer.length !== numKeys)) {
        ctx.addIssue({
          code: "custom",
          message: `Expected ${numKeys} keys for each keymap layer`,
        })
      }
    }

    if (actuationMap !== undefined && actuationMap.length !== numKeys) {
      ctx.addIssue({
        code: "custom",
        message: `Expected actuation map to have exactly ${numKeys} entries.`,
      })
    }

    if (advancedKeys !== undefined && advancedKeys.length !== numAdvancedKeys) {
      ctx.addIssue({
        code: "custom",
        message: `Expected advanced keys to have exactly ${numAdvancedKeys} entries.`,
      })
    }

    if (gamepadButtons !== undefined && gamepadButtons.length !== numKeys) {
      ctx.addIssue({
        code: "custom",
        message: `Expected gamepad buttons to have exactly ${numKeys} entries.`,
      })
    }
  })

  const getKeyboardConfig = async (profile: number) => {
    const { vendorId, productId, numLayers } = metadata

    return schema.parse({
      timestamp: new Date().toISOString(),
      metadata: {
        version: await firmwareVersion(),
        vendorId,
        productId,
      },
      profile: {
        keymap: await Promise.all(
          [...Array(numLayers)].map((_, layer) =>
            getKeymap({ profile, layer }),
          ),
        ),
        actuationMap: await getActuationMap({ profile }),
        advancedKeys: await getAdvancedKeys({ profile }),
        gamepadButtons: await getGamepadButtons({ profile }),
        gamepadOptions: await getGamepadOptions({ profile }),
        tickRate: await getTickRate({ profile }),
      },
    })
  }

  const setKeyboardConfig = async (profile: number, config: unknown) => {
    const { numLayers } = metadata
    const {
      profile: {
        keymap,
        actuationMap,
        advancedKeys,
        gamepadButtons,
        gamepadOptions,
        tickRate,
      },
    } = schema.parse(config)

    if (keymap !== undefined) {
      await Promise.all(
        [...Array(numLayers)].map((_, layer) =>
          setKeymap({ profile, layer, offset: 0, keymap: keymap[layer] }),
        ),
      )
    }

    if (actuationMap !== undefined) {
      await setActuationMap({ profile, offset: 0, actuation: actuationMap })
    }

    if (advancedKeys !== undefined) {
      await setAdvancedKeys({ profile, offset: 0, advancedKeys })
    }

    if (gamepadButtons !== undefined) {
      await setGamepadButtons({ profile, offset: 0, buttons: gamepadButtons })
    }

    if (gamepadOptions !== undefined) {
      await setGamepadOptions({ profile, options: gamepadOptions })
    }

    if (tickRate !== undefined) {
      await setTickRate({ profile, tickRate })
    }
  }

  return { getKeyboardConfig, setKeyboardConfig }
}
