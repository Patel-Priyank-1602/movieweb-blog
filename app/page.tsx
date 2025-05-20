"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ContentGrid } from "@/components/content-grid"
import { HeroSection } from "@/components/hero-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { movies, webSeries } from "@/lib/data"

export default function Home() {
  const [contentType, setContentType] = useState<"movies" | "webSeries">("movies")
  const [releaseStatus, setReleaseStatus] = useState<"arrived" | "arriving">("arrived")

  // Use the current date for comparison
  const currentDate = new Date()

  // Filter movies based on release status
  const filteredMovies = movies.filter((movie) =>
    releaseStatus === "arrived"
      ? new Date(movie.releaseDate) <= currentDate
      : new Date(movie.releaseDate) > currentDate,
  )

  // Filter web series based on release status
  const filteredWebSeries = webSeries.filter((series) =>
    releaseStatus === "arrived"
      ? new Date(series.releaseDate) <= currentDate
      : new Date(series.releaseDate) > currentDate,
  )

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24">
          <Tabs
            defaultValue="movies"
            className="w-full"
            onValueChange={(value) => setContentType(value as "movies" | "webSeries")}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
                Top {contentType === "movies" ? "Movies" : "Web Series"} of 2025
              </h2>
              <TabsList className="self-start">
                <TabsTrigger value="movies" className="text-base">
                  Movies
                </TabsTrigger>
                <TabsTrigger value="webSeries" className="text-base">
                  Web Series
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setReleaseStatus("arrived")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    releaseStatus === "arrived" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  Already Arrived
                </button>
                <button
                  onClick={() => setReleaseStatus("arriving")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    releaseStatus === "arriving" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  Coming Soon
                </button>
              </div>

              <p className="text-muted-foreground">
                {releaseStatus === "arrived"
                  ? "Titles that have already been released in 2025"
                  : "Upcoming titles scheduled for release later in 2025"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <TabsContent value="movies" className="mt-0">
                <motion.div
                  key="movies"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContentGrid items={filteredMovies} type="movie" />
                </motion.div>
              </TabsContent>

              <TabsContent value="webSeries" className="mt-0">
                <motion.div
                  key="webSeries"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContentGrid items={filteredWebSeries} type="series" />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
