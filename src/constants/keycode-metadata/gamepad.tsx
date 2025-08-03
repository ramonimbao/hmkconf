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
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Menu,
  StepBack,
  StepForward,
} from "lucide-react"

export const GAMEPAD_KEYCODE_METADATA: KeycodeMetadata[] = [
  {
    id: "Gamepad A",
    tooltip: "Gamepad A",
    display: (
      <>
        <p>GP</p>
        <p>A</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_A,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad B",
    tooltip: "Gamepad B",
    display: (
      <>
        <p>GP</p>
        <p>B</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_B,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad X",
    tooltip: "Gamepad X",
    display: (
      <>
        <p>GP</p>
        <p>X</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_X,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Y",
    tooltip: "Gamepad Y",
    display: (
      <>
        <p>GP</p>
        <p>Y</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_Y,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Up",
    tooltip: "Gamepad Arrow Up",
    display: (
      <>
        <p>GP</p>
        <ArrowUp />
      </>
    ),
    keycode: Keycode.GP_BUTTON_UP,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Down",
    tooltip: "Gamepad Arrow Down",
    display: (
      <>
        <p>GP</p>
        <ArrowDown />
      </>
    ),
    keycode: Keycode.GP_BUTTON_DOWN,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left",
    tooltip: "Gamepad Arrow Left",
    display: (
      <>
        <p>GP</p>
        <ArrowLeft />
      </>
    ),
    keycode: Keycode.GP_BUTTON_LEFT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right",
    tooltip: "Gamepad Arrow Right",
    display: (
      <>
        <p>GP</p>
        <ArrowRight />
      </>
    ),
    keycode: Keycode.GP_BUTTON_RIGHT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Start",
    tooltip: "Gamepad Start",
    display: (
      <>
        <p>GP</p>
        <StepForward />
      </>
    ),
    keycode: Keycode.GP_BUTTON_START,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Back",
    tooltip: "Gamepad Back",
    display: (
      <>
        <p>GP</p>
        <StepBack />
      </>
    ),
    keycode: Keycode.GP_BUTTON_BACK,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Menu",
    tooltip: "Gamepad Menu",
    display: (
      <>
        <p>GP</p>
        <Menu />
      </>
    ),
    keycode: Keycode.GP_BUTTON_HOME,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Joystick Press",
    tooltip: "Gamepad Left Joystick Press",
    display: (
      <>
        <p>LJOY</p>
        <p>PRESS</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_LS,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Joystick Press",
    tooltip: "Gamepad Right Joystick Press",
    display: (
      <>
        <p>RJOY</p>
        <p>PRESS</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_RS,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Bumper",
    tooltip: "Gamepad Left Bumper",
    display: (
      <>
        <p>GP</p>
        <p>LB</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_LB,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Bumper",
    tooltip: "Gamepad Right Bumper",
    display: (
      <>
        <p>GP</p>
        <p>RB</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_RB,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Joystick Up",
    tooltip: "Gamepad Left Joystick Up",
    display: (
      <>
        <p>LJOY</p>
        <ArrowUp />
      </>
    ),
    keycode: Keycode.GP_BUTTON_LS_UP,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Joystick Down",
    tooltip: "Gamepad Left Joystick Down",
    display: (
      <>
        <p>LJOY</p>
        <ArrowDown />
      </>
    ),
    keycode: Keycode.GP_BUTTON_LS_DOWN,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Joystick Left",
    tooltip: "Gamepad Left Joystick Left",
    display: (
      <>
        <p>LJOY</p>
        <ArrowLeft />
      </>
    ),
    keycode: Keycode.GP_BUTTON_LS_LEFT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Joystick Right",
    tooltip: "Gamepad Left Joystick Right",
    display: (
      <>
        <p>LJOY</p>
        <ArrowRight />
      </>
    ),
    keycode: Keycode.GP_BUTTON_LS_RIGHT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Joystick Up",
    tooltip: "Gamepad Right Joystick Up",
    display: (
      <>
        <p>RJOY</p>
        <ArrowUp />
      </>
    ),
    keycode: Keycode.GP_BUTTON_RS_UP,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Joystick Down",
    tooltip: "Gamepad Right Joystick Down",
    display: (
      <>
        <p>RJOY</p>
        <ArrowDown />
      </>
    ),
    keycode: Keycode.GP_BUTTON_RS_DOWN,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Joystick Left",
    tooltip: "Gamepad Right Joystick Left",
    display: (
      <>
        <p>RJOY</p>
        <ArrowLeft />
      </>
    ),
    keycode: Keycode.GP_BUTTON_RS_LEFT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Joystick Right",
    tooltip: "Gamepad Right Joystick Right",
    display: (
      <>
        <p>RJOY</p>
        <ArrowRight />
      </>
    ),
    keycode: Keycode.GP_BUTTON_RS_RIGHT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Left Trigger",
    tooltip: "Gamepad Left Trigger",
    display: (
      <>
        <p>GP</p>
        <p>LT</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_LT,
    webCodes: [],
    category: "Gamepad",
  },
  {
    id: "Gamepad Right Trigger",
    tooltip: "Gamepad Right Trigger",
    display: (
      <>
        <p>GP</p>
        <p>RT</p>
      </>
    ),
    keycode: Keycode.GP_BUTTON_RT,
    webCodes: [],
    category: "Gamepad",
  },
]
