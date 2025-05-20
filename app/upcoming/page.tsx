"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"

export default function UpcomingPage() {
  const [contentType, setContentType] = useState("all")

  const upcomingContent = [
    {
      title: "Nebula Chronicles",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jun 18, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Astral Convergence",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jul 30, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Synthetic Dreams",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Aug 12, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Prism Protocol",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Sep 25, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Void Whispers",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Oct 31, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Holographic Memories",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jun 5, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Quantum Nexus",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jul 15, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Celestial Architects",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Aug 28, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Neural Cascade",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Sep 10, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Chronos Paradox",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Nov 15, 2025",
      status: "upcoming" as const,
    },
  ]

  // Filter content based on selected type
  const filteredContent =
    contentType === "all"
      ? upcomingContent
      : upcomingContent.filter((item) => (contentType === "movies" ? item.type === "Movie" : item.type === "Series"))

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredContent.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              type={movie.type}
              image={movie.image}
              releaseDate={movie.releaseDate}
              status={movie.status}
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

        <div className="flex justify-center mt-12">
          <Button variant="outline" className="gap-2">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}
