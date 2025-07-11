"use client"

import Link from "next/link"
import { ArrowLeft, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "release" | "trailer" | "new_addition" | "reminder" | "update" | "in theater" | "new season"
  title: string
  message: string
  movieTitle: string
  movieSlug: string
  movieType: "Movie" | "Series"
  movieImage: string
  isRead: boolean
  actionUrl?: string
  priority: "low" | "medium" | "high"
  category: string
}

const notifications: Notification[] = [
    {
    id: "notif-1",
    type: "release",
    title: "Superman 2025",
    message: "Superman is now in theaters! Experience the epic return",
    movieTitle: "New Release",
    movieSlug: "superman",
    movieType: "Movie",
    movieImage: "/series/suc.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/superman",
    priority: "medium",
    category: "Drama",
  },
  {
    id: "notif-2",
    type: "trailer",
    title: "Alice in Borderland Season 3",
    message: "Alice in Borderland Season 3 trailer is out now! Get ready for more thrilling adventures.",
    movieTitle: "New Trailer",
    movieSlug: "alice-in-borderland",
    movieType: "Series",
    movieImage: "/series/aibb.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/upcoming/alice-in-borderland",
    priority: "medium",
    category: "Thriller/Sci-Fi",
  },
  {
    id: "notif-3",
    type: "trailer",
    title: "Wednesday Season 2",
    message: "Wednesday Season 2 trailer is out now! Watch it and get ready for more spooky adventures.",
    movieTitle: "New Trailer",
    movieSlug: "wednesday",
    movieType: "Series",
    movieImage: "/series/wenc.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/upcoming/wednesday",
    priority: "high",
    category: "Fantasy/Comedy",
  },
  {
    id: "notif-4",
    type: "in theater",
    title: "Jurassic World Rebirth",
    message: "Jurassic World Rebirth is available in theaters! Don't miss the action-packed adventure.",
    movieTitle: "Avaliable In Theater",
    movieSlug: "jurassic-world-rebirth",
    movieType: "Movie",
    movieImage: "/series/ju.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/jurassic-world-rebirth",
    priority: "low",
    category: "Adventure/Sci-Fi",
  },
  {
    id: "notif-5",
    type: "new season",
    title: "Panchayat Season 4",
    message: "Panchayat Season 4 is here! Join the Phulera gang for more rural drama and comedy.",
    movieTitle: "Avaliable On Prime Video",
    movieSlug: "panchayat",
    movieType: "Series",
    movieImage: "/series/pancc.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/panchayat",
    priority: "high",
    category: "Comedy/Drama",
  },
  {
    id: "notif-6",
    type: "new season",
    title: "Squid Game Season 3",
    message: "Squid Game Season 3 is now streaming! Dive into the final chapter of this thrilling series.",
    movieTitle: "Avaliable On Netflix",
    movieSlug: "squid-game",
    movieType: "Series",
    movieImage: "/series/sqq.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/squid-game",
    priority: "high",
    category: "Thriller/Drama",
  },
  {
    id: "notif-7",
    type: "in theater",
    title: "F1: The Movie",
    message: "F1: The Movie is available in theaters! Experience the adrenaline rush of Formula 1 racing.",
    movieTitle: "Avaliable In Theater",
    movieSlug: "f1-the-movie",
    movieType: "Movie",
    movieImage: "/series/f1.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/f1-the-movie",
    priority: "high",
    category: "Sports/Drama",
  },
]

export default function NotificationsPage() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "release": return ""
      case "trailer": return ""
      case "new_addition": return ""
      case "reminder": return ""
      case "update": return ""
      case "In theater": return ""
      default: return ""
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="text-lg sm:text-xl font-bold">Updates</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`bg-gray-900 border-gray-800 ${!notification.isRead ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-4 sm:p-6">
                  <Link href={notification.actionUrl || `/released/${notification.movieSlug}`}>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <img
                        src={notification.movieImage || "/placeholder.svg"}
                        alt={notification.movieTitle}
                        className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base sm:text-lg">{getNotificationIcon(notification.type)}</span>
                            <h3 className="font-semibold text-base sm:text-lg">{notification.title}</h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">{notification.message}</p>
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <Badge variant="outline" className="text-xs bg-gray-800 text-gray-300">
                            {notification.movieType}
                          </Badge>
                          <span className="text-xs sm:text-sm text-gray-400 truncate">{notification.movieTitle}</span>
                          <Badge variant="outline" className="text-xs bg-blue-900/20 text-blue-400 border-blue-800">
                            {notification.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Bell className="h-10 w-10 sm:h-12 sm:w-12 text-gray-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Updates yet</h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto">
              We'll notify you when there are new releases, trailers, or updates.
            </p>
            <Link href="/" className="mt-4 sm:mt-6 inline-block">
              <Button className="gap-2 text-sm sm:text-base">
                Explore Content
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}