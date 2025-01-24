import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { QueryClientProvider } from "@/components/providers/query-client-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "hmkconf",
  description: "A web configurator for libhmk keyboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(geist.className, "antialiased")}>
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
