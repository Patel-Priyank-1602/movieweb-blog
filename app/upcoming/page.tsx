"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"
import Loading from "../loading"

export default function UpcomingPage() {
  const [contentType, setContentType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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
    {
      title: "28 Years Later",
      type: "Movie",
      image: "/series/28y.jpeg?height=450&width=300",
      releaseDate: "June 20, 2025",
      status: "upcoming" as const
    },
    {
      title: "Zootopia 2",
      type: "Movie",
      image: "/series/zoo.jpeg?height=450&width=300",
      releaseDate: "November 26, 2025",
      status: "upcoming" as const
    },
    {
      title: "The Bad Guys 2",
      type: "Movie",
      image: "/series/bd.jpeg?height=450&width=300",
      releaseDate: "August 1, 2025",
      status: "upcoming" as const
    }
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
    {
      title: "The Witcher",
      type: "Series",
      image: "/series/wi.jpeg?height=450&width=300",
      releaseDate: "Late 2025",
      status: "upcoming" as const
    },
    {
      title: "Ironheart",
      type: "Series",
      image: "/series/ir.jpeg?height=450&width=300",
      releaseDate: "June 24, 2025",
      status: "upcoming" as const
    },
    {
      title: "The Sandman",
      type: "Series",
      image: "/series/sad.jpeg?height=450&width=300",
      releaseDate: "July 3, 2025",
      status: "upcoming" as const
    }
  ]

  // Filter content based on selected type
  const filteredContent =
    contentType === "all"
      ? [...upcomingMovies, ...upcomingSeries]
      : contentType === "movies"
        ? upcomingMovies
        : upcomingSeries

  if (isLoading) {
    return <Loading onComplete={function (): void {
      throw new Error("Function not implemented.")
    } } />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container py-8">
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
          <Link href="/search" className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
            <Input
              placeholder="Search titles..."
              className="pl-9 bg-gray-900 border-gray-800 focus-visible:ring-primary"
              readOnly
            />
          </Link>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Tabs value={contentType} onValueChange={setContentType} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
          {filteredContent.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              type={movie.type as "Movie" | "Series"}
              image={movie.image}
              releaseDate={movie.releaseDate}
              status="upcoming"
            />
          ))}
          {filteredContent.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-400">
                No {contentType === "movies" ? "movies" : "series"} available in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
