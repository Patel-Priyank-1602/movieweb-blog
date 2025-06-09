"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send, Star, User } from "lucide-react"

interface SiteComment {
  id: string
  user: {
    name: string
    initials: string
  }
  content: string
  timestamp: string
  rating?: number
  dateAdded: number
}

const STORAGE_KEY = "cineverse-site-comments"

export default function SiteCommentSection() {
  const [comments, setComments] = useState<SiteComment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load comments from localStorage
  const loadComments = () => {
    if (!isClient) return

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const sorted = parsed.sort((a: SiteComment, b: SiteComment) => b.dateAdded - a.dateAdded)
        setComments(sorted)
      }
    } catch (error) {
      console.error("Error loading comments:", error)
    }
  }

  // Save comments to localStorage
  const saveComments = (commentsToSave: SiteComment[]) => {
    if (!isClient) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsToSave))
    } catch (error) {
      console.error("Error saving comments:", error)
    }
  }

  // Load comments on mount
  useEffect(() => {
    if (isClient) {
      loadComments()
    }
  }, [isClient])

  // Poll for new comments every 3 seconds
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      loadComments()
    }, 3000)

    return () => clearInterval(interval)
  }, [isClient])

  const generateInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2)
  }

  const formatTimestamp = (dateAdded: number) => {
    const now = Date.now()
    const diff = now - dateAdded
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  const handleSubmitComment = () => {
    if (!newComment.trim() || !userName.trim() || isSubmitting || !isClient) return

    setIsSubmitting(true)

    try {
      const initials = generateInitials(userName.trim())
      const now = Date.now()

      const comment: SiteComment = {
        id: `site-${now}-${Math.random().toString(36).substr(2, 9)}`,
        user: {
          name: userName.trim(),
          initials: initials,
        },
        content: newComment.trim(),
        timestamp: "Just now",
        rating: userRating > 0 ? userRating : undefined,
        dateAdded: now,
      }

      // Get current comments
      const currentComments = [...comments]

      // Add new comment at the beginning
      const updatedComments = [comment, ...currentComments]

      // Save to localStorage
      saveComments(updatedComments)

      // Update state
      setComments(updatedComments)

      // Clear form
      setNewComment("")
      setUserName("")
      setUserRating(0)

      alert("Comment posted successfully! 🎉")
    } catch (error) {
      console.error("Error posting comment:", error)
      alert("Error posting comment. Please try again.")
    }

    setIsSubmitting(false)
  }

  const displayedComments = showAll ? comments : comments.slice(0, 5)

  // Calculate average rating
  const ratingsOnly = comments.filter((c) => c.rating).map((c) => c.rating!)
  const averageRating = ratingsOnly.length > 0 ? ratingsOnly.reduce((a, b) => a + b, 0) / ratingsOnly.length : 0

  if (!isClient) {
    return <div>Loading comments...</div>
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <MessageCircle className="h-6 w-6" />
          <h3 className="text-2xl font-semibold">Community Feedback</h3>
        </div>
        <p className="text-gray-400">Share your thoughts about CineVerse 2025</p>
        {averageRating > 0 && (
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-4 w-4 ${star <= averageRating ? "fill-yellow-500" : "fill-gray-600"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-300">
              {averageRating.toFixed(1)} ({ratingsOnly.length} ratings)
            </span>
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Your Name *
                </label>
                <Input
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus-visible:ring-primary"
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rate this website (optional)</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setUserRating(star)} className="transition-colors">
                      <Star
                        className={`h-5 w-5 ${
                          star <= userRating
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-600 text-gray-600 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Feedback *</label>
              <Textarea
                placeholder="Share your feedback about the website, suggest improvements, or let us know what you love about CineVerse 2025..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-800 border-gray-700 focus-visible:ring-primary resize-none"
                rows={4}
                maxLength={500}
              />
              <div className="text-xs text-gray-500 text-right">{newComment.length}/500</div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || !userName.trim() || isSubmitting}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Posting..." : "Post Feedback"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Recent Feedback ({comments.length})</h4>
          {displayedComments.map((comment) => (
            <Card key={comment.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {comment.user.initials}
                      </div>
                      <span className="font-semibold text-sm">{comment.user.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{formatTimestamp(comment.dateAdded)}</span>
                    {comment.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= comment.rating!
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-600 text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* View More Button */}
          {comments.length > 5 && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setShowAll(!showAll)} className="gap-2">
                {showAll ? "Show Less" : `View More Feedback (${comments.length - 5} more)`}
              </Button>
            </div>
          )}
        </div>
      )}

      {comments.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-600 mx-auto mb-6" />
          <h4 className="text-xl font-medium mb-3">Be the First to Share Your Thoughts!</h4>
          <p className="text-gray-400 max-w-md mx-auto">
            No feedback yet. We'd love to hear what you think about CineVerse 2025. Your opinion matters to us!
          </p>
        </div>
      )}

      {/* Debug Info */}
      <div className="text-xs text-gray-500 text-center">
        Comments are synced every 3 seconds • Total: {comments.length} comments
      </div>
    </div>
  )
}
