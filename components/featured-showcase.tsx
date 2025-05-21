"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { PlayCircle, Info } from "lucide-react"
import Link from "next/link"

export default function FeaturedShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const featuredContent = [
    {
      id: 1,
      title: "Stranger Things",
      description:
        "The fifth and final season of the beloved sci-fi series brings the story of Hawkins to an epic conclusion as the friends face their greatest challenge yet against the forces of the Upside Down.",
      image: "/series/stt.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "December 15, 2025",
      status: "upcoming",
      slug: "stranger-things",
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Raid 2",
      description:
        "The sequel to the hit action film follows an undercover agent infiltrating a powerful crime syndicate to expose corruption at the highest levels of government.",
      image: "/placeholder.svg?height=600&width=1200",
      type: "Movie",
      releaseDate: "March 10, 2025",
      status: "released",
      slug: "raid-2",
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Alice in Borderland",
      description:
        "In the third season, survivors of the deadly games must face new challenges as they uncover the truth behind the mysterious world they're trapped in.",
      image: "/series/aibbb.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "August 25, 2025",
      status: "upcoming",
      slug: "alice-in-borderland",
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Thunderbolt",
      description:
        "A brilliant engineer develops a revolutionary technology that harnesses lightning as an unlimited energy source, but powerful interests will stop at nothing to control it.",
      image: "/placeholder.svg?height=600&width=1200",
      type: "Movie",
      releaseDate: "February 18, 2025",
      status: "released",
      slug: "thunderbolt",
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Avatar 3",
      description:
        "Return to Pandora as Jake Sully and Neytiri continue their journey, exploring new regions of the planet and facing a threat that tests the bonds of their family and the Na'vi people.",
      image: "/placeholder.svg?height=600&width=1200",
      type: "Movie",
      releaseDate: "December 20, 2025",
      status: "upcoming",
      slug: "avatar-3",
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ]

  const featured = featuredContent[currentIndex]

  // Auto-rotate featured content every 3.5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)
      }, 3500)
    }

    // Start the interval initially
    startInterval()

    // Get the container element
    const container = containerRef.current

    // Add event listeners to pause/resume on hover
    if (container) {
      container.addEventListener("mouseenter", () => clearInterval(interval))
      container.addEventListener("mouseleave", startInterval)
    }

    return () => {
      clearInterval(interval)
      if (container) {
        container.removeEventListener("mouseenter", () => clearInterval(interval))
        container.removeEventListener("mouseleave", startInterval)
      }
    }
  }, [featuredContent.length])

  return (
    <div className="relative w-full h-[70vh] overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${featured.image})`,
            opacity: 1,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative h-full container flex flex-col justify-end pb-16">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                featured.status === "released" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {featured.status === "released" ? "Now Available" : "Coming Soon"}
            </span>
            <span className="text-sm text-gray-300">{featured.type}</span>
            <span className="text-sm text-gray-300">{featured.releaseDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{featured.title}</h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl">{featured.description}</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href={featured.trailerUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <PlayCircle className="h-5 w-5" />
                {featured.status === "released" ? "Watch Now" : "Watch Trailer"}
              </Button>
            </a>
            <Link href={`/${featured.status}/${featured.slug}`}>
              <Button size="lg" variant="outline" className="gap-2">
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-600"}`}
              aria-label={`View featured content ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
