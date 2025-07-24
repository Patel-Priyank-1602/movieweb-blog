"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"
import Loading from "../loading"
import { SiteFooter } from "@/components/footer"
import Navbar from "@/components/nav"

export default function UpcomingPage() {
  const [contentType, setContentType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const upcomingMovies = [
    {
      title: "War 2",
      type: "Movie",
      image: "/series/warr.jpeg?height=450&width=300",
      releaseDate: "Aug 14, 2025",
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
    {
      title: "Zootopia 2",
      type: "Movie",
      image: "/series/zoo.jpeg?height=450&width=300",
      releaseDate: "Nov 26, 2025",
      status: "upcoming" as const,
    },
    {
      title: "The Bad Guys 2",
      type: "Movie",
      image: "/series/bd.jpeg?height=450&width=300",
      releaseDate: "Aug 1, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Demon Slayer: Kimetsu no Yaiba – Infinity Castle Arc",
      type: "Movie",
      image: "/series/dl.jpeg?height=450&width=300",
      releaseDate: "Sept 12, 2025",
      status: "upcoming" as const,
    },
  ]

  const upcomingSeries = [
    {
      title: "Stranger Things",
      type: "Series",
      image: "/series/stc.jpeg?height=450&width=300",
      releaseDate: "Nov 26, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Alice in Borderland",
      type: "Series",
      image: "/series/aibb.jpeg?height=450&width=300",
      releaseDate: "Sept 25, 2025",
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
    {
      title: "The Witcher",
      type: "Series",
      image: "/series/wi.jpeg?height=450&width=300",
      releaseDate: "Late 2025",
      status: "upcoming" as const,
    },
    {
      title: "Alien: Earth",
      type: "Series",
      image: "/series/aal.jpeg?height=450&width=300",
      releaseDate: "Aug 12, 2025",
      status: "upcoming" as const,
    },
  ]

  // Function to parse release dates for sorting
  const parseReleaseDate = (dateStr: string): Date => {
    if (dateStr === "Late 2025") {
      return new Date("Dec 31, 2025")
    }
    if (dateStr === "Oct - Nov, 2025") {
      return new Date("Oct 1, 2025")
    }
    if (dateStr === "Nov, 2025") {
      return new Date("Nov 1, 2025")
    }
    if (dateStr === "Sept, 2025") {
      return new Date("Sept 1, 2025")
    }
    return new Date(dateStr.replace("  ", " "))
  }

  // Sort movies and series by release date
  const sortedMovies = upcomingMovies.sort((a, b) => {
    return parseReleaseDate(a.releaseDate).getTime() - parseReleaseDate(b.releaseDate).getTime()
  })

  const sortedSeries = upcomingSeries.sort((a, b) => {
    return parseReleaseDate(a.releaseDate).getTime() - parseReleaseDate(b.releaseDate).getTime()
  })

  if (isLoading) {
    return <Loading onComplete={() => { }} />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />
      <div className="container py-20">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Upcoming in 2025</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Link href="/search" className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
            <Input
              placeholder="Search titles..."
              className="pl-9 bg-gray-900 border-gray-800 focus-visible:ring-primary w-full"
              readOnly
            />
          </Link>
          <Tabs value={contentType} onValueChange={setContentType} className="w-full md:w-[300px]">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {(contentType === "all" || contentType === "movies") && sortedMovies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Movies</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
              {sortedMovies.map((movie, index) => (
                <MovieCard
                  key={`movie-${index}`}
                  title={movie.title}
                  type={movie.type as "Movie"}
                  image={movie.image ?? "/placeholder-image.jpg"}
                  releaseDate={movie.releaseDate}
                  status="upcoming"
                />
              ))}
            </div>
          </div>
        )}

        {(contentType === "all" || contentType === "series") && sortedSeries.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Weberies</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
              {sortedSeries.map((series, index) => (
                <MovieCard
                  key={`series-${index}`}
                  title={series.title}
                  type={series.type as "Series"}
                  image={series.image ?? "/placeholder-image.jpg"}
                  releaseDate={series.releaseDate}
                  status="upcoming"
                />
              ))}
            </div>
          </div>
        )}

        {sortedMovies.length === 0 && sortedSeries.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-400">No content available in this category.</p>
          </div>
        )}
      </div>
      <SiteFooter /> {/* Use SiteFooter instead of Footer */}
    </div>
  )
}