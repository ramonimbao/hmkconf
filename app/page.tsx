import Link from "next/link"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center p-12 text-center">
        <h1 className="text-5xl leading-none font-extrabold tracking-tight">
          hmkconf
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <Button asChild>
            <Link href="/app">Getting Started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo" replace>
              Demo
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  )
}
