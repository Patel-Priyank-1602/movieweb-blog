"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"
import Loading from "../loading"
import { SiteFooter } from "@/components/footer"
import Navbar from "@/components/nav"

// Utility function to parse and normalize release dates
function parseReleaseDate(dateStr: string): Date {
  // Handle approximate dates like "Oct - Nov, 2025" or "Late 2025"
  const normalizedDate = dateStr
    .replace("Jan", "January")
    .replace("Feb", "February")
    .replace("Mar", "March")
    .replace("Apr", "April")
    .replace("Sept", "September")
    .replace("Oct - Nov", "October") // Take first month for ranges
    .replace("Late ", "")
    .trim()

  // Parse the date, assuming day as 1 if not provided
  const parsedDate = new Date(normalizedDate.includes(" ") ? normalizedDate : `1 ${normalizedDate}`)
  return isNaN(parsedDate.getTime()) ? new Date("9999-12-31") : parsedDate // Fallback for invalid dates
}

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
      title: "How to Train Your Dragon",
      type: "Movie",
      image: "/series/htt.jpeg?height=450&width=300",
      rating: 4.4,
      releaseDate: "Jun 13, 2025",
      status: "released" as const
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
    // Movies - Upcoming
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
    // Series - Upcoming
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
  ]

  // Filter content based on search query and content type
  const filteredContent = allContent.filter((item) => {
    const matchesSearch = searchQuery === "" || item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType =
      contentType === "all" || (contentType === "movies" ? item.type === "Movie" : item.type === "Series")
    return matchesSearch && matchesType
  })

  // Separate movies and series, and sort by release date
  const movies = filteredContent
    .filter((item) => item.type === "Movie")
    .sort((a, b) => parseReleaseDate(a.releaseDate).getTime() - parseReleaseDate(b.releaseDate).getTime())
  const series = filteredContent
    .filter((item) => item.type === "Series")
    .sort((a, b) => parseReleaseDate(a.releaseDate).getTime() - parseReleaseDate(b.releaseDate).getTime())

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
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search titles..."
              className="pl-9 bg-gray-900 border-gray-800 focus-visible:ring-primary w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button> */}
          <Tabs value={contentType} onValueChange={setContentType} className="w-full md:w-[300px]">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filteredContent.length > 0 ? (
          <div className="space-y-12">
            {/* Movies Section */}
            {contentType !== "series" && movies.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Movies</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                  {movies.map((item, index) => (
                    <MovieCard
                      key={`movie-${index}`}
                      title={item.title}
                      type={item.type as "Movie" | "Series"}
                      image={item.image}
                      rating={item.rating}
                      releaseDate={item.releaseDate}
                      status={item.status}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Series Section */}
            {contentType !== "movies" && series.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">WebSeries</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                  {series.map((item, index) => (
                    <MovieCard
                      key={`series-${index}`}
                      title={item.title}
                      type={item.type as "Movie" | "Series"}
                      image={item.image}
                      rating={item.rating}
                      releaseDate={item.releaseDate}
                      status={item.status}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results for Specific Type */}
            {contentType === "movies" && movies.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No movies found</h2>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
            {contentType === "series" && series.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No series found</h2>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
            {contentType === "all" && movies.length === 0 && series.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      <SiteFooter /> {/* Use SiteFooter instead of Footer */}
    </div>
  )
}