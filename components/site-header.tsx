"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Film, Tv, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl">
              <span className="text-primary">Screen</span>Gems
            </span>
            <span className="font-bold sm:hidden text-xl">
              <span className="text-primary">S</span>G
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#movies"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Film className="mr-1 h-4 w-4" />
              Movies
            </Link>
            <Link
              href="/#series"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Tv className="mr-1 h-4 w-4" />
              Web Series
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search titles..."
              className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className={cn("h-5 w-5", isMobileMenuOpen && "hidden")} />
            <X className={cn("h-5 w-5", !isMobileMenuOpen && "hidden")} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container py-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search titles..." className="w-full pl-8" />
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href="/#movies"
                className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Film className="mr-2 h-4 w-4" />
                Movies
              </Link>
              <Link
                href="/#series"
                className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Tv className="mr-2 h-4 w-4" />
                Web Series
              </Link>
              <Link
                href="/about"
                className="flex items-center text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
