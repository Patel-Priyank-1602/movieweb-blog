import Link from "next/link"
import { Github, Twitter, Instagram, Film } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                CineVers
                <span className="text-primary">e Hub</span>
              </span>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your ultimate guide to the best movies and web series of 2025. Stay updated with the latest releases and
            upcoming titles.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/released" className="text-muted-foreground hover:text-foreground transition-colors">
                Released
              </Link>
            </li>
            <li>
              <Link href="/upcoming" className="text-muted-foreground hover:text-foreground transition-colors">
                Upcoming
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                Search
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">Others</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="https://cvrecommendation.netlify.app/" className="text-muted-foreground hover:text-foreground transition-colors">
                Get Recommendations
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Developer
              </Link>
            </li>
            <li>
              <Link href="https://patel-priyank-1602.github.io/contactcvr/" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t container mt-12 pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CineVerse Hub. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}