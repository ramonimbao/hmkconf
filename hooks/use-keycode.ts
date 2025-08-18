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

import { useMemo } from "react"

import { useKeyboard } from "@/components/providers/keyboard-provider"
import { KEYCODE_METADATA } from "@/constants/keycodes"
import {
  getLayerKeycodeMetadata,
  getProfileKeycodeMetadata,
  getUnknownKeycodeMetadata,
} from "@/lib/keycodes"
import { MO, PF } from "@/lib/libhmk/keycodes"
import { KeycodeCategory, KeycodeMetadata } from "@/types/keycodes"
import { Keycode } from "@/types/libhmk/keycodes"

export function useKeycode() {
  const {
    metadata: { numProfiles, numLayers },
  } = useKeyboard()

  const categorizedKeycodes = useMemo<[KeycodeCategory, Keycode[]][]>(
    () => [
      [
        "Basic",
        [
          Keycode.KC_A,
          Keycode.KC_B,
          Keycode.KC_C,
          Keycode.KC_D,
          Keycode.KC_E,
          Keycode.KC_F,
          Keycode.KC_G,
          Keycode.KC_H,
          Keycode.KC_I,
          Keycode.KC_J,
          Keycode.KC_K,
          Keycode.KC_L,
          Keycode.KC_M,
          Keycode.KC_N,
          Keycode.KC_O,
          Keycode.KC_P,
          Keycode.KC_Q,
          Keycode.KC_R,
          Keycode.KC_S,
          Keycode.KC_T,
          Keycode.KC_U,
          Keycode.KC_V,
          Keycode.KC_W,
          Keycode.KC_X,
          Keycode.KC_Y,
          Keycode.KC_Z,
          Keycode.KC_1,
          Keycode.KC_2,
          Keycode.KC_3,
          Keycode.KC_4,
          Keycode.KC_5,
          Keycode.KC_6,
          Keycode.KC_7,
          Keycode.KC_8,
          Keycode.KC_9,
          Keycode.KC_0,
          Keycode.KC_GRAVE,
          Keycode.KC_MINUS,
          Keycode.KC_EQUAL,
          Keycode.KC_LEFT_BRACKET,
          Keycode.KC_RIGHT_BRACKET,
          Keycode.KC_BACKSLASH,
          Keycode.KC_SEMICOLON,
          Keycode.KC_QUOTE,
          Keycode.KC_COMMA,
          Keycode.KC_DOT,
          Keycode.KC_SLASH,
          Keycode.KC_NONUS_HASH,
          Keycode.KC_NONUS_BACKSLASH,
        ],
      ],
      [
        "Extended",
        [
          Keycode.KC_NO,
          Keycode.KC_TRANSPARENT,
          Keycode.KC_ESCAPE,
          Keycode.KC_TAB,
          Keycode.KC_CAPS_LOCK,
          Keycode.KC_BACKSPACE,
          Keycode.KC_ENTER,
          Keycode.KC_SPACE,
          Keycode.KC_LEFT_CTRL,
          Keycode.KC_RIGHT_CTRL,
          Keycode.KC_LEFT_SHIFT,
          Keycode.KC_RIGHT_SHIFT,
          Keycode.KC_LEFT_ALT,
          Keycode.KC_RIGHT_ALT,
          Keycode.KC_LEFT_GUI,
          Keycode.KC_RIGHT_GUI,
          Keycode.KC_APPLICATION,
          Keycode.KC_LANGUAGE_1,
          Keycode.KC_LANGUAGE_2,
          Keycode.KC_LANGUAGE_3,
          Keycode.KC_LANGUAGE_4,
          Keycode.KC_LANGUAGE_5,
          Keycode.KC_INTERNATIONAL_1,
          Keycode.KC_INTERNATIONAL_2,
          Keycode.KC_INTERNATIONAL_3,
          Keycode.KC_INTERNATIONAL_4,
          Keycode.KC_INTERNATIONAL_5,
          Keycode.KC_INTERNATIONAL_6,
          Keycode.KC_LEFT,
          Keycode.KC_RIGHT,
          Keycode.KC_DOWN,
          Keycode.KC_UP,
          Keycode.KC_PRINT_SCREEN,
          Keycode.KC_SCROLL_LOCK,
          Keycode.KC_PAUSE,
          Keycode.KC_HOME,
          Keycode.KC_END,
          Keycode.KC_INSERT,
          Keycode.KC_DELETE,
          Keycode.KC_PAGE_UP,
          Keycode.KC_PAGE_DOWN,
          Keycode.KC_F1,
          Keycode.KC_F2,
          Keycode.KC_F3,
          Keycode.KC_F4,
          Keycode.KC_F5,
          Keycode.KC_F6,
          Keycode.KC_F7,
          Keycode.KC_F8,
          Keycode.KC_F9,
          Keycode.KC_F10,
          Keycode.KC_F11,
          Keycode.KC_F12,
          Keycode.KC_F13,
          Keycode.KC_F14,
          Keycode.KC_F15,
          Keycode.KC_F16,
          Keycode.KC_F17,
          Keycode.KC_F18,
          Keycode.KC_F19,
          Keycode.KC_F20,
          Keycode.KC_F21,
          Keycode.KC_F22,
          Keycode.KC_F23,
          Keycode.KC_F24,
          Keycode.KC_NUM_LOCK,
          Keycode.KC_KP_1,
          Keycode.KC_KP_2,
          Keycode.KC_KP_3,
          Keycode.KC_KP_4,
          Keycode.KC_KP_5,
          Keycode.KC_KP_6,
          Keycode.KC_KP_7,
          Keycode.KC_KP_8,
          Keycode.KC_KP_9,
          Keycode.KC_KP_0,
          Keycode.KC_KP_SLASH,
          Keycode.KC_KP_DOT,
          Keycode.KC_KP_ASTERISK,
          Keycode.KC_KP_MINUS,
          Keycode.KC_KP_PLUS,
          Keycode.KC_KP_ENTER,
        ],
      ],
      [
        "Special",
        [
          Keycode.KC_MAIL,
          Keycode.KC_CALCULATOR,
          Keycode.KC_MY_COMPUTER,
          Keycode.KC_WWW_SEARCH,
          Keycode.KC_WWW_HOME,
          Keycode.KC_WWW_BACK,
          Keycode.KC_WWW_FORWARD,
          Keycode.KC_WWW_REFRESH,
          Keycode.KC_WWW_FAVORITES,
          Keycode.KC_SYSTEM_POWER,
          Keycode.KC_SYSTEM_SLEEP,
          Keycode.KC_SYSTEM_WAKE,
          Keycode.KC_MISSION_CONTROL,
          Keycode.KC_LAUNCHPAD,
          Keycode.KC_BRIGHTNESS_DOWN,
          Keycode.KC_BRIGHTNESS_UP,
          Keycode.SP_KEY_LOCK,
          ...[...Array(numLayers)].map((_, i) => MO(i)),
          Keycode.SP_LAYER_LOCK,
          Keycode.SP_BOOT,
        ],
      ],
      [
        "Profiles",
        [
          ...[...Array(numProfiles)].map((_, i) => PF(i)),
          Keycode.SP_PROFILE_SWAP,
          Keycode.SP_PROFILE_NEXT,
        ],
      ],
      [
        "Media",
        [
          Keycode.KC_MEDIA_SELECT,
          Keycode.KC_MEDIA_PREV_TRACK,
          Keycode.KC_MEDIA_PLAY_PAUSE,
          Keycode.KC_MEDIA_STOP,
          Keycode.KC_MEDIA_NEXT_TRACK,
          Keycode.KC_AUDIO_MUTE,
          Keycode.KC_AUDIO_VOL_DOWN,
          Keycode.KC_AUDIO_VOL_UP,
        ],
      ],
      [
        "Mouse",
        [
          Keycode.SP_MOUSE_BUTTON_1,
          Keycode.SP_MOUSE_BUTTON_2,
          Keycode.SP_MOUSE_BUTTON_3,
          Keycode.SP_MOUSE_BUTTON_4,
          Keycode.SP_MOUSE_BUTTON_5,
        ],
      ],
    ],
    [numLayers, numProfiles],
  )

  const keycodeToMetadata = useMemo<Record<number, KeycodeMetadata>>(
    () =>
      [
        ...KEYCODE_METADATA,
        ...[...Array(numLayers)].map((_, i) => getLayerKeycodeMetadata(i)),
        ...[...Array(numProfiles)].map((_, i) => getProfileKeycodeMetadata(i)),
      ].reduce(
        (acc, metadata) => ({ ...acc, [metadata.keycode]: metadata }),
        {},
      ),
    [numLayers, numProfiles],
  )

  const getKeycodeMetadata = (keycode: number) =>
    keycode in keycodeToMetadata
      ? keycodeToMetadata[keycode]
      : getUnknownKeycodeMetadata(keycode)

  return { categorizedKeycodes, getKeycodeMetadata }
}
