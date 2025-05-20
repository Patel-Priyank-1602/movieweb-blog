"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { Player } from "@/lib/data"
import { Button } from "@/components/ui/button"
import StatBar from "@/components/stat-bar"

interface PlayerListProps {
  players: Player[]
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="space-y-32 mb-16">
      {players.map((player, index) => (
        <PlayerItem key={player.id} player={player} index={index} />
      ))}
    </div>
  )
}

function PlayerItem({ player, index }: { player: Player; index: number }) {
  const isEven = index % 2 === 0
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const imageVariants = {
    hidden: { opacity: 0, x: isEven ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const statsVariants = {
    hidden: { opacity: 0, x: isEven ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  }

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  }

  // Alternating number styles
  const rankStyle = isEven
    ? "absolute -left-6 -top-6 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center font-bold text-2xl z-10 shadow-lg"
    : "absolute -left-6 -top-6 bg-gradient-to-br from-secondary to-secondary/70 text-secondary-foreground rounded-md w-14 h-14 flex items-center justify-center font-bold text-2xl z-10 shadow-lg transform rotate-6"

  // Get the top 3 stats for this player
  const getTopStats = () => {
    const statEntries = Object.entries(player.stats)
    const primaryStats = statEntries.slice(0, 3)
    const secondaryStats = statEntries.slice(3)
    return { primaryStats, secondaryStats }
  }

  const { primaryStats, secondaryStats } = getTopStats()

  return (
    <div ref={ref} className="relative">
      <div className={rankStyle}>{index + 1}</div>
      <motion.div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8 items-center bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="w-full md:w-1/2" initial="hidden" animate={controls} variants={imageVariants}>
          <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-muted bg-gradient-to-b from-muted/50 to-muted">
            <Image
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-primary-foreground">
                  {player.team}
                </div>
                <div className="bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-secondary-foreground">
                  {player.country}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="w-full md:w-1/2 space-y-4" initial="hidden" animate={controls} variants={statsVariants}>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {player.name}
            </h2>
            <p className="text-muted-foreground">{player.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {primaryStats.map(([key, value], i) => (
              <StatBar key={key} label={key} value={value} delay={i * 0.1} />
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">Career: {player.careerSpan}</div>
              <div className="flex items-center bg-muted px-3 py-1 rounded-full">
                <div className="text-yellow-500 mr-1">★</div>
                <div className="font-bold">{player.rating}/10</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 flex items-center justify-center"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  Hide Details <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Show Details <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t"
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {secondaryStats.map(([key, value]) => (
                  <div key={key} className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">{key}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
                <div className="sm:col-span-2 bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Career Highlights</div>
                  <div className="font-medium">{player.highlights}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
