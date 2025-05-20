import type { ReactNode } from "react"

interface FeatureHighlightProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureHighlight({ icon, title, description }: FeatureHighlightProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-primary/10 p-2 mt-0.5">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
