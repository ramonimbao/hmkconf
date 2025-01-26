import { LoaderCircle } from "lucide-react"

export function Loader() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <LoaderCircle className="size-8 animate-spin" />
        <p>Loading Advanced Key Bindings...</p>
      </div>
    </div>
  )
}
