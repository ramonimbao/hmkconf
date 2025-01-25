import { Keycode, KeycodeMetadata } from "@/types/keycodes"
import {
  AlarmClock,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  Calculator,
  CircleDashed,
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

export const KEYCODE_CATEGORIES = [
  "Basic",
  "Extended",
  "Special",
  "AKC",
] as const

export const KEYCODE_METADATA: KeycodeMetadata[] = [
  {
    id: " ",
    tooltip: "Ignore this key",
    keycode: Keycode.KC_NO,
    webCodes: [],
    category: "Extended",
  },
  {
    id: "∇",
    tooltip: "Fallback to the highest active layer with a non-transparent key",
    display: <CircleDashed />,
    keycode: Keycode.KC_TRANSPARENT,
    webCodes: [],
    category: "Extended",
  },
  {
    id: "A",
    keycode: Keycode.KC_A,
    webCodes: ["KeyA"],
    category: "Basic",
  },
  {
    id: "B",
    keycode: Keycode.KC_B,
    webCodes: ["KeyB"],
    category: "Basic",
  },
  {
    id: "C",
    keycode: Keycode.KC_C,
    webCodes: ["KeyC"],
    category: "Basic",
  },
  {
    id: "D",
    keycode: Keycode.KC_D,
    webCodes: ["KeyD"],
    category: "Basic",
  },
  {
    id: "E",
    keycode: Keycode.KC_E,
    webCodes: ["KeyE"],
    category: "Basic",
  },
  {
    id: "F",
    keycode: Keycode.KC_F,
    webCodes: ["KeyF"],
    category: "Basic",
  },
  {
    id: "G",
    keycode: Keycode.KC_G,
    webCodes: ["KeyG"],
    category: "Basic",
  },
  {
    id: "H",
    keycode: Keycode.KC_H,
    webCodes: ["KeyH"],
    category: "Basic",
  },
  {
    id: "I",
    keycode: Keycode.KC_I,
    webCodes: ["KeyI"],
    category: "Basic",
  },
  {
    id: "J",
    keycode: Keycode.KC_J,
    webCodes: ["KeyJ"],
    category: "Basic",
  },
  {
    id: "K",
    keycode: Keycode.KC_K,
    webCodes: ["KeyK"],
    category: "Basic",
  },
  {
    id: "L",
    keycode: Keycode.KC_L,
    webCodes: ["KeyL"],
    category: "Basic",
  },
  {
    id: "M",
    keycode: Keycode.KC_M,
    webCodes: ["KeyM"],
    category: "Basic",
  },
  {
    id: "N",
    keycode: Keycode.KC_N,
    webCodes: ["KeyN"],
    category: "Basic",
  },
  {
    id: "O",
    keycode: Keycode.KC_O,
    webCodes: ["KeyO"],
    category: "Basic",
  },
  {
    id: "P",
    keycode: Keycode.KC_P,
    webCodes: ["KeyP"],
    category: "Basic",
  },
  {
    id: "Q",
    keycode: Keycode.KC_Q,
    webCodes: ["KeyQ"],
    category: "Basic",
  },
  {
    id: "R",
    keycode: Keycode.KC_R,
    webCodes: ["KeyR"],
    category: "Basic",
  },
  {
    id: "S",
    keycode: Keycode.KC_S,
    webCodes: ["KeyS"],
    category: "Basic",
  },
  {
    id: "T",
    keycode: Keycode.KC_T,
    webCodes: ["KeyT"],
    category: "Basic",
  },
  {
    id: "U",
    keycode: Keycode.KC_U,
    webCodes: ["KeyU"],
    category: "Basic",
  },
  {
    id: "V",
    keycode: Keycode.KC_V,
    webCodes: ["KeyV"],
    category: "Basic",
  },
  {
    id: "W",
    keycode: Keycode.KC_W,
    webCodes: ["KeyW"],
    category: "Basic",
  },
  {
    id: "X",
    keycode: Keycode.KC_X,
    webCodes: ["KeyX"],
    category: "Basic",
  },
  {
    id: "Y",
    keycode: Keycode.KC_Y,
    webCodes: ["KeyY"],
    category: "Basic",
  },
  {
    id: "Z",
    keycode: Keycode.KC_Z,
    webCodes: ["KeyZ"],
    category: "Basic",
  },
  {
    id: "1!",
    display: (
      <>
        <p>!</p>
        <p>1</p>
      </>
    ),
    keycode: Keycode.KC_1,
    webCodes: ["Digit1"],
    category: "Basic",
  },
  {
    id: "2@",
    display: (
      <>
        <p>@</p>
        <p>2</p>
      </>
    ),
    keycode: Keycode.KC_2,
    webCodes: ["Digit2"],
    category: "Basic",
  },
  {
    id: "3#",
    display: (
      <>
        <p>#</p>
        <p>3</p>
      </>
    ),
    keycode: Keycode.KC_3,
    webCodes: ["Digit3"],
    category: "Basic",
  },
  {
    id: "4$",
    display: (
      <>
        <p>$</p>
        <p>4</p>
      </>
    ),
    keycode: Keycode.KC_4,
    webCodes: ["Digit4"],
    category: "Basic",
  },
  {
    id: "5%",
    display: (
      <>
        <p>%</p>
        <p>5</p>
      </>
    ),
    keycode: Keycode.KC_5,
    webCodes: ["Digit5"],
    category: "Basic",
  },
  {
    id: "6^",
    display: (
      <>
        <p>^</p>
        <p>6</p>
      </>
    ),
    keycode: Keycode.KC_6,
    webCodes: ["Digit6"],
    category: "Basic",
  },
  {
    id: "7&",
    display: (
      <>
        <p>&amp;</p>
        <p>7</p>
      </>
    ),
    keycode: Keycode.KC_7,
    webCodes: ["Digit7"],
    category: "Basic",
  },
  {
    id: "8*",
    display: (
      <>
        <p>*</p>
        <p>8</p>
      </>
    ),
    keycode: Keycode.KC_8,
    webCodes: ["Digit8"],
    category: "Basic",
  },
  {
    id: "9(",
    display: (
      <>
        <p>(</p>
        <p>9</p>
      </>
    ),
    keycode: Keycode.KC_9,
    webCodes: ["Digit9"],
    category: "Basic",
  },
  {
    id: "0)",
    display: (
      <>
        <p>)</p>
        <p>0</p>
      </>
    ),
    keycode: Keycode.KC_0,
    webCodes: ["Digit0"],
    category: "Basic",
  },
  {
    id: "Enter",
    keycode: Keycode.KC_ENTER,
    webCodes: ["Enter"],
    category: "Extended",
  },
  {
    id: "Esc",
    keycode: Keycode.KC_ESCAPE,
    webCodes: ["Escape"],
    category: "Extended",
  },
  {
    id: "Bksp",
    tooltip: "Backspace",
    keycode: Keycode.KC_BACKSPACE,
    webCodes: ["Backspace"],
    category: "Extended",
  },
  {
    id: "Tab",
    keycode: Keycode.KC_TAB,
    webCodes: ["Tab"],
    category: "Extended",
  },
  {
    id: "Space",
    keycode: Keycode.KC_SPACE,
    webCodes: ["Space"],
    category: "Extended",
  },
  {
    id: "-_",
    display: (
      <>
        <p>_</p>
        <p>-</p>
      </>
    ),
    keycode: Keycode.KC_MINUS,
    webCodes: ["Minus"],
    category: "Basic",
  },
  {
    id: "=+",
    display: (
      <>
        <p>+</p>
        <p>=</p>
      </>
    ),
    keycode: Keycode.KC_EQUAL,
    webCodes: ["Equal"],
    category: "Basic",
  },
  {
    id: "[{",
    display: (
      <>
        <p>{"{"}</p>
        <p>[</p>
      </>
    ),
    keycode: Keycode.KC_LEFT_BRACKET,
    webCodes: ["BracketLeft"],
    category: "Basic",
  },
  {
    id: "]}",
    display: (
      <>
        <p>{"}"}</p>
        <p>]</p>
      </>
    ),
    keycode: Keycode.KC_RIGHT_BRACKET,
    webCodes: ["BracketRight"],
    category: "Basic",
  },
  {
    id: "\\|",
    display: (
      <>
        <p>|</p>
        <p>\</p>
      </>
    ),
    keycode: Keycode.KC_BACKSLASH,
    webCodes: ["Backslash"],
    category: "Basic",
  },
  {
    id: "Non-US #",
    display: (
      <>
        <p>ISO</p>
        <p>#</p>
      </>
    ),
    keycode: Keycode.KC_NONUS_HASH,
    webCodes: [
      /* Backslash */
    ],
    category: "Basic",
  },
  {
    id: ";:",
    display: (
      <>
        <p>:</p>
        <p>;</p>
      </>
    ),
    keycode: Keycode.KC_SEMICOLON,
    webCodes: ["Semicolon"],
    category: "Basic",
  },
  {
    id: "'\"",
    display: (
      <>
        <p>&quot;</p>
        <p>&apos;</p>
      </>
    ),
    keycode: Keycode.KC_QUOTE,
    webCodes: ["Quote"],
    category: "Basic",
  },
  {
    id: "`~",
    display: (
      <>
        <p>~</p>
        <p>`</p>
      </>
    ),
    keycode: Keycode.KC_GRAVE,
    webCodes: ["Backquote"],
    category: "Basic",
  },
  {
    id: ",<",
    display: (
      <>
        <p>{"<"}</p>
        <p>,</p>
      </>
    ),
    keycode: Keycode.KC_COMMA,
    webCodes: ["Comma"],
    category: "Basic",
  },
  {
    id: ".>",
    display: (
      <>
        <p>{">"}</p>
        <p>.</p>
      </>
    ),
    keycode: Keycode.KC_DOT,
    webCodes: ["Period"],
    category: "Basic",
  },
  {
    id: "/?",
    display: (
      <>
        <p>?</p>
        <p>/</p>
      </>
    ),
    keycode: Keycode.KC_SLASH,
    webCodes: ["Slash"],
    category: "Basic",
  },
  {
    id: "Caps",
    tooltip: "Caps Lock",
    keycode: Keycode.KC_CAPS_LOCK,
    webCodes: ["CapsLock"],
    category: "Extended",
  },
  {
    id: "F1",
    keycode: Keycode.KC_F1,
    webCodes: ["F1"],
    category: "Extended",
  },
  {
    id: "F2",
    keycode: Keycode.KC_F2,
    webCodes: ["F2"],
    category: "Extended",
  },
  {
    id: "F3",
    keycode: Keycode.KC_F3,
    webCodes: ["F3"],
    category: "Extended",
  },
  {
    id: "F4",
    keycode: Keycode.KC_F4,
    webCodes: ["F4"],
    category: "Extended",
  },
  {
    id: "F5",
    keycode: Keycode.KC_F5,
    webCodes: ["F5"],
    category: "Extended",
  },
  {
    id: "F6",
    keycode: Keycode.KC_F6,
    webCodes: ["F6"],
    category: "Extended",
  },
  {
    id: "F7",
    keycode: Keycode.KC_F7,
    webCodes: ["F7"],
    category: "Extended",
  },
  {
    id: "F8",
    keycode: Keycode.KC_F8,
    webCodes: ["F8"],
    category: "Extended",
  },
  {
    id: "F9",
    keycode: Keycode.KC_F9,
    webCodes: ["F9"],
    category: "Extended",
  },
  {
    id: "F10",
    keycode: Keycode.KC_F10,
    webCodes: ["F10"],
    category: "Extended",
  },
  {
    id: "F11",
    keycode: Keycode.KC_F11,
    webCodes: ["F11"],
    category: "Extended",
  },
  {
    id: "F12",
    keycode: Keycode.KC_F12,
    webCodes: ["F12"],
    category: "Extended",
  },
  {
    id: "Print",
    tooltip: "Print Screen",
    keycode: Keycode.KC_PRINT_SCREEN,
    webCodes: ["PrintScreen"],
    category: "Extended",
  },
  {
    id: "Scroll",
    tooltip: "Scroll Lock",
    keycode: Keycode.KC_SCROLL_LOCK,
    webCodes: ["ScrollLock"],
    category: "Extended",
  },
  {
    id: "Pause",
    keycode: Keycode.KC_PAUSE,
    webCodes: ["Pause"],
    category: "Extended",
  },
  {
    id: "Ins",
    tooltip: "Insert",
    keycode: Keycode.KC_INSERT,
    webCodes: ["Insert"],
    category: "Extended",
  },
  {
    id: "Home",
    keycode: Keycode.KC_HOME,
    webCodes: ["Home"],
    category: "Extended",
  },
  {
    id: "PgUp",
    tooltip: "Page Up",
    keycode: Keycode.KC_PAGE_UP,
    webCodes: ["PageUp"],
    category: "Extended",
  },
  {
    id: "Del",
    tooltip: "Delete",
    keycode: Keycode.KC_DELETE,
    webCodes: ["Delete"],
    category: "Extended",
  },
  {
    id: "End",
    keycode: Keycode.KC_END,
    webCodes: ["End"],
    category: "Extended",
  },
  {
    id: "PgDn",
    tooltip: "Page Down",
    keycode: Keycode.KC_PAGE_DOWN,
    webCodes: ["PageDown"],
    category: "Extended",
  },
  {
    id: "→",
    tooltip: "Right Arrow",
    display: <ArrowRight />,
    keycode: Keycode.KC_RIGHT,
    webCodes: ["ArrowRight"],
    category: "Extended",
  },
  {
    id: "←",
    tooltip: "Left Arrow",
    display: <ArrowLeft />,
    keycode: Keycode.KC_LEFT,
    webCodes: ["ArrowLeft"],
    category: "Extended",
  },
  {
    id: "↓",
    tooltip: "Down Arrow",
    display: <ArrowDown />,
    keycode: Keycode.KC_DOWN,
    webCodes: ["ArrowDown"],
    category: "Extended",
  },
  {
    id: "↑",
    tooltip: "Up Arrow",
    display: <ArrowUp />,
    keycode: Keycode.KC_UP,
    webCodes: ["ArrowUp"],
    category: "Extended",
  },
  {
    id: "Num",
    tooltip: "Num Lock",
    keycode: Keycode.KC_NUM_LOCK,
    webCodes: ["NumLock"],
    category: "Extended",
  },
  {
    id: "Num /",
    tooltip: "Numpad Divide",
    display: (
      <>
        <p>Num</p>
        <p>/</p>
      </>
    ),
    keycode: Keycode.KC_KP_SLASH,
    webCodes: ["NumpadDivide"],
    category: "Extended",
  },
  {
    id: "Num *",
    tooltip: "Numpad Multiply",
    display: (
      <>
        <p>Num</p>
        <p>*</p>
      </>
    ),
    keycode: Keycode.KC_KP_ASTERISK,
    webCodes: ["NumpadMultiply"],
    category: "Extended",
  },
  {
    id: "Num -",
    tooltip: "Numpad Subtract",
    display: (
      <>
        <p>Num</p>
        <p>-</p>
      </>
    ),
    keycode: Keycode.KC_KP_MINUS,
    webCodes: ["NumpadSubtract"],
    category: "Extended",
  },
  {
    id: "Num +",
    tooltip: "Numpad Add",
    display: (
      <>
        <p>Num</p>
        <p>+</p>
      </>
    ),
    keycode: Keycode.KC_KP_PLUS,
    webCodes: ["NumpadAdd"],
    category: "Extended",
  },
  {
    id: "Num Enter",
    tooltip: "Numpad Enter",
    display: (
      <>
        <p>Num</p>
        <p>Enter</p>
      </>
    ),
    keycode: Keycode.KC_KP_ENTER,
    webCodes: ["NumpadEnter"],
    category: "Extended",
  },
  {
    id: "Num 1",
    tooltip: "Numpad 1 & End",
    display: (
      <>
        <p>Num</p>
        <p>1</p>
      </>
    ),
    keycode: Keycode.KC_KP_1,
    webCodes: ["Numpad1"],
    category: "Extended",
  },
  {
    id: "Num 2",
    tooltip: "Numpad 2 & ↓",
    display: (
      <>
        <p>Num</p>
        <p>2</p>
      </>
    ),
    keycode: Keycode.KC_KP_2,
    webCodes: ["Numpad2"],
    category: "Extended",
  },
  {
    id: "Num 3",
    tooltip: "Numpad 3 & PgDn",
    display: (
      <>
        <p>Num</p>
        <p>3</p>
      </>
    ),
    keycode: Keycode.KC_KP_3,
    webCodes: ["Numpad3"],
    category: "Extended",
  },
  {
    id: "Num 4",
    tooltip: "Numpad 4 & ←",
    display: (
      <>
        <p>Num</p>
        <p>4</p>
      </>
    ),
    keycode: Keycode.KC_KP_4,
    webCodes: ["Numpad4"],
    category: "Extended",
  },
  {
    id: "Num 5",
    tooltip: "Numpad 5",
    display: (
      <>
        <p>Num</p>
        <p>5</p>
      </>
    ),
    keycode: Keycode.KC_KP_5,
    webCodes: ["Numpad5"],
    category: "Extended",
  },
  {
    id: "Num 6",
    tooltip: "Numpad 6 & →",
    display: (
      <>
        <p>Num</p>
        <p>6</p>
      </>
    ),
    keycode: Keycode.KC_KP_6,
    webCodes: ["Numpad6"],
    category: "Extended",
  },
  {
    id: "Num 7",
    tooltip: "Numpad 7 & Home",
    display: (
      <>
        <p>Num</p>
        <p>7</p>
      </>
    ),
    keycode: Keycode.KC_KP_7,
    webCodes: ["Numpad7"],
    category: "Extended",
  },
  {
    id: "Num 8",
    tooltip: "Numpad 8 & ↑",
    display: (
      <>
        <p>Num</p>
        <p>8</p>
      </>
    ),
    keycode: Keycode.KC_KP_8,
    webCodes: ["Numpad8"],
    category: "Extended",
  },
  {
    id: "Num 9",
    tooltip: "Numpad 9 & PgUp",
    display: (
      <>
        <p>Num</p>
        <p>9</p>
      </>
    ),
    keycode: Keycode.KC_KP_9,
    webCodes: ["Numpad9"],
    category: "Extended",
  },
  {
    id: "Num 0",
    tooltip: "Numpad 0 & Ins",
    display: (
      <>
        <p>Num</p>
        <p>0</p>
      </>
    ),
    keycode: Keycode.KC_KP_0,
    webCodes: ["Numpad0"],
    category: "Extended",
  },
  {
    id: "Num .",
    tooltip: "Numpad Decimal",
    display: (
      <>
        <p>Num</p>
        <p>.</p>
      </>
    ),
    keycode: Keycode.KC_KP_DOT,
    webCodes: ["NumpadDecimal"],
    category: "Extended",
  },
  {
    id: "ISO \\|",
    display: (
      <>
        <p>ISO</p>
        <p>\</p>
      </>
    ),
    keycode: Keycode.KC_NONUS_BACKSLASH,
    webCodes: ["IntlBackslash"],
    category: "Basic",
  },
  {
    id: "Menu",
    keycode: Keycode.KC_APPLICATION,
    webCodes: ["ContextMenu"],
    category: "Extended",
  },
  {
    id: "F13",
    keycode: Keycode.KC_F13,
    webCodes: ["F13"],
    category: "Extended",
  },
  {
    id: "F14",
    keycode: Keycode.KC_F14,
    webCodes: ["F14"],
    category: "Extended",
  },
  {
    id: "F15",
    keycode: Keycode.KC_F15,
    webCodes: ["F15"],
    category: "Extended",
  },
  {
    id: "F16",
    keycode: Keycode.KC_F16,
    webCodes: ["F16"],
    category: "Extended",
  },
  {
    id: "F17",
    keycode: Keycode.KC_F17,
    webCodes: ["F17"],
    category: "Extended",
  },
  {
    id: "F18",
    keycode: Keycode.KC_F18,
    webCodes: ["F18"],
    category: "Extended",
  },
  {
    id: "F19",
    keycode: Keycode.KC_F19,
    webCodes: ["F19"],
    category: "Extended",
  },
  {
    id: "F20",
    keycode: Keycode.KC_F20,
    webCodes: ["F20"],
    category: "Extended",
  },
  {
    id: "F21",
    keycode: Keycode.KC_F21,
    webCodes: ["F21"],
    category: "Extended",
  },
  {
    id: "F22",
    keycode: Keycode.KC_F22,
    webCodes: ["F22"],
    category: "Extended",
  },
  {
    id: "F23",
    keycode: Keycode.KC_F23,
    webCodes: ["F23"],
    category: "Extended",
  },
  {
    id: "F24",
    keycode: Keycode.KC_F24,
    webCodes: ["F24"],
    category: "Extended",
  },
  {
    id: "ImeOn",
    keycode: Keycode.KC_LANGUAGE_1,
    webCodes: ["Lang1"],
    category: "Extended",
  },
  {
    id: "ImeOff",
    keycode: Keycode.KC_LANGUAGE_2,
    webCodes: ["Lang2"],
    category: "Extended",
  },
  {
    id: "L-Ctrl",
    tooltip: "Left Control",
    keycode: Keycode.KC_LEFT_CTRL,
    webCodes: ["ControlLeft"],
    category: "Extended",
  },
  {
    id: "L-Shift",
    tooltip: "Left Shift",
    keycode: Keycode.KC_LEFT_SHIFT,
    webCodes: ["ShiftLeft"],
    category: "Extended",
  },
  {
    id: "L-Alt",
    tooltip: "Left Alt/Option",
    keycode: Keycode.KC_LEFT_ALT,
    webCodes: ["AltLeft"],
    category: "Extended",
  },
  {
    id: "L-Win",
    tooltip: "Left Windows/Super/Command",
    keycode: Keycode.KC_LEFT_GUI,
    webCodes: ["MetaLeft"],
    category: "Extended",
  },
  {
    id: "R-Ctrl",
    tooltip: "Right Control",
    keycode: Keycode.KC_RIGHT_CTRL,
    webCodes: ["ControlRight"],
    category: "Extended",
  },
  {
    id: "R-Shift",
    tooltip: "Right Shift",
    keycode: Keycode.KC_RIGHT_SHIFT,
    webCodes: ["ShiftRight"],
    category: "Extended",
  },
  {
    id: "R-Alt",
    tooltip: "Right Alt/Option",
    keycode: Keycode.KC_RIGHT_ALT,
    webCodes: ["AltRight"],
    category: "Extended",
  },
  {
    id: "R-Win",
    tooltip: "Right Windows/Super/Command",
    keycode: Keycode.KC_RIGHT_GUI,
    webCodes: ["MetaRight"],
    category: "Extended",
  },
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
    keycode: Keycode.KC_AUDIO_PLAYER,
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
    keycode: Keycode.KC_FILE_BROWSER,
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
    keycode: Keycode.KC_MOUSE_BUTTON_LEFT,
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
    keycode: Keycode.KC_MOUSE_BUTTON_RIGHT,
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
    keycode: Keycode.KC_MOUSE_BUTTON_MIDDLE,
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
    keycode: Keycode.KC_MOUSE_BUTTON_4,
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
    keycode: Keycode.KC_MOUSE_BUTTON_5,
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
    keycode: Keycode.KC_LAYER_LOCK,
    webCodes: [],
    category: "Special",
  },
  {
    id: "MO(1)",
    tooltip: "Activate layer 1 while held",
    keycode: Keycode.KC_LAYER_1,
    webCodes: [],
    category: "Special",
  },
  {
    id: "MO(2)",
    tooltip: "Activate layer 2 while held",
    keycode: Keycode.KC_LAYER_2,
    webCodes: [],
    category: "Special",
  },
  {
    id: "MO(3)",
    tooltip: "Activate layer 3 while held",
    keycode: Keycode.KC_LAYER_3,
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
    keycode: Keycode.KC_KEY_LOCK,
    webCodes: [],
    category: "Special",
  },
  {
    id: "PF(0)",
    tooltip: "Switch to profile 0",
    keycode: Keycode.KC_PROFILE_0,
    webCodes: [],
    category: "Special",
  },
  {
    id: "PF(1)",
    tooltip: "Switch to profile 1",
    keycode: Keycode.KC_PROFILE_1,
    webCodes: [],
    category: "Special",
  },
  {
    id: "PF(2)",
    tooltip: "Switch to profile 2",
    keycode: Keycode.KC_PROFILE_2,
    webCodes: [],
    category: "Special",
  },
  {
    id: "PF(3)",
    tooltip: "Switch to profile 3",
    keycode: Keycode.KC_PROFILE_3,
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
    keycode: Keycode.KC_PROFILE_SWAP,
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
    keycode: Keycode.KC_PROFILE_CYCLE,
    webCodes: [],
    category: "Special",
  },
  {
    id: "Null Bind Primary",
    display: (
      <>
        <p>NB</p>
        <p>L</p>
      </>
    ),
    keycode: Keycode.KC_NULL_BIND_PRIMARY,
    webCodes: [],
    category: "AKC",
    highlight: true,
  },
  {
    id: "Null Bind Secondary",
    display: (
      <>
        <p>NB</p>
        <p>R</p>
      </>
    ),
    keycode: Keycode.KC_NULL_BIND_SECONDARY,
    webCodes: [],
    category: "AKC",
    highlight: true,
  },
  {
    id: "DKS",
    keycode: Keycode.KC_DKS,
    webCodes: [],
    category: "AKC",
    highlight: true,
  },
  {
    id: "Tap-Hold",
    display: (
      <>
        <p>Tap</p>
        <p>Hold</p>
      </>
    ),
    keycode: Keycode.KC_TAP_HOLD,
    webCodes: [],
    category: "AKC",
    highlight: true,
  },
  {
    id: "TGL",
    keycode: Keycode.KC_TOGGLE,
    webCodes: [],
    category: "AKC",
    highlight: true,
  },
]

export const KEYCODE_TO_METADATA: Record<number, KeycodeMetadata> =
  KEYCODE_METADATA.reduce((acc, meta) => ({ ...acc, [meta.keycode]: meta }), {})

export const KEYCODE_CATEGORIES_MAP: Record<string, KeycodeMetadata[]> = {
  Basic: [
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
  ].map((keycode) => KEYCODE_TO_METADATA[keycode]),
  Extended: [
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
    Keycode.KC_LEFT,
    Keycode.KC_UP,
    Keycode.KC_DOWN,
    Keycode.KC_RIGHT,
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
  ].map((keycode) => KEYCODE_TO_METADATA[keycode]),
  Special: [
    Keycode.KC_MEDIA_NEXT_TRACK,
    Keycode.KC_MEDIA_PREV_TRACK,
    Keycode.KC_MEDIA_PLAY_PAUSE,
    Keycode.KC_MEDIA_STOP,
    Keycode.KC_AUDIO_MUTE,
    Keycode.KC_AUDIO_VOL_UP,
    Keycode.KC_AUDIO_VOL_DOWN,
    Keycode.KC_AUDIO_PLAYER,
    Keycode.KC_MAIL,
    Keycode.KC_CALCULATOR,
    Keycode.KC_FILE_BROWSER,
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
    Keycode.KC_BRIGHTNESS_UP,
    Keycode.KC_BRIGHTNESS_DOWN,
    Keycode.KC_MOUSE_BUTTON_LEFT,
    Keycode.KC_MOUSE_BUTTON_RIGHT,
    Keycode.KC_MOUSE_BUTTON_MIDDLE,
    Keycode.KC_MOUSE_BUTTON_4,
    Keycode.KC_MOUSE_BUTTON_5,
    Keycode.KC_LAYER_LOCK,
    Keycode.KC_LAYER_1,
    Keycode.KC_LAYER_2,
    Keycode.KC_LAYER_3,
    Keycode.KC_KEY_LOCK,
    Keycode.KC_PROFILE_0,
    Keycode.KC_PROFILE_1,
    Keycode.KC_PROFILE_2,
    Keycode.KC_PROFILE_3,
    Keycode.KC_PROFILE_SWAP,
    Keycode.KC_PROFILE_CYCLE,
  ].map((keycode) => KEYCODE_TO_METADATA[keycode]),
}
