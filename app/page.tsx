"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Film, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedShowcase from "@/components/featured-showcase"
import MovieCard from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import Loading from "./loading"

export default function Home() {
  const [contentType, setContentType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const arrivedMovies = [
    {
      title: "Raid 2",
      type: "Movie",
      image: "/series/radc.jpeg?height=450&width=300",
      rating: 4.8,
      releaseDate: "May 1, 2025",
      status: "released" as const,
    },
    {
      title: "Thunderbolt",
      type: "Movie",
      image: "/series/thnc.jpeg?height=450&width=300",
      rating: 4.6,
      releaseDate: "May 1, 2025",
      status: "released" as const,
    },
    {
      title: "Chhava",
      type: "Movie",
      image: "/series/ch.jpeg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Feb 14, 2025",
      status: "released" as const,
    },
    {
      title: "Final Destination",
      type: "Movie",
      image: "/series/fdc.jpeg?height=450&width=300",
      rating: 4.5,
      releaseDate: "May 16, 2025",
      status: "released" as const,
    },
    {
      title: "Mission Impossible: Final Reckoning",
      type: "Movie",
      image: "/series/mic.jpeg?height=450&width=300",
      releaseDate: "May 17, 2025",
      status: "released" as const,
    },
  ]

  const upcomingMovies = [
    {
      title: "Jurassic World: Rebirth",
      type: "Movie",
      image: "/series/ju.jpeg?height=450&width=300",
      releaseDate: "July 4, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Superman",
      type: "Movie",
      image: "/series/suc.jpeg?height=450&width=300",
      releaseDate: "July 11, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Fantastic 4",
      type: "Movie",
      image: "/series/fanc.jpeg?height=450&width=300",
      releaseDate: "July 25, 2025",
      status: "upcoming" as const,
    },
    {
      title: "War 2",
      type: "Movie",
      image: "/series/warr.jpeg?height=450&width=300",
      releaseDate: "Aug  14, 2025",
      status: "upcoming" as const,
    },
    {
      title: "The Conjuring",
      type: "Movie",
      image: "/series/can.jpeg?height=450&width=300",
      releaseDate: "Sept 5, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Avatar 3",
      type: "Movie",
      image: "/series/av.jpeg?height=450&width=300",
      releaseDate: "Dec 19, 2025",
      status: "upcoming" as const,
    },
  ]

  const arrivedSeries = [
    {
      title: "You",
      type: "Series",
      image: "/series/youc.jpeg?height=450&width=300",
      rating: 4.7,
      releaseDate: "Apr 24, 2025",
      status: "released" as const,
    },
    {
      title: "Adolescence",
      type: "Series",
      image: "/series/adc.jpeg?height=450&width=300",
      rating: 4.2,
      releaseDate: "Mar 13, 2025",
      status: "released" as const,
    },
    {
      title: "Pataal Lok",
      type: "Series",
      image: "/series/patc.jpeg?height=450&width=300",
      rating: 4.9,
      releaseDate: "Jan 17, 2025",
      status: "released" as const,
    },
    {
      title: "The Last of Us",
      type: "Series",
      image: "/series/thlou.jpeg?height=450&width=300",
      rating: 4.8,
      releaseDate: "Apr 13, 2025",
      status: "released" as const,
    },
    {
      title: "Daredevil",
      type: "Series",
      image: "/series/dar.jpeg?height=450&width=300",
      rating: 4.6,
      releaseDate: "Mar 4, 2025",
      status: "released" as const,
    },
  ]

  const upcomingSeries = [
    {
      title: "Stranger Things",
      type: "Series",
      image: "/series/stc.jpeg?height=450&width=300",
      releaseDate: "Oct - Nov, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Alice in Borderland",
      type: "Series",
      image: "/series/aibb.jpeg?height=450&width=300",
      releaseDate: "Sept, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Panchayat",
      type: "Series",
      image: "/series/panc.jpeg?height=450&width=300",
      releaseDate: "Jul 2, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Squid Game",
      type: "Series",
      image: "/series/sq.jpeg?height=450&width=300",
      releaseDate: "Jun 27, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Wednesday",
      type: "Series",
      image: "/series/wenc.jpeg?height=450&width=300",
      releaseDate: "Aug 6, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Family Man",
      type: "Series",
      image: "/series/fm.jpeg?height=450&width=300",
      releaseDate: "Nov, 2025",
      status: "upcoming" as const,
    },
  ]

  // Combine and filter content based on selected type
  const arrivedContent =
    contentType === "all"
      ? [...arrivedMovies, ...arrivedSeries]
      : contentType === "movies"
        ? arrivedMovies
        : arrivedSeries

  const upcomingContent =
    contentType === "all"
      ? [...upcomingMovies, ...upcomingSeries]
      : contentType === "movies"
        ? upcomingMovies
        : upcomingSeries

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CineVerse 2025</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-white">
              Home
            </Link>
            <Link href="/released" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Released
            </Link>
            <Link href="/upcoming" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Upcoming
            </Link>
            <Link href="/search" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Search
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <TrendingUp className="h-5 w-5" />
              <span className="sr-only">Trending</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <FeaturedShowcase />

        <section className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">2025 Releases</h2>
            <Tabs value={contentType} onValueChange={setContentType} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-12">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-900/30 text-green-400 hover:bg-green-900/30 border-green-800"
                  >
                    Released
                  </Badge>
                  <span>Already Released</span>
                </h3>
                <Link href="/released" className="text-sm text-primary flex items-center">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                {arrivedContent.slice(0, 5).map((movie, index) => (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    type={movie.type as "Movie" | "Series"}
                    image={movie.image}
                    rating={movie.rating}
                    releaseDate={movie.releaseDate}
                    status="released"
                  />
                ))}
                {arrivedContent.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-400">
                      No {contentType === "movies" ? "movies" : "series"} available in this category.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/30 border-blue-800"
                  >
                    Upcoming
                  </Badge>
                  <span>Coming Soon</span>
                </h3>
                <Link href="/upcoming" className="text-sm text-primary flex items-center">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                {upcomingContent.slice(0, 5).map((movie, index) => (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    type={movie.type as "Movie" | "Series"}
                    image={movie.image}
                    releaseDate={movie.releaseDate}
                    status="upcoming"
                  />
                ))}
                {upcomingContent.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-400">
                      No {contentType === "movies" ? "movies" : "series"} available in this category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="container">
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold">The Last Update on this Website was on 22/5/2025</h2>
              <p className="text-gray-400">The same Movie/Series Trailer is not available, so there is only a Teaser. Also, for some Trailers or Teasers, none are available.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
