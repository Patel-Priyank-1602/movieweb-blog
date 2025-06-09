import { User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserAvatarProps {
  displayName: string | null
  photoURL?: string | null
  size?: "sm" | "md" | "lg"
}

export default function UserAvatar({ displayName, photoURL, size = "md" }: UserAvatarProps) {
  // Get initials from display name, handle null/undefined cases
  const getInitials = (name: string | null) => {
    if (!name || typeof name !== "string") {
      return "U" // Default to "U" for User
    }

    return name
      .trim()
      .split(" ")
      .filter((n) => n.length > 0) // Remove empty strings
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) // Limit to 2 characters
  }

  const initials = getInitials(displayName)

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  return (
    <Avatar className={`${sizeClasses[size]} bg-primary text-primary-foreground`}>
      {photoURL ? (
        <img src={photoURL || "/placeholder.svg"} alt={displayName || "User"} className="object-cover" />
      ) : (
        <AvatarFallback className="bg-primary text-primary-foreground">
          {initials || <User className="h-4 w-4" />}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
