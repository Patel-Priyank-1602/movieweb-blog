"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, TrendingUp, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedShowcase from "@/components/featured-showcase"
import MovieCard from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import Loading from "./loading"
import { SiteFooter } from "@/components/footer"
import Navbar from "@/components/nav"

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
    title: "Fantastic 4",
    type: "Movie",
    image: "/series/fanc.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "Jul 25, 2025",
    status: "upcoming",
    slug: "fantastic-4",
  },
  {
    title: "Superman",
    type: "Movie",
    image: "/series/suc.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jul 11, 2025",
    status: "released",
    slug: "superman",
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
    title: "F1: The Movie",
    type: "Movie",
    image: "/series/f1.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Jun 27, 2025",
    status: "upcoming",
    slug: "f1-the-movie",
  },
  {
    title: "28 Years Later",
    type: "Movie",
    image: "/series/28y.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "Jun 20, 2025",
    status: "released",
    slug: "28-years-later",
  },
  {
    title: "Sitaare Zameen Par",
    type: "Movie",
    image: "/series/si.jpeg?height=450&width=300",
    rating: 3.9,
    releaseDate: "Jun 20, 2025",
    status: "released",
    slug: "sitaare-zameen-par",
  },
  {
    title: "How to Train Your Dragon",
    type: "Movie",
    image: "/series/htt.jpeg?height=450&width=300",
    rating: 4.4,
    releaseDate: "Jun 13, 2025",
    status: "released",
    slug: "how-to-train-your-dragon",
  },
  {
    title: "Ballerina",
    type: "Movie",
    image: "/series/ban.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Jun 6, 2025",
    status: "released",
    slug: "ballerina",
  },
  {
    title: "Lilo & Stitch",
    type: "Movie",
    image: "/series/ls.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "May 23, 2025",
    status: "released",
    slug: "liloAndStitch",
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
    title: "Final Destination",
    type: "Movie",
    image: "/series/fdc.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 16, 2025",
    status: "released",
    slug: "final-destination",
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
    title: "Kesari: Chapter 2",
    type: "Movie",
    image: "/series/kc.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "Apr 18, 2025",
    status: "released",
    slug: "kesari-chapter-2",
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
    title: "Dragon",
    type: "Movie",
    image: "/series/dr.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "Feb 21, 2025",
    status: "released",
    slug: "dragon",
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
    title: "Captain America: Brave New World",
    type: "Movie",
    image: "/series/cam.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "Feb 14, 2025",
    status: "released",
    slug: "captain-america-brave-new-world",
  },
]

const upcomingMovies: ContentItem[] = [
  {
    title: "The Bad Guys 2",
    type: "Movie",
    image: "/series/bd.jpeg?height=450&width=300",
    releaseDate: "Aug 1, 2025",
    status: "upcoming",
    slug: "the-bad-guys-2",
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
    title: "Coolie",
    type: "Movie",
    image: "/series/cl.jpeg?height=450&width=300",
    releaseDate: "Aug 14, 2025",
    status: "upcoming" as const,
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
    title: "Demon Slayer: Kimetsu no Yaiba – Infinity Castle Arc",
    type: "Movie",
    image: "/series/dl.jpeg?height=450&width=300",
    releaseDate: "Sept 12, 2025",
    status: "upcoming",
    slug: "demon-slayer-kimetsu-no-yaiba-infinity-castle-arc",
  },
  {
    title: "Predator: Badlands",
    type: "Movie",
    image: "/series/pb.jpeg?height=450&width=300",
    releaseDate: "Nov 7, 2025",
    status: "upcoming" as const,
  },
  {
    title: "Zootopia 2",
    type: "Movie",
    image: "/series/zoo.jpeg?height=450&width=300",
    releaseDate: "Nov 26, 2025",
    status: "upcoming",
    slug: "zootopia-2",
  },
  {
    title: "Avatar 3",
    type: "Movie",
    image: "/series/av.jpeg?height=450&width=300",
    releaseDate: "Dec 19, 2025",
    status: "upcoming",
    slug: "avatar-3",
  },
]

const arrivedSeries: ContentItem[] = [
  {
    title: "Special OPS 2",
    type: "Series",
    image: "/series/sp.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "Jul 17, 2025",
    status: "released" as const,
  },
  {
    title: "The Sandman",
    type: "Series",
    image: "/series/sad.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "Jul 3, 2025",
    status: "released",
    slug: "the-sandman",
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
    title: "Panchayat",
    type: "Series",
    image: "/series/panc.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jun 24, 2025",
    status: "released",
    slug: "panchayat",
  },
  {
    title: "Ironheart",
    type: "Series",
    image: "/series/ir.jpeg?height=450&width=300",
    rating: 3.6,
    releaseDate: "Jun 24, 2025",
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
    title: "You",
    type: "Series",
    image: "/series/youc.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Apr 24, 2025",
    status: "released",
    slug: "you",
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
    title: "Khakee: The Bengal Chapter",
    type: "Series",
    image: "/series/kk.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "Mar 20, 2025",
    status: "released",
    slug: "khakee-the-bengal-chapter",
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
    title: "Pataal Lok",
    type: "Series",
    image: "/series/patc.jpeg?height=450&width=300",
    rating: 4.9,
    releaseDate: "Jan 17, 2025",
    status: "released",
    slug: "pataal-lok",
  },
]

const upcomingSeries: ContentItem[] = [
  {
    title: "Wednesday",
    type: "Series",
    image: "/series/wenc.jpeg?height=450&width=300",
    releaseDate: "Aug 6, 2025",
    status: "upcoming",
    slug: "wednesday",
  },
  {
    title: "Alien: Earth",
    type: "Series",
    image: "/series/aal.jpeg?height=450&width=300",
    releaseDate: "Aug 12, 2025",
    status: "upcoming",
    slug: "alien-earth",
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
    title: "Stranger Things",
    type: "Series",
    image: "/series/stc.jpeg?height=450&width=300",
    releaseDate: "Nov 26, 2025",
    status: "upcoming",
    slug: "stranger-things",
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
    title: "Fantastic 4",
    type: "Movie",
    image: "/series/fanc1.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "Jul 25, 2025",
    status: "upcoming",
    slug: "fantastic-4",
  },
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
    title: "Superman",
    type: "Movie",
    image: "/series/suc.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "July 11, 2025",
    status: "released",
    slug: "superman",
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
    title: "Criminal Justice",
    type: "Series",
    image: "/series/cr.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "May 29, 2025",
    status: "released" as const,
    slug: "criminal-justice",
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
    title: "28 Years Later",
    type: "Movie",
    image: "/series/28y.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "June 20, 2025",
    status: "released",
    slug: "28-years-later",
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
    title: "Adolescence",
    type: "Series",
    image: "/series/adc.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "Mar 13, 2025",
    status: "released",
    slug: "adolescence",
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

// Sliding Button Component - Desktop Only
interface SlidingButtonsProps {
  onPrevious: () => void
  onNext: () => void
  showPrevious: boolean
  showNext: boolean
}

function SlidingButtons({ onPrevious, onNext, showPrevious, showNext }: SlidingButtonsProps) {
  return (
    <>
      {showNext && (
        <div className="hidden lg:flex absolute right-0 top-0 h-full w-20 z-10 items-center justify-center bg-gradient-to-l from-black/90 to-transparent">
          <button
            onClick={onNext}
            aria-label="Next"
            className="text-white"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      )}

      {showPrevious && (
        <div className="hidden lg:flex absolute left-0 top-0 h-full w-20 z-10 items-center justify-center bg-gradient-to-r from-black/90 to-transparent">
          <button
            onClick={onPrevious}
            aria-label="Previous"
            className="text-white"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
        </div>
      )}
    </>
  )
}

// Custom hook for scroll navigation
function useScrollNavigation() {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = (element: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = element
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scrollLeft = (element: HTMLElement) => {
    const scrollAmount = element.clientWidth * 0.8
    element.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  }

  const scrollRight = (element: HTMLElement) => {
    const scrollAmount = element.clientWidth * 0.8
    element.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return {
    canScrollLeft,
    canScrollRight,
    checkScrollButtons,
    scrollLeft,
    scrollRight,
  }
}

export default function CineVerse() {
  const [contentType, setContentType] = useState<"movies" | "series">("movies")
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  // Refs for scroll containers
  const top10Ref = useRef<HTMLDivElement>(null)
  const releasedRow1Ref = useRef<HTMLDivElement>(null)
  const releasedRow2Ref = useRef<HTMLDivElement>(null)
  const upcomingRef = useRef<HTMLDivElement>(null)

  // Scroll navigation hooks
  const top10Scroll = useScrollNavigation()
  const releasedRow1Scroll = useScrollNavigation()
  const releasedRow2Scroll = useScrollNavigation()
  const upcomingScroll = useScrollNavigation()

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

  // Initialize scroll button states
  useEffect(() => {
    const initializeScrollStates = () => {
      if (top10Ref.current) top10Scroll.checkScrollButtons(top10Ref.current)
      if (releasedRow1Ref.current) releasedRow1Scroll.checkScrollButtons(releasedRow1Ref.current)
      if (releasedRow2Ref.current) releasedRow2Scroll.checkScrollButtons(releasedRow2Ref.current)
      if (upcomingRef.current) upcomingScroll.checkScrollButtons(upcomingRef.current)
    }

    // Small delay to ensure content is rendered
    const timer = setTimeout(initializeScrollStates, 100)
    return () => clearTimeout(timer)
  }, [contentType])

  const arrivedContent = contentType === "movies" ? arrivedMovies : arrivedSeries
  const upcomingContent = contentType === "movies" ? upcomingMovies : upcomingSeries

  // Split arrivedContent into two chunks for two rows
  const midPoint = Math.ceil(arrivedContent.length / 2)
  const arrivedContentRow1 = arrivedContent.slice(0, midPoint)
  const arrivedContentRow2 = arrivedContent.slice(midPoint)

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
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-16">
        <main className="flex-1">
          <FeaturedShowcase />

          {/* Top 10 Section */}
          <section className="container px-2 sm:px-4 py-12">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <span>Top 10</span>
              </h2>
              <Link href="/top10" className="ml-auto">
                <Button variant="outline" className="bg-blue-900/30 text-blue-400 hover:bg-blue-600/30 border-blue-800">
                  Trending
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div
                ref={top10Ref}
                className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={handleMouseDrag}
                onScroll={(e) => top10Scroll.checkScrollButtons(e.currentTarget)}
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
              <SlidingButtons
                onPrevious={() => top10Ref.current && top10Scroll.scrollLeft(top10Ref.current)}
                onNext={() => top10Ref.current && top10Scroll.scrollRight(top10Ref.current)}
                showPrevious={top10Scroll.canScrollLeft}
                showNext={top10Scroll.canScrollRight}
              />
            </div>
          </section>

          {/* 2025 Releases Section */}
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
              {/* Recently Released Section */}
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
                  <Link href="/released" className="text-sm text-green-600 hover:text-green-800 flex items-center">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-8">
                  {/* Row 1 */}
                  <div className="relative">
                    <div
                      ref={releasedRow1Ref}
                      className="flex gap-2 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch",
                      }}
                      onMouseDown={handleMouseDrag}
                      onScroll={(e) => releasedRow1Scroll.checkScrollButtons(e.currentTarget)}
                    >
                      {arrivedContentRow1.map((movie, index) => (
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
                      {arrivedContentRow1.length === 0 && (
                        <div className="flex-1 py-4 text-center">
                          <p className="text-gray-500">
                            No {contentType === "movies" ? "movies" : "series"} available in this category.
                          </p>
                        </div>
                      )}
                    </div>
                    <SlidingButtons
                      onPrevious={() =>
                        releasedRow1Ref.current && releasedRow1Scroll.scrollLeft(releasedRow1Ref.current)
                      }
                      onNext={() => releasedRow1Ref.current && releasedRow1Scroll.scrollRight(releasedRow1Ref.current)}
                      showPrevious={releasedRow1Scroll.canScrollLeft}
                      showNext={releasedRow1Scroll.canScrollRight}
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="relative">
                    <div
                      ref={releasedRow2Ref}
                      className="flex gap-2 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch",
                      }}
                      onMouseDown={handleMouseDrag}
                      onScroll={(e) => releasedRow2Scroll.checkScrollButtons(e.currentTarget)}
                    >
                      {arrivedContentRow2.map((movie, index) => (
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
                      {arrivedContentRow2.length === 0 && (
                        <div className="flex-1 py-4 text-center">
                          <p className="text-gray-500">
                            No {contentType === "movies" ? "movies" : "series"} available in this category.
                          </p>
                        </div>
                      )}
                    </div>
                    <SlidingButtons
                      onPrevious={() =>
                        releasedRow2Ref.current && releasedRow2Scroll.scrollLeft(releasedRow2Ref.current)
                      }
                      onNext={() => releasedRow2Ref.current && releasedRow2Scroll.scrollRight(releasedRow2Ref.current)}
                      showPrevious={releasedRow2Scroll.canScrollLeft}
                      showNext={releasedRow2Scroll.canScrollRight}
                    />
                  </div>
                </div>
              </div>

              {/* Coming Soon Section */}
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
                <div className="relative">
                  <div
                    ref={upcomingRef}
                    className="flex gap-2 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                    onMouseDown={handleMouseDrag}
                    onScroll={(e) => upcomingScroll.checkScrollButtons(e.currentTarget)}
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
                  <SlidingButtons
                    onPrevious={() => upcomingRef.current && upcomingScroll.scrollLeft(upcomingRef.current)}
                    onNext={() => upcomingRef.current && upcomingScroll.scrollRight(upcomingRef.current)}
                    showPrevious={upcomingScroll.canScrollLeft}
                    showNext={upcomingScroll.canScrollRight}
                  />
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
                <h2 className="text-3xl font-bold">The Last Update on this Website was on 25/07/2025</h2>
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
