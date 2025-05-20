"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"

// Mock data for search results
const allMovies = [
  {
    title: "Quantum Horizon",
    type: "Movie",
    image: "/placeholder.svg?height=450&width=300",
    rating: 4.8,
    releaseDate: "Jan 15, 2025",
    status: "arrived" as const,
  },
  {
    title: "Neon Dynasty",
    type: "Series",
    image: "/placeholder.svg?height=450&width=300",
    rating: 4.5,
    releaseDate: "Feb 3, 2025",
    status: "arrived" as const,
  },
  {
    title: "Ethereal Echoes",
    type: "Movie",
    image: "/placeholder.svg?height=450&width=300",
    rating: 4.2,
    releaseDate: "Mar 22, 2025",
    status: "arrived" as const,
  },
  {
    title: "Celestial Odyssey",
    type: "Series",
    image: "/placeholder.svg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Apr 5, 2025",
    status: "arrived" as const,
  },
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
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contentType, setContentType] = useState("all")
  const [filteredMovies, setFilteredMovies] = useState(allMovies)

  // Filter movies based on search query and content type
  useEffect(() => {
    let results = allMovies

    // Filter by search query
    if (searchQuery) {
      results = results.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by content type
    if (contentType !== "all") {
      results = results.filter((movie) => (contentType === "movies" ? movie.type === "Movie" : movie.type === "Series"))
    }

    setFilteredMovies(results)
  }, [searchQuery, contentType])

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
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search titles..."
              className="pl-9 bg-gray-900 border-gray-800 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                type={movie.type}
                image={movie.image}
                rating={movie.rating}
                releaseDate={movie.releaseDate}
                status={movie.status}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
