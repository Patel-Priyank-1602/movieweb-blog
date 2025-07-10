"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Film, Menu, TrendingUp, X, Search, Bell, Contact } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedShowcase from "@/components/featured-showcase"
import MovieCard from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import Loading from "./loading"
import { SiteFooter } from "@/components/footer"

interface ContentItem {
  title: string
  type: "Movie" | "Series"
  image: string
  rating?: number
  releaseDate: string
  status: "released" | "upcoming"
  slug?: string
}

const arrivedMovies: ContentItem[] = [
  {
    title: "Raid 2",
    type: "Movie",
    image: "/series/radc.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "raid-2",
  },
  {
    title: "Thunderbolt",
    type: "Movie",
    image: "/series/thnc.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "thunderbolt",
  },
  {
    title: "Chhava",
    type: "Movie",
    image: "/series/ch.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Feb 14, 2025",
    status: "released",
    slug: "chhava",
  },
  {
    title: "Final Destination",
    type: "Movie",
    image: "/series/fdc.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 16, 2025",
    status: "released",
    slug: "final-destination",
  },
  {
    title: "Mission Impossible: Final Reckoning",
    type: "Movie",
    image: "/series/mic.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 17, 2025",
    status: "released",
    slug: "mission-impossible-final-reckoning",
  },
  {
    title: "Ballerina",
    type: "Movie",
    image: "/series/ban.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "June 6, 2025",
    status: "released",
    slug: "ballerina",
  },
  {
    title: "Captain America: Brave New World",
    type: "Movie",
    image: "/series/cam.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "February 14, 2025",
    status: "released",
    slug: "captain-america-brave-new-world",
  },
  {
    title: "How to Train Your Dragon",
    type: "Movie",
    image: "/series/htt.jpeg?height=450&width=300",
    rating: 4.4,
    releaseDate: "June 13, 2025",
    status: "released",
    slug: "how-to-train-your-dragon",
  },
  {
    title: "28 Years Later",
    type: "Movie",
    image: "/series/28y.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "June 20, 2025",
    status: "released",
    slug: "28-years-later",
  },
  {
    title: "Sitaare Zameen Par",
    type: "Movie",
    image: "/series/si.jpeg?height=450&width=300",
    rating: 3.9,
    releaseDate: "June 20, 2025",
    status: "released",
    slug: "sitaare-zameen-par",
  },
  {
    title: "F1: The Movie",
    type: "Movie",
    image: "/series/f1.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Jun 27, 2025",
    status: "upcoming",
    slug: "f1-the-movie",
  },
  {
    title: "Minecraft: The Movie",
    type: "Movie",
    image: "/series/mnc.jpeg?height=450&width=300",
    rating: 3.9,
    releaseDate: "April 4, 2025",
    status: "released",
    slug: "minecraft-the-movie",
  },
  {
    title: "Kesari: Chapter 2",
    type: "Movie",
    image: "/series/kc.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "Apr 18, 2025",
    status: "released",
    slug: "kesari-chapter-2",
  },
  {
    title: "Dragon",
    type: "Movie",
    image: "/series/dr.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "Feb 21, 2025",
    status: "released",
    slug: "dragon",
  },
  {
    title: "Jurassic World: Rebirth",
    type: "Movie",
    image: "/series/ju.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jul 4, 2025",
    status: "released",
    slug: "jurassic-world-rebirth",
  },
  {
    title: "Eleven",
    type: "Movie",
    image: "/series/ele.jpeg?height=450&width=300",
    rating: 3.9,
    releaseDate: "May 16, 2025",
    status: "released",
    slug: "eleven",
  },
]

const upcomingMovies: ContentItem[] = [
  {
    title: "Superman",
    type: "Movie",
    image: "/series/suc.jpeg?height=450&width=300",
    releaseDate: "July 11, 2025",
    status: "upcoming",
    slug: "superman",
  },
  {
    title: "Fantastic 4",
    type: "Movie",
    image: "/series/fanc.jpeg?height=450&width=300",
    releaseDate: "July 25, 2025",
    status: "upcoming",
    slug: "fantastic-4",
  },
  {
    title: "War 2",
    type: "Movie",
    image: "/series/warr.jpeg?height=450&width=300",
    releaseDate: "Aug 14, 2025",
    status: "upcoming",
    slug: "war-2",
  },
  {
    title: "The Conjuring",
    type: "Movie",
    image: "/series/can.jpeg?height=450&width=300",
    releaseDate: "Sept 5, 2025",
    status: "upcoming",
    slug: "the-conjuring",
  },
  {
    title: "Avatar 3",
    type: "Movie",
    image: "/series/av.jpeg?height=450&width=300",
    releaseDate: "Dec 19, 2025",
    status: "upcoming",
    slug: "avatar-3",
  },
  {
    title: "Zootopia 2",
    type: "Movie",
    image: "/series/zoo.jpeg?height=450&width=300",
    releaseDate: "November 26, 2025",
    status: "upcoming",
    slug: "zootopia-2",
  },
  {
    title: "The Bad Guys 2",
    type: "Movie",
    image: "/series/bd.jpeg?height=450&width=300",
    releaseDate: "August 1, 2025",
    status: "upcoming",
    slug: "the-bad-guys-2",
  },
]

const arrivedSeries: ContentItem[] = [
  {
    title: "Panchayat",
    type: "Series",
    image: "/series/panc.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jun 24, 2025",
    status: "released",
    slug: "panchayat",
  },
  {
    title: "Squid Game",
    type: "Series",
    image: "/series/sq.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "Jun 27, 2025",
    status: "released",
    slug: "squid-game",
  },
  {
    title: "You",
    type: "Series",
    image: "/series/youc.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Apr 24, 2025",
    status: "released",
    slug: "you",
  },
  {
    title: "Adolescence",
    type: "Series",
    image: "/series/adc.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "Mar 13, 2025",
    status: "released",
    slug: "adolescence",
  },
  {
    title: "Pataal Lok",
    type: "Series",
    image: "/series/patc.jpeg?height=450&width=300",
    rating: 4.9,
    releaseDate: "Jan 17, 2025",
    status: "released",
    slug: "pataal-lok",
  },
  {
    title: "The Last of Us",
    type: "Series",
    image: "/series/thlou.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "Apr 13, 2025",
    status: "released",
    slug: "the-last-of-us",
  },
  {
    title: "Daredevil",
    type: "Series",
    image: "/series/dar.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "Mar 4, 2025",
    status: "released",
    slug: "daredevil",
  },
  {
    title: "Khakee: The Bengal Chapter",
    type: "Series",
    image: "/series/kk.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "March 20, 2025",
    status: "released",
    slug: "khakee-the-bengal-chapter",
  },
  {
    title: "Ironheart",
    type: "Series",
    image: "/series/ir.jpeg?height=450&width=300",
    rating: 3.6,
    releaseDate: "June 24, 2025",
    status: "released",
    slug: "ironheart",
  },
  {
    title: "Criminal Justice",
    type: "Series",
    image: "/series/cr.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "May 29, 2025",
    status: "released" as const,
    slug: "criminal-justice",
  },
  {
    title: "The Sandman",
    type: "Series",
    image: "/series/sad.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "July 3, 2025",
    status: "released",
    slug: "the-sandman",
  },
]

const upcomingSeries: ContentItem[] = [
  {
    title: "Stranger Things",
    type: "Series",
    image: "/series/stc.jpeg?height=450&width=300",
    releaseDate: "Nov 26, 2025",
    status: "upcoming",
    slug: "stranger-things",
  },
  {
    title: "Alice in Borderland",
    type: "Series",
    image: "/series/aibb.jpeg?height=450&width=300",
    releaseDate: "Sept 25, 2025",
    status: "upcoming",
    slug: "alice-in-borderland",
  },
  {
    title: "Wednesday",
    type: "Series",
    image: "/series/wenc.jpeg?height=450&width=300",
    releaseDate: "Aug 6, 2025",
    status: "upcoming",
    slug: "wednesday",
  },
  {
    title: "Family Man",
    type: "Series",
    image: "/series/fm.jpeg?height=450&width=300",
    releaseDate: "Nov, 2025",
    status: "upcoming",
    slug: "family-man",
  },
  {
    title: "The Witcher",
    type: "Series",
    image: "/series/wi.jpeg?height=450&width=300",
    releaseDate: "Late 2025",
    status: "upcoming",
    slug: "the-witcher",
  },
]

const top10Content: ContentItem[] = [
  {
    title: "Panchayat",
    type: "Series",
    image: "/series/pancc.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jun 24, 2025",
    status: "released",
    slug: "panchayat",
  },
  {
    title: "Squid Game",
    type: "Series",
    image: "/series/sqq.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "Jun 27, 2025",
    status: "released",
    slug: "squid-game",
  },
  {
    title: "F1: The Movie",
    type: "Movie",
    image: "/series/f1.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Jun 27, 2025",
    status: "upcoming",
    slug: "f1-the-movie",
  },
  {
    title: "Raid 2",
    type: "Movie",
    image: "/series/radcc.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "raid-2",
  },
  {
    title: "28 Years Later",
    type: "Movie",
    image: "/series/28y.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "June 20, 2025",
    status: "released",
    slug: "28-years-later",
  },
  {
    title: "Pataal Lok",
    type: "Series",
    image: "/series/patcc.jpeg?height=450&width=300",
    rating: 4.9,
    releaseDate: "Jan 17, 2025",
    status: "released",
    slug: "pataal-lok",
  },
  {
    title: "Ballerina",
    type: "Movie",
    image: "/series/bann.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "June 6, 2025",
    status: "released",
    slug: "ballerina",
  },
  {
    title: "Daredevil",
    type: "Series",
    image: "/series/dart.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "Mar 4, 2025",
    status: "released",
    slug: "daredevil",
  },
  {
    title: "Mission Impossible: Final Reckoning",
    type: "Movie",
    image: "/series/mii.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 17, 2025",
    status: "released",
    slug: "mission-impossible-final-reckoning",
  },
  {
    title: "Chhava",
    type: "Movie",
    image: "/series/chh.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Feb 14, 2025",
    status: "released",
    slug: "chhava",
  },
]

interface TopMovieCardProps extends ContentItem {
  rank: number
}

function TopMovieCard({ title, type, image, rating, releaseDate, status, rank, slug }: TopMovieCardProps) {
  const router = useRouter()
  const handleMoreInfo = () => {
    router.push(`/${status}/${slug}`)
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700">
      <div className="absolute top-3 left-3 z-20">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{rank}</span>
        </div>
      </div>
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={image || "/placeholder-image.jpg"}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleMoreInfo}
            className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-lg"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CineVerse() {
  const [contentType, setContentType] = useState<"movies" | "series">("movies")
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const handleLoadingComplete = () => setIsLoading(false)
  const toggleMenu = () => setIsMenuOpen((o) => !o)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const arrivedContent = contentType === "movies" ? arrivedMovies : arrivedSeries
  const upcomingContent = contentType === "movies" ? upcomingMovies : upcomingSeries

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />
  }

  const handleMouseDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const startX = e.pageX - container.offsetLeft
    const scrollLeft = container.scrollLeft
    let isDown = true

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      isDown = false
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Professional Navigation Bar */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg" : "bg-black/80 backdrop-blur-sm"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Brand Section with OTT Sidebar */}
            <div className="flex items-center">
              <div className="relative group z-[9999]">
                <div className="flex items-center gap-3">
                  <Film className="h-6 w-6 text-primary" />
                  {/* Brand Name */}
                  <span className="text-xl font-bold cursor-pointer select-none">
                    CineVers<span className="text-[#6325c3]">e Hub</span>
                  </span>
                </div>

                {/* Full Screen OTT Sidebar - Slides from Left, Covers Screen Top to Bottom */}
                <div className="fixed top-0 left-0 h-screen w-80 bg-gradient-to-b from-[#18181b] to-[#0a0a0a] border-r border-gray-700 shadow-2xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[9999] overflow-y-auto">
                  <div className="py-6 px-4">
                    <span className="text-gray-400 text-base uppercase tracking-wider mb-4 block font-semibold">
                      OTT Apps
                    </span>
                    <div className="flex flex-col gap-2">
                      {[
                        { name: "JioHotstar", icon: "jioh", link: "https://www.jiohotstar.com/" },
                        { name: "Netflix", icon: "netflix", link: "https://www.netflix.com/" },
                        { name: "Prime Video", icon: "primev", link: "https://www.primevideo.com/" },
                        { name: "Apple TV+", icon: "appletv", link: "https://tv.apple.com/" },
                        { name: "SonyLiv", icon: "sonyliv", link: "https://www.sonyliv.com/" },
                      ].map((app) => (
                        <a
                          key={app.name}
                          href={app.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                        >
                          <img
                            src={`/icons/${app.icon}.png`}
                            alt={app.name}
                            loading="lazy"
                            className="w-7 h-7 object-contain"
                          />
                          <span className="text-white">{app.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium text-white border-b-2 border-blue-500 pb-1 transition-colors"
              >
                Home
              </Link>
              <Link href="/released" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Released
              </Link>
              <Link href="/upcoming" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Upcoming
              </Link>
              <Link href="/search" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/search">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://patel-priyank-1602.github.io/contactcvr/">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white relative">
                  <Contact className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
                asChild
              >
                <Link href="https://cvrecommendation.netlify.app/">
                  <Film className="h-4 w-4 mr-2" />
                  Recommendations
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="md:hidden text-gray-300 hover:text-white">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu with Slow Animation */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-700 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-700 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={toggleMenu}
        ></div>

        {/* Menu Panel */}
        <div
          className={`fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-gray-700 shadow-2xl transform transition-all duration-700 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Film className="h-6 w-6 text-[#6325c3]" />
              <span className="text-lg font-semibold">
                CineVers<span className="text-[#6325c3]">e Hub</span>
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Content */}
          <nav className="p-6 space-y-4">
            <Link
              href="/"
              onClick={toggleMenu}
              className="block text-sm font-medium text-white py-3 px-4 rounded-lg bg-blue-600/20 border-l-4 border-blue-500"
              style={{ borderLeftColor: "#7336d5" }}
            >
              Home
            </Link>
            <Link
              href="/released"
              onClick={toggleMenu}
              className="block text-sm font-medium text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
              style={{ borderLeftColor: "#7336d5" }}
            >
              Released
            </Link>
            <Link
              href="/upcoming"
              onClick={toggleMenu}
              className="block text-sm font-medium text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
              style={{ borderLeftColor: "#7336d5" }}
            >
              Upcoming
            </Link>
            <Link
              href="/search"
              onClick={toggleMenu}
              className="block text-sm font-medium text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
              style={{ borderLeftColor: "#7336d5" }}            >
              Search
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="block text-sm font-medium text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
              style={{ borderLeftColor: "#7336d5" }}            >
              About
            </Link>

            {/* Mobile Action Buttons */}
            <div className="pt-6 border-t border-gray-700 space-y-3">
              <Link href="/search">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Search className="h-4 w-4 mr-3" />
                  Search
                </Button>
              </Link>
              <Link href="https://patel-priyank-1602.github.io/contactcvr/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 relative"
                >
                  <Contact className="h-4 w-4 mr-3" />
                  Contact
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
                asChild
              >
                <Link href="https://cvrecommendation.netlify.app/" onClick={toggleMenu}>
                  <Film className="h-4 w-4 mr-2" />
                  Get Recommendations
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <main className="flex-1">
          <FeaturedShowcase />

          <section className="container px-2 sm:px-4 py-12">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <span>Top 10 Movies & Series</span>
              </h2>
            </div>
            <div
              className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onMouseDown={handleMouseDrag}
            >
              {top10Content.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex-shrink-0 w-[140px] sm:w-48 md:w-56 lg:w-64 snap-start"
                >
                  <TopMovieCard {...item} rank={index + 1} />
                </div>
              ))}
            </div>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </section>

          <section className="container px-2 sm:px-4 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">2025 Releases</h2>
              <Tabs
                value={contentType}
                onValueChange={(value) => setContentType(value as "movies" | "series")}
                className="w-[350px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="movies">Movies</TabsTrigger>
                  <TabsTrigger value="series">Series</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-12">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-900/30 text-green-400 hover:bg-green-600/30 border-green-800"
                    >
                      Released
                    </Badge>
                    <span>Recently Released</span>
                  </h3>
                  <Link href="/released" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div
                  className="flex gap-2 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                  onMouseDown={handleMouseDrag}
                >
                  {arrivedContent.map((movie, index) => (
                    <div
                      key={`${movie.title}-${index}`}
                      className="flex-shrink-0 w-[90px] sm:w-[140px] md:w-[180px] lg:w-[220px] snap-start"
                    >
                      <MovieCard
                        title={movie.title}
                        type={movie.type}
                        image={movie.image || "/placeholder-image.jpg"}
                        rating={movie.rating}
                        releaseDate={movie.releaseDate}
                        status="released"
                        slug={movie.slug}
                        loading="lazy"
                        blurDataURL="/blur-movie.svg"
                      />
                    </div>
                  ))}
                  {arrivedContent.length === 0 && (
                    <div className="flex-1 py-4 text-center">
                      <p className="text-gray-500">
                        No {contentType === "movies" ? "movies" : "series"} available in this category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-900/30 text-blue-400 hover:bg-blue-600/40 border-blue-800"
                    >
                      Upcoming
                    </Badge>
                    <span>Coming Soon</span>
                  </h3>
                  <Link href="/upcoming" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div
                  className="flex gap-2 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                  onMouseDown={handleMouseDrag}
                >
                  {upcomingContent.map((movie, index) => (
                    <div
                      key={`${movie.title}-${index}`}
                      className="flex-shrink-0 w-[90px] sm:w-[140px] md:w-[180px] lg:w-[220px] snap-start"
                    >
                      <MovieCard
                        title={movie.title}
                        type={movie.type}
                        image={movie.image || "/placeholder-image.jpg"}
                        releaseDate={movie.releaseDate}
                        status="upcoming"
                        slug={movie.slug}
                        loading="lazy"
                        blurDataURL="/blur-upcoming.svg"
                      />
                    </div>
                  ))}
                  {upcomingContent.length === 0 && (
                    <div className="flex-1 py-4 text-center">
                      <p className="text-gray-400">
                        No {contentType === "movies" ? "movies" : "series"} available in this category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </section>

          <section className="py-12 bg-black">
            <div className="container px-2 sm:px-4">
              <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold">The Last Update on this Website was on 4/7/2025</h2>
                <p className="text-gray-400">
                  For some Movies/Series, the official trailer is not Available, but only a Teaser has been released. In
                  some cases, neither a Teaser nor a Trailer is Available — only a Date Announcement Video is Provided.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
