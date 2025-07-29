"use client"

import Link from "next/link"
import { ArrowLeft, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/nav"

interface Notification {
  id: string
  type: "release" | "trailer" | "new_addition" | "reminder" | "update" | "in theater" | "new season" | "teaser"
  title: string
  message: string
  movieTitle: string
  movieSlug: string
  movieType: "Movie" | "Series" | "New Addition"
  movieImage: string
  isRead: boolean
  actionUrl?: string
  priority: "low" | "medium" | "high"
  category: string
}

const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "trailer",
    title: "Avatar: Fire and Ash",
    message: "Avatar: Fire and Ash trailer is out now! Watch the epic journey of the Na'vi in this new installment.",
    movieTitle: "New Trailer",
    movieSlug: "avatar-3",
    movieType: "Movie",
    movieImage: "/series/av.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/upcoming/avatar-3",
    priority: "high",
    category: "Action/Fantasy",
  },
  {
    id: "notif-2",
    type: "release",
    title: "Mahavatar Narsimha",
    message: "Mahavatar Narsimha is now available! Experience the epic tale of Lord Narasimha's divine intervention.",
    movieTitle: "New Release",
    movieSlug: "mahavatar-narsimha",
    movieType: "Movie",
    movieImage: "/series/ma.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/mahavatar-narsimha",
    priority: "high",
    category: "Action/Animation",
  },
  {
    id: "notif-3",
    type: "release",
    title: "The Fantastic 4 : First Steps",
    message: "Fantastic 4 is now available! Watch the epic origin story of Marvel's First Family.",
    movieTitle: "New Release",
    movieSlug: "fantastic-4",
    movieType: "Movie",
    movieImage: "/series/fanc.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/fantastic-4",
    priority: "high",
    category: "Action/Sci-fi",
  },
  {
    id: "notif-4",
    type: "release",
    title: "Special OPS 2",
    message: "Special OPS 2 is now available! Watch the thrilling new season of this action-packed series.",
    movieTitle: "New Release",
    movieSlug: "special-ops-2",
    movieType: "Series",
    movieImage: "/series/sp.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/released/special-ops-2",
    priority: "high",
    category: "Action/Thriller",
  },
  {
    id: "notif-5",
    type: "teaser",
    title: "Stranger Things Season 5",
    message: "Stranger Things Season 5 teaser is out now! Get ready for the final season of this epic series.",
    movieTitle: "New Teaser",
    movieSlug: "stranger-things",
    movieType: "Series",
    movieImage: "/series/stc.jpeg?height=450&width=300",
    isRead: false,
    actionUrl: "/upcoimg/stranger-things",
    priority: "high",
    category: "Sci-Fi/Horror",
  },
  {
    id: "notif-6",
    type: "new_addition",
    title: "New Section Added",
    message: "Check out our New Section for Trending Movies and Series! Stay updated with the latest releases.",
    movieTitle: "Up Arrow icon in the Navbar",
    movieSlug: "",
    movieType: "New Addition",
    movieImage: "/notify/trend.png?height=450&width=300",
    isRead: false,
    actionUrl: "/notifications",
    priority: "medium",
    category: "Trending",
  },
    {
    id: "notif-7",
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
    category: "Drama/Superhero",
  },
  {
    id: "notif-8",
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
    id: "notif-9",
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
    id: "notif-10",
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
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-20">
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