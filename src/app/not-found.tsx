import { Footer } from "@/components/footer"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center p-12 text-center">
        <h1 className="text-5xl font-extrabold leading-none tracking-tight">
          Page Not Found
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <Link href="/" replace className={buttonVariants()}>
            Go Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
