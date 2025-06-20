import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Film, Instagram, Twitter, Github, Linkedin } from "lucide-react"

export const metadata = {
  title: "CineVerse 2025",
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

          <footer className="border-t border-gray-800 bg-black py-6">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                <span className="font-semibold">CineVerse 2025</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                © {new Date().getFullYear()} CineVerse. All rights reserved.
              </div>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
