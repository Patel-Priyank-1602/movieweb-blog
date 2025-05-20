"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function TerminalDemo() {
  const [isTyping, setIsTyping] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  const terminalLines = [
    "$ python -m pyshell",
    "PyShell v1.0.0 – The Future of Terminals/CLI",
    "Welcome back, user! Type 'help' to see available commands.",
    "$ help",
    "Available commands:",
    "- calc: Open calculator",
    "- weather: Check weather",
    "- schedule: Manage tasks",
    "- genpass: Generate password",
    "- git: Git dashboard",
    "- music: Play songs",
    "- voice: Activate voice input",
    "- layout: Change terminal layout",
    "- ai: Ask AI assistant",
    "$",
  ]

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      setIsTyping(true)
      const timer = setTimeout(
        () => {
          setVisibleLines((prev) => [...prev, terminalLines[currentLine]])
          setCurrentLine((prev) => prev + 1)
          setIsTyping(false)
        },
        currentLine === 0 ? 500 : 150,
      )

      return () => clearTimeout(timer)
    }
  }, [currentLine, terminalLines])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overflow-hidden rounded-lg border border-border bg-black shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm font-medium text-muted-foreground">PyShell Terminal</div>
        <div className="w-16" />
      </div>
      <div className="p-4 font-mono text-sm text-green-400">
        {visibleLines.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        {isTyping && <span className="inline-block h-4 w-2 animate-blink bg-green-400" />}
      </div>
    </motion.div>
  )
}
