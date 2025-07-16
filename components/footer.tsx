import Link from "next/link";
import { Github, Twitter, Instagram, Film } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <Film className="h-6 w-6 text-primary transition-transform hover:scale-110" />
              <span className="text-lg font-bold tracking-tight">
                CineVers<span className="text-primary">e Hub</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Your ultimate guide to the best movies and web series of 2025. Stay updated with the latest releases and upcoming titles.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/released"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Released
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Upcoming
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Others Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">Others</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/notifications"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  About Developer
                </Link>
              </li>
              <li>
                <Link
                  href="/top10"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Websites Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-foreground">Websites</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://cvrecommendation.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Get Recommendations
                </a>
              </li>
              <li>
                <a
                  href="https://patel-priyank-1602.github.io/contactcvr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} CineVerse Hub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}