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

"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { produce } from "immer"
import {
  ComponentProps,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react"
import { useEventListener } from "usehooks-ts"

const KEY_UP_TIMEOUT = 750

type KeyEvent = {
  webCode: string
  display: string
  pressed: boolean
}

type KeyTester = {
  keyEvents: KeyEvent[]
}

const KeyTesterContext = createContext<KeyTester>({} as KeyTester)

export function KeyTesterProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [keyEvents, setKeyEvents] = useState<KeyEvent[]>([])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!e.repeat) {
      setKeyEvents((state) => [
        ...state,
        {
          webCode: e.code,
          display: e.code === "" ? e.key : e.code,
          pressed: true,
        },
      ])
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    setKeyEvents(
      produce((draft) => {
        const index = draft.findIndex(
          (keyEvent) => keyEvent.webCode === e.code && keyEvent.pressed,
        )
        if (index !== -1) {
          draft[index].pressed = false
        }
      }),
    )
    setTimeout(
      () =>
        setKeyEvents((state) => {
          const index = state.findIndex(
            (keyEvent) => keyEvent.webCode === e.code && !keyEvent.pressed,
          )
          return state.filter((_, i) => i !== index)
        }),
      KEY_UP_TIMEOUT,
    )
  }

  const handleBlur = () => setKeyEvents([])

  useEventListener("keydown", handleKeyDown)
  useEventListener("keyup", handleKeyUp)
  useEventListener("blur", handleBlur)

  return (
    <KeyTesterContext.Provider value={{ keyEvents }}>
      {children}
    </KeyTesterContext.Provider>
  )
}

export function KeyTesterKeyPress({
  className,
  ...props
}: ComponentProps<typeof ScrollArea>) {
  const { keyEvents } = useContext(KeyTesterContext)

  return (
    <ScrollArea
      className={cn("w-full rounded-md border", className)}
      {...props}
    >
      <div className="flex flex-wrap gap-2 p-2">
        {keyEvents
          .filter((keyEvent) => keyEvent.pressed)
          .map((keyEvent, i) => (
            <Badge key={i}>{keyEvent.display}</Badge>
          ))}
      </div>
    </ScrollArea>
  )
}

export function KeyTesterKeyRelease({
  className,
  ...props
}: ComponentProps<typeof ScrollArea>) {
  const { keyEvents } = useContext(KeyTesterContext)

  return (
    <ScrollArea
      className={cn("w-full rounded-md border", className)}
      {...props}
    >
      <div className="flex flex-wrap gap-2 p-2">
        {keyEvents
          .filter((keyEvent) => !keyEvent.pressed)
          .map((keyEvent, i) => (
            <Badge key={i}>{keyEvent.display}</Badge>
          ))}
      </div>
    </ScrollArea>
  )
}
