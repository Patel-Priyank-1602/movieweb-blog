"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"

export default function ArrivedPage() {
  const [contentType, setContentType] = useState("all")

  const arrivedContent = [
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
      title: "Temporal Paradox",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.4,
      releaseDate: "May 1, 2025",
      status: "arrived" as const,
    },
    {
      title: "Luminous Descent",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.1,
      releaseDate: "Jan 30, 2025",
      status: "arrived" as const,
    },
    {
      title: "Fractal Minds",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.6,
      releaseDate: "Feb 15, 2025",
      status: "arrived" as const,
    },
    {
      title: "Stellar Enigma",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Mar 10, 2025",
      status: "arrived" as const,
    },
    {
      title: "Cybernetic Dawn",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.9,
      releaseDate: "Apr 20, 2025",
      status: "arrived" as const,
    },
    {
      title: "Quantum Entanglement",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.5,
      releaseDate: "May 5, 2025",
      status: "arrived" as const,
    },
  ]

  // Filter content based on selected type
  const filteredContent =
    contentType === "all"
      ? arrivedContent
      : arrivedContent.filter((item) => (contentType === "movies" ? item.type === "Movie" : item.type === "Series"))

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
          <h1 className="text-3xl font-bold">Arrived in 2025</h1>
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
              rating={movie.rating}
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
