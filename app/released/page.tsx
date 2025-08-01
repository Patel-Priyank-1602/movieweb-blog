"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"
import Loading from "../loading"
import { SiteFooter } from "@/components/footer"
import Navbar from "@/components/nav"

export default function ReleasedPage() {
  const [contentType, setContentType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
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
      rating: 4.5,
      releaseDate: "May 17, 2025",
      status: "released" as const,
    },
    {
      title: "Ballerina",
      type: "Movie",
      image: "/series/ban.jpeg?height=450&width=300",
      rating: 4.7,
      releaseDate: "Jun 6, 2025",
      status: "released" as const,
    },
    {
      title: "Captain America: Brave New World",
      type: "Movie",
      image: "/series/cam.jpeg?height=450&width=300",
      rating: 4.1,
      releaseDate: "Feb 14, 2025",
      status: "released" as const,
    },
    {
      title: "How to Train Your Dragon",
      type: "Movie",
      image: "/series/htt.jpeg?height=450&width=300",
      rating: 8.1,
      releaseDate: "Jun 13, 2025",
      status: "released" as const
    },
    {
      title: "28 Years Later",
      type: "Movie",
      image: "/series/28y.jpeg?height=450&width=300",
      rating: 4.5,
      releaseDate: "Jun 20, 2025",
      status: "released" as const,
    },
    {
      title: "Sitaare Zameen Par",
      type: "Movie",
      image: "/series/si.jpeg?height=450&width=300",
      rating: 3.9,
      releaseDate: "Jun 20, 2025",
      status: "released" as const,
    },
    {
      title: "F1: The Movie",
      type: "Movie",
      image: "/series/f1.jpeg?height=450&width=300",
      rating: 4.7,
      releaseDate: "Jun 27, 2025",
      status: "released" as const,
    },
    {
      title: "Minecraft: The Movie",
      type: "Movie",
      image: "/series/mnc.jpeg?height=450&width=300",
      rating: 3.9,
      releaseDate: "Apr 4, 2025",
      status: "released" as const,
    },
    {
      title: "Kesari: Chapter 2",
      type: "Movie",
      image: "/series/kc.jpeg?height=450&width=300",
      rating: 4.1,
      releaseDate: "Apr 18, 2025",
      status: "released" as const,
    },
    {
      title: "Dragon",
      type: "Movie",
      image: "/series/dr.jpeg?height=450&width=300",
      rating: 4.1,
      releaseDate: "Feb 21, 2025",
      status: "released" as const,
    },
    {
      title: "Jurassic World: Rebirth",
      type: "Movie",
      image: "/series/ju.jpeg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Jul 4, 2025",
      status: "released" as const,
    },
    {
      title: "Eleven",
      type: "Movie",
      image: "/series/ele.jpeg?height=450&width=300",
      rating: 3.9,
      releaseDate: "May 16, 2025",
      status: "released" as const,
    },
    {
      title: "Superman",
      type: "Movie",
      image: "/series/suc.jpeg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Jul 11, 2025",
      status: "released" as const,
    },
    {
      title: "Lilo & Stitch",
      type: "Movie",
      image: "/series/ls.jpeg?height=450&width=300",
      rating: 4.6,
      releaseDate: "May 23, 2025",
      status: "released" as const,
    },
    {
      title: "Fantastic 4",
      type: "Movie",
      rating: 4.5,
      image: "/series/fanc.jpeg?height=450&width=300",
      releaseDate: "Jul 25, 2025",
      status: "released" as const,
    },
    {
      title: "Mahavatar Narsimha",
      type: "Movie",
      rating: 4.7,
      image: "/series/ma.jpeg?height=450&width=300",
      releaseDate: "Jul 25, 2025",
      status: "released" as const,
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
    {
      title: "Khakee: The Bengal Chapter",
      type: "Series",
      image: "/series/kk.jpeg?height=450&width=300",
      rating: 4.2,
      releaseDate: "Mar 20, 2025",
      status: "released" as const,
    },
    {
      title: "Panchayat",
      type: "Series",
      image: "/series/panc.jpeg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Jun 24, 2025",
      status: "released" as const,
    },
    {
      title: "Squid Game",
      type: "Series",
      image: "/series/sq.jpeg?height=450&width=300",
      rating: 4.6,
      releaseDate: "Jun 27, 2025",
      status: "released" as const,
    },
    {
      title: "Ironheart",
      type: "Series",
      image: "/series/ir.jpeg?height=450&width=300",
      rating: 3.6,
      releaseDate: "Jun 24, 2025",
      status: "released" as const,
    },
    {
      title: "Criminal Justice",
      type: "Series",
      image: "/series/cr.jpeg?height=450&width=300",
      rating: 4.2,
      releaseDate: "May 29, 2025",
      status: "released" as const,
    },
    {
      title: "The Sandman",
      type: "Series",
      image: "/series/sad.jpeg?height=450&width=300",
      rating: 4.1,
      releaseDate: "Jul 3, 2025",
      status: "released" as const,
    },
    {
      title: "Special OPS 2",
      type: "Series",
      image: "/series/sp.jpeg?height=450&width=300",
      rating: 4.5,
      releaseDate: "Jul 17, 2025",
      status: "released" as const,
    }
  ]

  // Sort movies and series by release date (ascending)
  const sortedMovies = arrivedMovies.sort((a, b) => {
    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  })

  const sortedSeries = arrivedSeries.sort((a, b) => {
    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
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
          <h1 className="text-3xl font-bold">Released in 2025</h1>
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
                  rating={movie.rating}
                  releaseDate={movie.releaseDate}
                  status="released"
                />
              ))}
            </div>
          </div>
        )}

        {(contentType === "all" || contentType === "series") && sortedSeries.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">WebSeries</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
              {sortedSeries.map((series, index) => (
                <MovieCard
                  key={`series-${index}`}
                  title={series.title}
                  type={series.type as "Series"}
                  image={series.image ?? "/placeholder-image.jpg"}
                  rating={series.rating}
                  releaseDate={series.releaseDate}
                  status="released"
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
      <SiteFooter />
    </div>
  )
}