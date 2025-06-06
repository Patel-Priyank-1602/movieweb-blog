"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { PlayCircle, Info, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import YouTube, { YouTubeProps } from "react-youtube"

interface FeaturedContent {
  id: number
  title: string
  description: string
  image: string
  type: "Movie" | "Series"
  releaseDate: string
  status: "released" | "upcoming"
  slug: string
  trailerUrl: string
}

export default function FeaturedShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const featuredContent: FeaturedContent[] = [
    {
      id: 1,
      title: "Stranger Things",
      description:
        "The fifth and final season of the beloved sci-fi series brings the story of Hawkins to an epic conclusion as the friends face their greatest challenge yet against the forces of the Upside Down.",
      image: "/series/sttt.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "October - November, 2025",
      status: "upcoming",
      slug: "stranger-things",
      trailerUrl: "https://youtu.be/QlYrNC_1Xmk?si=Ps2bq-3gXZsncNCr",
    },
    {
      id: 2,
      title: "Panchayat",
      description:
        "The fourth season of this beloved Indian comedy-drama continues to follow Abhishek Tripathi, the secretary of the Phulera village panchayat, as he navigates rural life and village administration.",
      image: "/series/pan.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "July 2, 2025",
      status: "upcoming",
      slug: "panchayat",
      trailerUrl: "https://youtu.be/URBN7HNf7T4?si=0Ezw0dGHJmC5i_Cd",
    },
    {
      id: 3,
      title: "Alice in Borderland",
      description:
        "In the third season of this Japanese thriller, survivors of the deadly games must face new challenges as they uncover the truth behind the mysterious world they're trapped in.",
      image: "/series/aibbb.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "September, 2025",
      status: "upcoming",
      slug: "alice-in-borderland",
      trailerUrl: "https://youtu.be/HQtrqkKkq7E?si=K1uihqMEx55NAN0V",
    },
    {
      id: 4,
      title: "Final Destination Bloodlines",
      description:
        "The latest installment in the popular horror franchise follows a new group of survivors who cheat death after one of them has a premonition about a catastrophic event.",
      image: "/series/fdd.jpeg?height=600&width=1200",
      type: "Movie",
      releaseDate: "May 16, 2025",
      status: "released",
      slug: "final-destination",
      trailerUrl: "https://youtu.be/UWMzKXsY9A4?si=zLqRiBGlkzReUe1G",
    },
    {
      id: 5,
      title: "Avatar 3",
      description:
        "Return to Pandora as Jake Sully and Neytiri continue their journey, exploring new regions of the planet and facing a threat that tests the bonds of their family and the Na'vi people.",
      image: "/series/avvv.jpeg?height=600&width=1200",
      type: "Movie",
      releaseDate: "December 19, 2025",
      status: "upcoming",
      slug: "avatar-3",
      trailerUrl: "",
    },
  ]

  const featured = featuredContent[currentIndex]

  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const youtubeId = featured.trailerUrl ? getYouTubeId(featured.trailerUrl) : null

  // YouTube player options
  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  }

  // Auto-rotate featured content every 3.5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)
      }, 3500)
    }

    const stopInterval = () => clearInterval(interval)

    // Start the interval initially
    startInterval()

    // Get the container element
    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", stopInterval)
      container.addEventListener("mouseleave", startInterval)
    }

    return () => {
      stopInterval()
      if (container) {
        container.removeEventListener("mouseenter", stopInterval)
        container.removeEventListener("mouseleave", startInterval)
      }
    }
  }, [featuredContent.length])

  return (
    <div className="relative w-full h-[70vh] overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0">
        <Image
          src={featured.image}
          alt={`${featured.title} background`}
          fill
          className="object-cover transition-opacity duration-1000"
          priority={currentIndex === 0}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative h-full container flex flex-col justify-end pb-16">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                featured.status === "released"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {featured.status === "released" ? "Now Available" : "Coming Soon"}
            </span>
            <span className="text-sm text-gray-300">{featured.type}</span>
            <span className="text-sm text-gray-300">{featured.releaseDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{featured.title}</h1>
          {/* Hide description on mobile (below md breakpoint), show on desktop */}
          <p className="hidden md:block text-base sm:text-lg text-gray-300 max-w-2xl">{featured.description}</p>

          <div className="flex flex-nowrap gap-2 pt-4">
            {youtubeId ? (
              <Button size="sm" className="gap-2 md:h-11 md:rounded-md md:px-8" onClick={() => setIsTrailerOpen(true)}>
                <PlayCircle className="h-4 w-4 md:h-5 md:w-5" />
                {featured.status === "released" ? "Watch Now" : "Watch Trailer"}
              </Button>
            ) : (
              <Button size="sm" className="gap-2 md:h-11 md:px-8" disabled>
                <PlayCircle className="h-4 w-4 md:h-5 md:w-5" />
                Trailer Unavailable
              </Button>
            )}
            <Link href={`/${featured.status}/${featured.slug}`}>
              <Button size="sm" variant="secondary" className="gap-2 md:h-11 md:px-8">
                <Info className="h-4 w-4 md:h-5 md:w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredContent.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(item.id - 1)}
              className={`w-3 h-3 rounded-full ${
                item.id - 1 === currentIndex ? "bg-white" : "bg-gray-600"
              }`}
              aria-label={`View ${item.title} featured content`}
            />
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      {isTrailerOpen && youtubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
              onClick={() => setIsTrailerOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close trailer</span>
            </Button>
            <div className="relative aspect-video">
              <YouTube videoId={youtubeId} opts={opts} className="absolute inset-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}