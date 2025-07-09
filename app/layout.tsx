import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Film, Instagram, Twitter, Github, Linkedin } from "lucide-react"

export const metadata = {
  title: "CineVerse Hub",
  description: "Discover the latest movies and web series of 2025",
  icons: {
    icon: "/cv-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The <head> tag and <meta> tags are not supported directly in Next.js App Router layout.tsx.
            Use the Metadata API or a custom Head component if needed. */}
      </head>
      <body className="min-h-screen bg-black text-white flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
