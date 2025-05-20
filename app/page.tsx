"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Film, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedShowcase from "@/components/featured-showcase"
import MovieCard from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [contentType, setContentType] = useState("all")

  type ContentType = "Movie" | "Series";
  type ContentStatus = "arrived" | "upcoming";

  interface ArrivedContent {
    title: string;
    type: ContentType;
    image: string;
    rating: number;
    releaseDate: string;
    status: "arrived";
  }

  interface UpcomingContent {
    title: string;
    type: ContentType;
    image: string;
    releaseDate: string;
    status: "upcoming";
  }

  const arrivedContent: ArrivedContent[] = [
    {
      title: "Quantum Horizon",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.8,
      releaseDate: "Jan 15, 2025",
      status: "arrived",
    },
    {
      title: "Neon Dynasty",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.5,
      releaseDate: "Feb 3, 2025",
      status: "arrived",
    },
    {
      title: "Ethereal Echoes",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.2,
      releaseDate: "Mar 22, 2025",
      status: "arrived",
    },
    {
      title: "Celestial Odyssey",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.7,
      releaseDate: "Apr 5, 2025",
      status: "arrived",
    },
    {
      title: "Temporal Paradox",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      rating: 4.4,
      releaseDate: "May 1, 2025",
      status: "arrived",
    },
  ];

  const upcomingContent: UpcomingContent[] = [
    {
      title: "Nebula Chronicles",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jun 18, 2025",
      status: "upcoming",
    },
    {
      title: "Astral Convergence",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Jul 30, 2025",
      status: "upcoming",
    },
    {
      title: "Synthetic Dreams",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Aug 12, 2025",
      status: "upcoming",
    },
    {
      title: "Prism Protocol",
      type: "Movie",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Sep 25, 2025",
      status: "upcoming",
    },
    {
      title: "Void Whispers",
      type: "Series",
      image: "/placeholder.svg?height=450&width=300",
      releaseDate: "Oct 31, 2025",
      status: "upcoming",
    },
  ];

  // Filter content based on selected type
  const filteredArrived =
    contentType === "all"
      ? arrivedContent
      : arrivedContent.filter((item) => (contentType === "movies" ? item.type === "Movie" : item.type === "Series"))

  const filteredUpcoming =
    contentType === "all"
      ? upcomingContent
      : upcomingContent.filter((item) => (contentType === "movies" ? item.type === "Movie" : item.type === "Series"))

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
            <Link href="/arrived" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Arrived
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
                    Arrived
                  </Badge>
                  <span>Already Released</span>
                </h3>
                <Link href="/arrived" className="text-sm text-primary flex items-center">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredArrived.map((movie, index) => (
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
                {filteredArrived.length === 0 && (
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredUpcoming.map((movie, index) => (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    type={movie.type}
                    image={movie.image}
                    releaseDate={movie.releaseDate}
                    status={movie.status}
                  />
                ))}
                {filteredUpcoming.length === 0 && (
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
              <h2 className="text-3xl font-bold">Stay Updated with 2025 Releases</h2>
              <p className="text-gray-400">Get notified when new movies and web series are added to our collection.</p>
              <div className="flex gap-4 justify-center mt-6">
                <Button size="lg">Subscribe</Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
