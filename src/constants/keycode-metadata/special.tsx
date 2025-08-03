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

import { Keycode, KeycodeMetadata } from "@/types/keycodes"
import {
  AlarmClock,
  ArrowBigLeft,
  ArrowBigRight,
  Bookmark,
  Calculator,
  Earth,
  FolderClosed,
  Grid3X3,
  LayoutDashboard,
  Mail,
  Moon,
  Music,
  Play,
  Power,
  RefreshCw,
  Search,
  SkipBack,
  SkipForward,
  Square,
  Sun,
  SunDim,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react"

export const SPECIAL_KEYCODE_METADATA: KeycodeMetadata[] = [
  {
    id: "Sys Power",
    tooltip: "System Power",
    display: <Power />,
    keycode: Keycode.KC_SYSTEM_POWER,
    webCodes: ["Power"],
    category: "Special",
  },
  {
    id: "Sys Sleep",
    tooltip: "System Sleep",
    display: <Moon />,
    keycode: Keycode.KC_SYSTEM_SLEEP,
    webCodes: ["Sleep"],
    category: "Special",
  },
  {
    id: "Sys Wake",
    tooltip: "System Wake",
    display: <AlarmClock />,
    keycode: Keycode.KC_SYSTEM_WAKE,
    webCodes: ["WakeUp"],
    category: "Special",
  },
  {
    id: "Mute",
    tooltip: "Mute Audio",
    display: <VolumeOff />,
    keycode: Keycode.KC_AUDIO_MUTE,
    webCodes: ["AudioVolumeMute", "VolumeMute"],
    category: "Special",
  },
  {
    id: "Vol +",
    tooltip: "Volume Up",
    display: <Volume2 />,
    keycode: Keycode.KC_AUDIO_VOL_UP,
    webCodes: ["AudioVolumeUp", "VolumeUp"],
    category: "Special",
  },
  {
    id: "Vol -",
    tooltip: "Volume Down",
    display: <Volume1 />,
    keycode: Keycode.KC_AUDIO_VOL_DOWN,
    webCodes: ["AudioVolumeDown", "VolumeDown"],
    category: "Special",
  },
  {
    id: "Next",
    tooltip: "Media Next",
    display: <SkipForward />,
    keycode: Keycode.KC_MEDIA_NEXT_TRACK,
    webCodes: ["MediaTrackNext"],
    category: "Special",
  },
  {
    id: "Prev",
    tooltip: "Media Previous",
    display: <SkipBack />,
    keycode: Keycode.KC_MEDIA_PREV_TRACK,
    webCodes: ["MediaTrackPrevious"],
    category: "Special",
  },
  {
    id: "Stop",
    tooltip: "Media Stop",
    display: <Square />,
    keycode: Keycode.KC_MEDIA_STOP,
    webCodes: ["MediaStop"],
    category: "Special",
  },
  {
    id: "Play",
    tooltip: "Media Play/Pause",
    display: <Play />,
    keycode: Keycode.KC_MEDIA_PLAY_PAUSE,
    webCodes: ["MediaPlayPause"],
    category: "Special",
  },
  {
    id: "Media Player",
    tooltip: "Open Media Player",
    display: <Music />,
    keycode: Keycode.KC_MEDIA_SELECT,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mail",
    tooltip: "Open Mail",
    display: <Mail />,
    keycode: Keycode.KC_MAIL,
    webCodes: ["LaunchMail"],
    category: "Special",
  },
  {
    id: "Calculator",
    tooltip: "Open Calculator",
    display: <Calculator />,
    keycode: Keycode.KC_CALCULATOR,
    webCodes: [],
    category: "Special",
  },
  {
    id: "File",
    tooltip: "Open File Browser",
    display: <FolderClosed />,
    keycode: Keycode.KC_MY_COMPUTER,
    webCodes: [],
    category: "Special",
  },
  {
    id: "WWW Search",
    tooltip: "Browser Search",
    display: <Search />,
    keycode: Keycode.KC_WWW_SEARCH,
    webCodes: ["BrowserSearch"],
    category: "Special",
  },
  {
    id: "WWW Home",
    tooltip: "Open Browser",
    display: <Earth />,
    keycode: Keycode.KC_WWW_HOME,
    webCodes: ["BrowserHome"],
    category: "Special",
  },
  {
    id: "WWW Back",
    tooltip: "Browser Back",
    display: <ArrowBigLeft />,
    keycode: Keycode.KC_WWW_BACK,
    webCodes: ["BrowserBack"],
    category: "Special",
  },
  {
    id: "WWW Forward",
    tooltip: "Browser Forward",
    display: <ArrowBigRight />,
    keycode: Keycode.KC_WWW_FORWARD,
    webCodes: ["BrowserForward"],
    category: "Special",
  },
  {
    id: "WWW Refresh",
    tooltip: "Browser Refresh",
    display: <RefreshCw />,
    keycode: Keycode.KC_WWW_REFRESH,
    webCodes: ["BrowserRefresh"],
    category: "Special",
  },
  {
    id: "WWW Favorites",
    tooltip: "Browser Favorites",
    display: <Bookmark />,
    keycode: Keycode.KC_WWW_FAVORITES,
    webCodes: ["BrowserFavorites"],
    category: "Special",
  },
  {
    id: "Brightness +",
    tooltip: "Increase Screen Brightness",
    display: <Sun />,
    keycode: Keycode.KC_BRIGHTNESS_UP,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Brightness -",
    tooltip: "Decrease Screen Brightness",
    display: <SunDim />,
    keycode: Keycode.KC_BRIGHTNESS_DOWN,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mission Control",
    tooltip: "Open macOS Mission Control",
    display: <LayoutDashboard />,
    keycode: Keycode.KC_MISSION_CONTROL,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Launchpad",
    tooltip: "Open macOS Launchpad",
    display: <Grid3X3 />,
    keycode: Keycode.KC_LAUNCHPAD,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mouse L",
    tooltip: "Mouse Button Left",
    display: (
      <>
        <p>Mouse</p>
        <p>L</p>
      </>
    ),
    keycode: Keycode.SP_MOUSE_BUTTON_1,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mouse R",
    tooltip: "Mouse Button Right",
    display: (
      <>
        <p>Mouse</p>
        <p>R</p>
      </>
    ),
    keycode: Keycode.SP_MOUSE_BUTTON_2,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mouse M",
    tooltip: "Mouse Button Middle",
    display: (
      <>
        <p>Mouse</p>
        <p>M</p>
      </>
    ),
    keycode: Keycode.SP_MOUSE_BUTTON_3,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mouse 4",
    tooltip: "Mouse Button 4",
    display: (
      <>
        <p>Mouse</p>
        <p>4</p>
      </>
    ),
    keycode: Keycode.SP_MOUSE_BUTTON_4,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Mouse 5",
    tooltip: "Mouse Button 5",
    display: (
      <>
        <p>Mouse</p>
        <p>5</p>
      </>
    ),
    keycode: Keycode.SP_MOUSE_BUTTON_5,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Key Lock",
    tooltip: "Toggle disabling of the same key in layer 0",
    display: (
      <>
        <p>Key</p>
        <p>Lock</p>
      </>
    ),
    keycode: Keycode.SP_KEY_LOCK,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Layer Lock",
    tooltip: "Toggle default layer between layer 0 and the current layer",
    display: (
      <>
        <p>Layer</p>
        <p>Lock</p>
      </>
    ),
    keycode: Keycode.SP_LAYER_LOCK,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Profile Swap",
    tooltip: "Toggle between profile 0 and the last non-zero profile",
    display: (
      <>
        <p>PF</p>
        <p>Swap</p>
      </>
    ),
    keycode: Keycode.SP_PROFILE_SWAP,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Profile Cycle",
    tooltip: "Cycle through all profiles",
    display: (
      <>
        <p>PF</p>
        <p>Cycle</p>
      </>
    ),
    keycode: Keycode.SP_PROFILE_NEXT,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Enter Bootloader",
    tooltip: "Enter bootloader mode",
    display: "Boot",
    keycode: Keycode.SP_BOOT,
    webCodes: [],
    category: "Special",
  },
]
