"use client"

import React from "react"
import { useEffect, useState } from "react"
import { Film } from "lucide-react"

export default function Loading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [currentPhase, setCurrentPhase] = useState(0)

  const fullText = "CineVerse 2025"
  const tagline = "Your Movie & WebSeries Planner"
  const phases = [
    "Initializing streaming engine...",
    "Loading premium content...",
    "Preparing your experience...",
    "Almost ready..."
  ]

  useEffect(() => {
    const duration = 3000 // 4 seconds total
    const frameRate = 50
    const progressStep = 100 / (duration / frameRate)
    const charsPerFrame = fullText.length / (duration / 200)

    let currentProgress = 0
    let currentCharIndex = 0
    let phaseTimer = 0

    const interval = setInterval(() => {
      // Update progress
      currentProgress = Math.min(currentProgress + progressStep, 100)
      setProgress(currentProgress)

      // Update text animation
      if (currentCharIndex < fullText.length && currentProgress < 40) {
        const newCharIndex = Math.min(
          Math.floor(currentCharIndex + charsPerFrame),
          fullText.length
        )
        setDisplayedText(fullText.slice(0, newCharIndex))
        currentCharIndex += charsPerFrame
      } else if (currentProgress >= 40) {
        setDisplayedText(fullText)
      }

      // Update phases
      phaseTimer++
      if (phaseTimer % 20 === 0) { // Change phase every second
        setCurrentPhase(prev => Math.min(prev + 1, phases.length - 1))
      }

      // Check for completion
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 800)
      }
    }, frameRate)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background subtle elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#6224c3] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-[#6224c3] rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo section */}
        <div className="flex flex-row items-center gap-3 mb-4 animate-fade-in">
          <Film className="h-10 w-10 text-[#6224c3] drop-shadow-lg" />
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="text-white">{displayedText.slice(0, 8)}</span>
            <span className="text-[#6224c3]">{displayedText.slice(8)}</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-gray-300 text-lg sm:text-xl font-medium mb-12 tracking-wide">
          {tagline}
        </p>

        {/* Progress section */}
        <div className="flex flex-col items-center w-80 sm:w-96">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden mb-4 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#6224c3] via-[#7e3ff2] to-[#a780ff] rounded-full transition-all duration-100 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-30 blur-sm animate-shine" />
            </div>
          </div>

          {/* Progress percentage and phase */}
          <div className="flex justify-between items-center w-full text-sm">
            <span className="text-gray-400 font-mono">{Math.round(progress)}%</span>
            <span className="text-gray-300 font-medium">{phases[currentPhase]}</span>
          </div>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-500 text-xs font-light tracking-widest">
          POWERED BY CINEVERSE TECHNOLOGY
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-shine {
          animation: shine 2s infinite linear;
        }
      `}</style>
    </div>
  )
}