"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { featuredContent } from "@/lib/data"

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === featuredContent.length - 1 ? 0 : prevIndex + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const current = featuredContent[currentIndex]

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={current.backdropImage || "/placeholder.svg?height=1080&width=1920"}
          alt={current.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit">
              {current.type === "movie" ? "Featured Movie" : "Featured Series"}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{current.title}</h1>

            <p className="text-muted-foreground max-w-md md:text-lg">{current.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="w-full sm:w-auto">
                Watch Trailer
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                More Details
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      alt="User avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">94% match</span> with your preferences
              </p>
            </div>
          </motion.div>

          <motion.div
            key={`poster-${current.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[2/3] w-full max-w-[300px] mx-auto md:ml-auto md:mr-0 rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src={current.posterImage || "/placeholder.svg?height=600&width=400"}
              alt={current.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-primary" : "w-4 bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
