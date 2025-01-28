import { GithubLink } from "./github-link"
import { ThemeSwitcher } from "./theme-switcher"

export function Footer() {
  return (
    <footer className="flex flex-col border-t">
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 p-4">
        <h1 className="text-xl font-extrabold tracking-tight">hmkconf</h1>
        <div className="flex items-center gap-2">
          <GithubLink />
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  )
}
