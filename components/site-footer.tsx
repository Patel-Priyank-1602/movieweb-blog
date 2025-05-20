import Link from "next/link"
import { Github, Twitter, Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-bold text-xl">
              <span className="text-primary">Screen</span>Gems
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your ultimate guide to the best movies and web series of 2025. Stay updated with the latest releases and
            upcoming titles.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
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
              <Link href="/#movies" className="text-muted-foreground hover:text-foreground transition-colors">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/#series" className="text-muted-foreground hover:text-foreground transition-colors">
                Web Series
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Action
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Drama
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Sci-Fi
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Comedy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Thriller
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-1">
          <h3 className="font-medium mb-4">Subscribe to our newsletter</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest updates on new releases and upcoming titles.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ScreenGems. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
