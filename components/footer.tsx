import { Film } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-800" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6" style={{ color: '#6224c3' }} />
              <span className="text-xl font-bold text-white">
                CineVers<span style={{ color: '#6224c3' }}>e Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Your ultimate guide to the best movies and web series of 2025. Stay updated with the latest releases and upcoming titles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Released", href: "/released" },
                { name: "Upcoming", href: "/upcoming" },
                { name: "Search", href: "/search" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6224c3'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Others */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Others</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Updates", href: "/notifications" },
                { name: "About Developer", href: "/about" },
                { name: "Trending", href: "/top10" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6224c3'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Sites */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Websites</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://cvrecommendation.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6224c3'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Get Recommendations
                </a>
              </li>
              <li>
                <a
                  href="https://patel-priyank-1602.github.io/contactcvr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6224c3'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-800" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
            All platform links Netflix, Prime Video, Hotstar, Crunchyroll, Apple TV+, Sony Liv and IMDb ratings are provided for informational and redirection purposes only. We do not host or stream any content and fully respect copyrights.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} CineVerse Hub. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="/privacyterms/privacy" className="text-gray-500 hover:text-white transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6224c3'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Privacy Policy
            </a>
            <a href="/privacyterms/terms" className="text-gray-500 hover:text-white transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#6224c3'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}