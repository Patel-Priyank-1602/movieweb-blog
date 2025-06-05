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
      image: "/series/radc.jpeg?height=450&width=300",
      rating: 4.8,
      releaseDate: "Mar 1, 2025",
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
    {
      title: "Ballerina",
      type: "Movie",
      image: "/series/ban.jpeg?height=450&width=300",
      rating: 4.7,
      releaseDate: "June 6, 2025",
      status: "released" as const
    },
    {
      title: "Captain America: Brave New World",
      type: "Movie",
      image: "/series/cam.jpeg?height=450&width=300",
      rating: 4.1,
      releaseDate: "February 14, 2025",
      status: "released" as const
    },

    // Movies - Upcoming
    {
      title: "Jurassic World: Rebirth",
      type: "Movie",
      image: "/series/ju.jpeg?height=450&width=300",
      releaseDate: "Jul 4, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Superman",
      type: "Movie",
      image: "/series/suc.jpeg?height=450&width=300",
      releaseDate: "Jul 11, 2025",
      status: "upcoming" as const,
    },
    {
      title: "Fantastic 4",
      type: "Movie",
      image: "/series/fanc.jpeg?height=450&width=300",
      releaseDate: "Jul 25, 2025",
      status: "upcoming" as const,
    },
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
    },

    // Series - Released
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
      rating: 4.1,
      releaseDate: "March 20, 2025",
      status: "released" as const
    },

    // Series - Upcoming
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
