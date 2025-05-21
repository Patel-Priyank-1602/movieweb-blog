import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, PlayCircle, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface MovieCardProps {
  title: string
  type: "Movie" | "Series"
  image: string
  rating?: number
  releaseDate: string
  status: "released" | "upcoming"
}

export default function MovieCard({ title, type, image, rating, releaseDate, status }: MovieCardProps) {
  // Convert title to slug format for URL
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")

  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[2/3] group">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-primary"
          >
            <PlayCircle className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="sr-only">Watch {title}</span>
          </Button>
        </div>
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className={
              status === "released"
                ? "bg-green-900/30 text-green-400 hover:bg-green-900/30 border-green-800 text-xs"
                : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/30 border-blue-800 text-xs"
            }
          >
            {status === "released" ? "Released" : "Upcoming"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-2 sm:p-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-800 text-xs">
              {type}
            </Badge>
            {rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500" />
                <span className="text-xs sm:text-sm font-medium">{rating}</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold text-sm sm:text-lg leading-tight line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
            <CalendarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="line-clamp-1">{releaseDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 sm:p-4 sm:pt-0">
        <Link href={`/${status}/${slug}`} className="w-full">
          <Button variant="ghost" size="sm" className="w-full justify-start hover:text-primary text-xs sm:text-sm">
            More Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
