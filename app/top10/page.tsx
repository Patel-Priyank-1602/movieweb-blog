"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import Navbar from "@/components/nav"
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

interface TopMovieCardProps extends ContentItem {
  rank: number
}

const top10Content: ContentItem[] = [
  {
    title: "Fantastic 4",
    type: "Movie",
    image: "/series/fanc1.webp?height=450&width=300",
    rating: 4.5,
    releaseDate: "Jul 25, 2025",
    status: "released",
    slug: "fantastic-4",
  },
  {
    title: "Mahavatar Narsimha",
    type: "Movie",
    rating: 4.7,
    image: "/series/ma.webp?height=450&width=300",
    releaseDate: "Jul 25, 2025",
    status: "released",
    slug: "mahavatar-narsimha",
  },
  {
    title: "Superman",
    type: "Movie",
    image: "/series/suc.webp?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jul 11, 2025",
    status: "released",
    slug: "superman",
  },
  {
    title: "The Bad Guys 2",
    type: "Movie",
    rating: 4.4,
    image: "/series/bd.webp?height=450&width=300",
    releaseDate: "Aug 1, 2025",
    status: "released",
    slug: "the-bad-guys-2",
  },
  {
    title: "F1: The Movie",
    type: "Movie",
    image: "/series/f1.webp?height=450&width=300",
    rating: 4.7,
    releaseDate: "Jun 27, 2025",
    status: "upcoming",
    slug: "f1-the-movie",
  },
  {
    title: "How to Train Your Dragon",
    type: "Movie",
    image: "/series/htt.webp?height=450&width=300",
    rating: 4.4,
    releaseDate: "Jun 13, 2025",
    status: "released",
    slug: "how-to-train-your-dragon",
  },
  {
    title: "Jurassic World: Rebirth",
    type: "Movie",
    image: "/series/ju.webp?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jul 4, 2025",
    status: "released",
    slug: "jurassic-world-rebirth",
  },
  {
    title: "Kesari: Chapter 2",
    type: "Movie",
    image: "/series/kc.webp?height=450&width=300",
    rating: 4.1,
    releaseDate: "Apr 18, 2025",
    status: "released",
    slug: "kesari-chapter-2",
  },
  {
    title: "28 Years Later",
    type: "Movie",
    image: "/series/28y.webp?height=450&width=300",
    rating: 4.5,
    releaseDate: "June 20, 2025",
    status: "released",
    slug: "28-years-later",
  },
  {
    title: "Ballerina",
    type: "Movie",
    image: "/series/bann.webp?height=450&width=300",
    rating: 4.7,
    releaseDate: "June 6, 2025",
    status: "released",
    slug: "ballerina",
  },
  {
    title: "Panchayat",
    type: "Series",
    image: "/series/pancc.webp?height=450&width=300",
    rating: 4.3,
    releaseDate: "Jun 24, 2025",
    status: "released",
    slug: "panchayat",
  },
  {
    title: "Wednesday",
    type: "Series",
    image: "/series/wenc.webp?height=450&width=300",
    rating: 4.5,
    releaseDate: "Aug 6, 2025",
    status: "released",
    slug: "wednesday",
  },
  {
    title: "Squid Game",
    type: "Series",
    image: "/series/sqq.webp?height=450&width=300",
    rating: 4.6,
    releaseDate: "Jun 27, 2025",
    status: "released",
    slug: "squid-game",
  },
  {
    title: "Special OPS 2",
    type: "Series",
    image: "/series/spcc.webp?height=450&width=300",
    rating: 4.5,
    releaseDate: "Jul 17, 2025",
    status: "released",
    slug: "special-ops-2",
  },
  {
    title: "Criminal Justice",
    type: "Series",
    image: "/series/cr.webp?height=450&width=300",
    rating: 4.2,
    releaseDate: "May 29, 2025",
    status: "released",
    slug: "criminal-justice",
  },
  {
    title: "Adolescence",
    type: "Series",
    image: "/series/adc.webp?height=450&width=300",
    rating: 4.2,
    releaseDate: "Mar 13, 2025",
    status: "released",
    slug: "adolescence",
  },
  {
    title: "You",
    type: "Series",
    image: "/series/youc.webp?height=450&width=300",
    rating: 4.7,
    releaseDate: "Apr 24, 2025",
    status: "released",
    slug: "you",
  },
  {
    title: "The Last of Us",
    type: "Series",
    image: "/series/thlou.webp?height=450&width=300",
    rating: 4.8,
    releaseDate: "Apr 13, 2025",
    status: "released",
    slug: "the-last-of-us",
  },
  {
    title: "Daredevil",
    type: "Series",
    image: "/series/dart.webp?height=450&width=300",
    rating: 4.6,
    releaseDate: "Mar 4, 2025",
    status: "released",
    slug: "daredevil",
  },
  {
    title: "Pataal Lok",
    type: "Series",
    image: "/series/patcc.webp?height=450&width=300",
    rating: 4.9,
    releaseDate: "Jan 17, 2025",
    status: "released",
    slug: "pataal-lok",
  },
]

// Split top10Content into movies and series
const top10Movies = top10Content.filter((item) => item.type === "Movie").slice(0, 10)
const top10Series = top10Content.filter((item) => item.type === "Series").slice(0, 10)

function TopMovieCard({ title, type, image, rating, releaseDate, status, rank, slug }: TopMovieCardProps) {
  const router = useRouter()
  const handleMoreInfo = () => {
    router.push(`/${status}/${slug}`)
  }

  return (
    <div className="relative flex flex-shrink-0 items-center snap-start">
      {/* Background rank number */}
      <div
        className="
          text-[10rem] sm:text-[13rem] md:text-[15rem] lg:text-[18rem]
          font-black 
          text-gray-800/80
          select-none 
          leading-none
          -mr-8 sm:-mr-12 md:-mr-14 lg:-mr-16
        "
        style={{
          WebkitTextStroke: "2px rgba(55, 65, 81, 0.5)",
          textShadow: "0 0 20px rgba(0, 0, 0, 0.5)"
        }}
      >
        {rank}
      </div>

      {/* Movie Card */}
      <div
        className="
          group relative z-10 
          w-[140px] sm:w-48 md:w-56 lg:w-64
          flex-shrink-0 
          overflow-hidden rounded-xl 
          bg-gradient-to-b from-gray-800 to-gray-900 
          transition-all duration-300 hover:scale-105 hover:shadow-2xl 
          border border-gray-700
        "
      >
        <div className="aspect-[2/3] overflow-hidden relative">
          <img
            src={image || "/placeholder-image.webp"}
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

export default function Top10Page() {
  const moviesRef = useRef<HTMLDivElement>(null)
  const seriesRef = useRef<HTMLDivElement>(null)
  const moviesScroll = useScrollNavigation()
  const seriesScroll = useScrollNavigation()

  useEffect(() => {
    const initializeScrollStates = () => {
      if (moviesRef.current) moviesScroll.checkScrollButtons(moviesRef.current)
      if (seriesRef.current) seriesScroll.checkScrollButtons(seriesRef.current)
    }

    const timer = setTimeout(initializeScrollStates, 100)
    return () => clearTimeout(timer)
  }, [])

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
      <Navbar />
      <div className="pt-16">
        <main className="flex-1">
          <section className="container px-2 sm:px-4 py-12">
            {/* Top 10 Movies Section */}
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <span>Top Movies</span>
              </h2>
            </div>
            <div className="relative">
              <div
                ref={moviesRef}
                className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={handleMouseDrag}
                onScroll={(e) => moviesScroll.checkScrollButtons(e.currentTarget)}
              >
                {top10Movies.map((item, index) => (
                  <TopMovieCard key={`${item.title}-${index}`} {...item} rank={index + 1} />
                ))}
                {top10Movies.length === 0 && (
                  <div className="flex-1 py-4 text-center">
                    <p className="text-gray-500">No movies available in this category.</p>
                  </div>
                )}
              </div>
              <SlidingButtons
                onPrevious={() => moviesRef.current && moviesScroll.scrollLeft(moviesRef.current)}
                onNext={() => moviesRef.current && moviesScroll.scrollRight(moviesRef.current)}
                showPrevious={moviesScroll.canScrollLeft}
                showNext={moviesScroll.canScrollRight}
              />
            </div>

            {/* Top 10 Series Section */}
            <div className="flex items-center mb-8 mt-12">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <span>Top WebSeries</span>
              </h2>
            </div>
            <div className="relative">
              <div
                ref={seriesRef}
                className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={handleMouseDrag}
                onScroll={(e) => seriesScroll.checkScrollButtons(e.currentTarget)}
              >
                {top10Series.map((item, index) => (
                  <TopMovieCard key={`${item.title}-${index}`} {...item} rank={index + 1} />
                ))}
                {top10Series.length === 0 && (
                  <div className="flex-1 py-4 text-center">
                    <p className="text-gray-500">No series available in this category.</p>
                  </div>
                )}
              </div>
              <SlidingButtons
                onPrevious={() => seriesRef.current && seriesScroll.scrollLeft(seriesRef.current)}
                onNext={() => seriesRef.current && seriesScroll.scrollRight(seriesRef.current)}
                showPrevious={seriesScroll.canScrollLeft}
                showNext={seriesScroll.canScrollRight}
              />
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
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}