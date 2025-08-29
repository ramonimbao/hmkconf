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

import { produce } from "immer"
import { createContext, useContext, useState } from "react"
import { useEventListener } from "usehooks-ts"

import { FixedScrollArea } from "@/components/common/fixed-scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const KEY_UP_TIMEOUT = 750

type KeyEvent = {
  webCode: string
  display: string
  pressed: boolean
}

type KeyTesterProps = {
  keyEvents: KeyEvent[]
}

const KeyTesterContext = createContext({} as KeyTesterProps)

const useKeyTester = () => useContext(KeyTesterContext)

export function KeyTesterProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [keyEvents, setKeyEvents] = useState<KeyEvent[]>([])

  useEventListener("keydown", (e) => {
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
  })

  useEventListener("keyup", (e) => {
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
  })

  useEventListener("blur", () => setKeyEvents([]))

  return (
    <KeyTesterContext.Provider value={{ keyEvents }}>
      {children}
    </KeyTesterContext.Provider>
  )
}

export function KeyTesterKeyPress({
  className,
  ...props
}: React.ComponentProps<typeof FixedScrollArea>) {
  const { keyEvents } = useKeyTester()

  return (
    <FixedScrollArea className={cn("rounded-md border", className)} {...props}>
      <div className="flex flex-wrap gap-2 p-2">
        {keyEvents
          .filter((keyEvent) => keyEvent.pressed)
          .map((keyEvent, i) => (
            <Badge key={i}>{keyEvent.display}</Badge>
          ))}
      </div>
    </FixedScrollArea>
  )
}

export function KeyTesterKeyRelease({
  className,
  ...props
}: React.ComponentProps<typeof FixedScrollArea>) {
  const { keyEvents } = useKeyTester()

  return (
    <FixedScrollArea className={cn("rounded-md border", className)} {...props}>
      <div className="flex flex-wrap gap-2 p-2">
        {keyEvents
          .filter((keyEvent) => !keyEvent.pressed)
          .map((keyEvent, i) => (
            <Badge key={i}>{keyEvent.display}</Badge>
          ))}
      </div>
    </FixedScrollArea>
  )
}
