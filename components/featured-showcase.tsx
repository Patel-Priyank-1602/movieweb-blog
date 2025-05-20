"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { PlayCircle, Info } from "lucide-react"
import Link from "next/link"

export default function FeaturedShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const featuredContent = [
    {
      id: 1,
      title: "Quantum Horizon",
      description:
        "In the year 2150, a team of scientists discovers a way to manipulate quantum reality, but their breakthrough threatens to unravel the fabric of existence itself.",
      image: "/placeholder.svg?height=600&width=1200",
      type: "Movie",
      releaseDate: "January 15, 2025",
      status: "arrived",
      slug: "quantum-horizon",
    },
    {
      id: 2,
      title: "Neon Dynasty",
      description:
        "In a cyberpunk metropolis ruled by corporate AI, a group of hackers fights to expose the dark secrets of the system that controls their lives.",
      image: "/placeholder.svg?height=600&width=1200",
      type: "Series",
      releaseDate: "February 3, 2025",
      status: "arrived",
      slug: "neon-dynasty",
    },
    {
      id: 3,
      title: "Nebula Chronicles",
      description:
        "An interstellar saga following the crew of the starship Artemis as they navigate uncharted space and encounter ancient civilizations.",
      image: "/placeholder.svg?height=600&width=1200",
      type: "Series",
      releaseDate: "June 18, 2025",
      status: "upcoming",
      slug: "nebula-chronicles",
    },
  ]

  const featured = featuredContent[currentIndex]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center (normalized)
      setMouseX((e.clientX - centerX) / 50)
      setMouseY((e.clientY - centerY) / 50)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-out"
          style={{
            backgroundImage: `url(${featured.image})`,
            transform: `translateX(${mouseX}px) translateY(${mouseY}px) scale(1.05)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative h-full container flex flex-col justify-end pb-16">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                featured.status === "arrived" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {featured.status === "arrived" ? "Now Available" : "Coming Soon"}
            </span>
            <span className="text-sm text-gray-300">{featured.type}</span>
            <span className="text-sm text-gray-300">{featured.releaseDate}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">{featured.title}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{featured.description}</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="gap-2">
              <PlayCircle className="h-5 w-5" />
              {featured.status === "arrived" ? "Watch Now" : "Watch Trailer"}
            </Button>
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
