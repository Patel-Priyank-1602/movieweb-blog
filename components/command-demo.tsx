"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

export function CommandDemo() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"install" | "usage" | "config">("install")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getContent = () => {
    switch (activeTab) {
      case "install":
        return "pip install pyshell"
      case "usage":
        return "python -m pyshell"
      case "config":
        return `# ~/.pyshell/config.yaml
theme: monokai
plugins:
  - git-integration
  - voice-control
  - ai-assistant
prompt: "λ "`
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-lg border border-border bg-card shadow-xl"
    >
      <div className="flex items-center border-b border-border bg-muted/50 px-4">
        <button
          onClick={() => setActiveTab("install")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "install"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Installation
        </button>
        <button
          onClick={() => setActiveTab("usage")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "usage"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Usage
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "config"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Configuration
        </button>
      </div>
      <div className="relative">
        <pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-sm">
          <code>{getContent()}</code>
        </pre>
        <div className="absolute right-2 top-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(getContent())}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
