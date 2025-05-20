"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, Star, Award, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Movie, WebSeries } from "@/lib/data"

interface ContentGridProps {
  items: (Movie | WebSeries)[]
  type: "movie" | "series"
}

export function ContentGrid({ items, type }: ContentGridProps) {
  const [selectedItem, setSelectedItem] = useState<Movie | WebSeries | null>(null)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          {type === "movie" ? (
            <Calendar className="h-6 w-6 text-muted-foreground" />
          ) : (
            <Clock className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">No titles available</h3>
        <p className="text-muted-foreground max-w-md">
          {type === "movie"
            ? "There are no movies in this category yet. Check back later for updates."
            : "There are no web series in this category yet. Check back later for updates."}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <ContentCard key={item.id} item={item} index={index} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      <ContentDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </>
  )
}

interface ContentCardProps {
  item: Movie | WebSeries
  index: number
  onClick: () => void
}

function ContentCard({ item, index, onClick }: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-3">
        <Image
          src={item.posterImage || "/placeholder.svg?height=600&width=400"}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <Button size="sm" variant="secondary" className="w-full">
            View Details
          </Button>
        </div>
      </div>

      <h3 className="font-semibold line-clamp-1">{item.title}</h3>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center">
          <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
          <span className="text-sm font-medium">{item.rating}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(item.releaseDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </motion.div>
  )
}

interface ContentDialogProps {
  item: Movie | WebSeries | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ContentDialog({ item, open, onOpenChange }: ContentDialogProps) {
  if (!item) return null

  const isMovie = "director" in item
  const formattedDate = new Date(item.releaseDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="relative h-[200px] sm:h-[250px]">
          <Image
            src={item.backdropImage || "/placeholder.svg?height=1080&width=1920"}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6 p-6">
          <div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">{item.title}</DialogTitle>
              <DialogDescription>
                {isMovie ? "Movie" : "Web Series"} • {formattedDate}
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[180px] md:h-auto md:max-h-[300px] pr-4">
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {isMovie ? (
                  <>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Director</h4>
                      <p className="text-sm text-muted-foreground">{item.director}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Runtime</h4>
                      <p className="text-sm text-muted-foreground">{item.runtime} minutes</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Creator</h4>
                      <p className="text-sm text-muted-foreground">{item.creator}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Seasons</h4>
                      <p className="text-sm text-muted-foreground">{item.seasons}</p>
                    </div>
                  </>
                )}
              </div>

              <h4 className="text-sm font-medium mb-2">Cast</h4>
              <div className="flex flex-wrap gap-1 mb-4">
                {item.cast.map((actor) => (
                  <Badge key={actor} variant="outline">
                    {actor}
                  </Badge>
                ))}
              </div>

              <h4 className="text-sm font-medium mb-2">Genres</h4>
              <div className="flex flex-wrap gap-1">
                {item.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <Image
                src={item.posterImage || "/placeholder.svg?height=600&width=400"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                <span className="font-medium">{item.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">/10</span>
              </div>

              {item.awards > 0 && (
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">
                    {item.awards} {item.awards === 1 ? "award" : "awards"}
                  </span>
                </div>
              )}
            </div>

            <Separator />

            <Button className="w-full">Watch Trailer</Button>

            {isMovie ? (
              <Button variant="outline" className="w-full">
                Add to Watchlist
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                Track Series
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
