"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"
import Loading from "../loading"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contentType, setContentType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for search results
  const allContent = [
    // Movies - Released
    {
      title: "Raid 2",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.8,
      releaseDate: "Mar 10, 2025",
      status: "released" as const,
    },
    {
      title: "Thunderbolt",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.6,
      releaseDate: "Feb 18, 2025",
      status: "released" as const,
    },
    {
      title: "Chhava",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Jan 25, 2025",
      status: "released" as const,
    },
    {
      title: "Final Destination",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.5,
      releaseDate: "Apr 12, 2025",
      status: "released" as const,
    },

    // Movies - Upcoming
    {
      title: "Mission Impossible: Final Reckoning",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jul 30, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Jurassic World: Rebirth",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Aug 15, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Superman",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Oct 10, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Fantastic 4",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Nov 8, 2025",
      status: "upcoming" as const,
    },
    {
      title: "War 2",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Sep 5, 2025",
      status: "upcoming" as const,
    },
    {
      title: "The Conjuring",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Oct 31, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Avatar 3",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Dec 20, 2025",
      status: "upcoming" as const,
    },

    // Series - Released
    {
      title: "You",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.7,
      releaseDate: "Feb 10, 2025",
      status: "released" as const,
    },
    {
      title: "Adolescence",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.2,
      releaseDate: "Mar 5, 2025",
      status: "released" as const,
    },
    {
      title: "Pataal Lok",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.9,
      releaseDate: "Jan 15, 2025",
      status: "released" as const,
    },
    {
      title: "The Last of Us",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.8,
      releaseDate: "Apr 2, 2025",
      status: "released" as const,
    },
    {
      title: "Daredevil",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.6,
      releaseDate: "May 1, 2025",
      status: "released" as const,
    },

    // Series - Upcoming
    {
      title: "Stranger Things",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Dec 15, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Alice in Borderland",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Aug 25, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Panchayat",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jun 20, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Squid Game",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Sep 15, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Wednesday",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Oct 25, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Family Man",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Nov 10, 2025",
      status: "upcoming" as const,
    },
  ]

  // Filter content based on search query and content type
  const filteredContent = allContent.filter((item) => {
    const matchesSearch = searchQuery === "" || item.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      contentType === "all" || (contentType === "movies" ? item.type === "Movie" : item.type === "Series")

    return matchesSearch && matchesType
  })

  if (isLoading) {
    return <Loading />
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

        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
            {filteredContent.map((item, index) => (
              <MovieCard
                key={index}
                title={item.title}
                type={item.type as "Movie" | "Series"}
                image={item.image}
                rating={item.rating}
                releaseDate={item.releaseDate}
                status={item.status}
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
