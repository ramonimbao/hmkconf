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

import { PaintbrushIcon } from "lucide-react"
import Link from "next/link"

import { GithubLink } from "./github-link"
import { ThemeSwitcher } from "./theme-switcher"
import { Button } from "./ui/button"

export function Footer() {
  return (
    <footer className="flex h-16 items-center border-t">
      <div className="flex flex-1 items-center px-4">
        <h1 className="text-xl font-extrabold tracking-tight">hmkconf</h1>
      </div>
      <div className="flex items-center gap-2 px-4">
        <Button asChild variant="link">
          <Link href="/metadata" replace>
            <PaintbrushIcon /> Edit Keyboard Metadata
          </Link>
        </Button>
        <GithubLink />
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
