import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"

interface MovieCardProps {
  title: string
  type: "Movie" | "Series"
  image: string
  rating?: number
  releaseDate: string
  status: "released" | "upcoming"
  slug?: string
}

export default function MovieCard({ title, type, image, rating, releaseDate, status, slug }: MovieCardProps) {
  // Convert title to slug format for URL if not provided
  const movieSlug = slug || title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")

  return (
    <Link href={`/${status}/${movieSlug}`} className="block">
      <Card className="overflow-hidden bg-gray-900 border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 cursor-pointer">
        <div className="relative aspect-[2/3] group">
          <Image 
            src={image || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  )
}