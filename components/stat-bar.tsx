"use client"

import { motion } from "framer-motion"

interface StatBarProps {
  label: string
  value: string
  delay?: number
}

export default function StatBar({ label, value, delay = 0 }: StatBarProps) {
  // Extract numeric value if present
  const numericValue = Number.parseInt(value.toString().replace(/[^0-9]/g, ""))

  // Calculate width percentage based on the type of stat
  const getPercentage = () => {
    if (label.includes("Runs")) {
      // For runs, scale based on typical IPL career runs (max ~6000)
      return Math.min((numericValue / 6000) * 100, 100)
    } else if (label.includes("Wickets")) {
      // For wickets, scale based on typical IPL career wickets (max ~200)
      return Math.min((numericValue / 200) * 100, 100)
    } else if (label.includes("Average")) {
      // For batting average, scale based on 60 being excellent
      return Math.min((numericValue / 60) * 100, 100)
    } else if (label.includes("Strike Rate")) {
      // For batting strike rate, scale based on 180 being excellent
      return Math.min((numericValue / 180) * 100, 100)
    } else if (label.includes("Economy")) {
      // For bowling economy, lower is better, so invert (6 is average)
      const economyValue = Number.parseFloat(value)
      return Math.max(100 - (economyValue / 12) * 100, 10)
    } else {
      // Default scaling
      return 70
    }
  }

  const percentage = getPercentage()

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
