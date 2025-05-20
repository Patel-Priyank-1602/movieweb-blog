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
  status: "arrived" | "upcoming"
}

export default function MovieCard({ title, type, image, rating, releaseDate, status }: MovieCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[2/3] group">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-black/60 text-white hover:bg-black/80 hover:text-primary"
          >
            <PlayCircle className="h-10 w-10" />
            <span className="sr-only">Watch {title}</span>
          </Button>
        </div>
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className={
              status === "arrived"
                ? "bg-green-900/30 text-green-400 hover:bg-green-900/30 border-green-800"
                : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/30 border-blue-800"
            }
          >
            {status === "arrived" ? "Released" : "Upcoming"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-800">
              {type}
            </Badge>
            {rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{releaseDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/${status}/${title.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
          <Button variant="ghost" className="w-full justify-start hover:text-primary">
            More Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
