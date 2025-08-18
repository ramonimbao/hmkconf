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

import { LogOutIcon } from "lucide-react"
import Link from "next/link"
import { createContext, useContext, useState } from "react"

import {
  KeyboardEditor,
  KeyboardEditorHeader,
  KeyboardEditorSeparator,
  KeyboardEditorView,
} from "../common/keyboard-editor"
import { GithubLink } from "../github-link"
import { ThemeSwitcher } from "../theme-switcher"
import { Button } from "../ui/button"
import { MetadataEditorKeyboard } from "./metadata-editor-keyboard"
import { MetadataEditorMenu } from "./metadata-editor-menu"

type MetadataEditorProps = {
  index: number | null
  setIndex: (index: number | null) => void
}

const MetadataEditorContext = createContext({} as MetadataEditorProps)

export const useMetadataEditor = () => useContext(MetadataEditorContext)

export function MetadataEditor() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <MetadataEditorContext.Provider value={{ index, setIndex }}>
      <div className="flex h-screen flex-col">
        <header className="flex h-14 shrink-0 items-center gap-4 px-4">
          <div className="flex flex-1 items-center">
            <Button asChild size="sm" variant="link">
              <Link href="/" replace>
                <LogOutIcon /> Back to Configurator
              </Link>
            </Button>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <GithubLink />
            <ThemeSwitcher />
          </div>
        </header>
        <KeyboardEditor>
          <KeyboardEditorView>
            <MetadataEditorKeyboard />
            <KeyboardEditorHeader></KeyboardEditorHeader>
          </KeyboardEditorView>
          <KeyboardEditorSeparator />
          <KeyboardEditorView>
            <MetadataEditorMenu />
          </KeyboardEditorView>
        </KeyboardEditor>
      </div>
    </MetadataEditorContext.Provider>
  )
}
