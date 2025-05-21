"use client"

import { useEffect, useState } from "react"
import { Film } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex items-center gap-2 mb-8 animate-pulse">
        <Film className="h-10 w-10 text-primary" />
        <span className="text-3xl font-bold text-white">CineVerse 2025</span>
      </div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-2000 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-4 text-gray-400">Loading amazing content...</p>
    </div>
  )
}
