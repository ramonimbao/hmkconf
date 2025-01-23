import Link from "next/link"
import { ReactNode } from "react"
import { ThemeSwitcher } from "../theme-switcher"

export function ConfiguratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-1 flex-col divide-y">
      <header className="w-full bg-background">
        <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between gap-6 px-6 min-[1800px]:border-x">
          <Link href="/" replace>
            <h1 className="text-xl font-extrabold tracking-tight">hmkconf</h1>
          </Link>
          <ThemeSwitcher />
        </div>
      </header>
      <div className="flex w-full flex-1 flex-col">
        <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col min-[1800px]:border-x">
          {children}
        </main>
      </div>
    </div>
  )
}
