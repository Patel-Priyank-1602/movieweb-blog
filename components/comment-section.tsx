"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send, User } from "lucide-react"

interface Comment {
  id: string
  user: {
    name: string
    initials: string
  }
  content: string
  timestamp: string
  dateAdded: number
  movieSlug: string
}

interface CommentSectionProps {
  movieSlug: string
}

const STORAGE_KEY = "cineverse-movie-comments"

export default function CommentSection({ movieSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load comments for this movie
  const loadComments = () => {
    if (!isClient) return

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const allComments = JSON.parse(saved)
        const movieComments = allComments
          .filter((comment: Comment) => comment.movieSlug === movieSlug)
          .sort((a: Comment, b: Comment) => b.dateAdded - a.dateAdded)
        setComments(movieComments)
      }
    } catch (error) {
      console.error("Error loading comments:", error)
    }
  }

  // Save all comments to localStorage
  const saveAllComments = (allComments: Comment[]) => {
    if (!isClient) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments))
    } catch (error) {
      console.error("Error saving comments:", error)
    }
  }

  // Load comments on mount
  useEffect(() => {
    if (isClient) {
      loadComments()
    }
  }, [isClient, movieSlug])

  // Poll for new comments every 3 seconds
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      loadComments()
    }, 3000)

    return () => clearInterval(interval)
  }, [isClient, movieSlug])

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

      const comment: Comment = {
        id: `${movieSlug}-${now}-${Math.random().toString(36).substr(2, 9)}`,
        user: {
          name: userName.trim(),
          initials: initials,
        },
        content: newComment.trim(),
        timestamp: "Just now",
        dateAdded: now,
        movieSlug: movieSlug,
      }

      // Get all existing comments
      const saved = localStorage.getItem(STORAGE_KEY)
      const allComments = saved ? JSON.parse(saved) : []

      // Add new comment
      const updatedAllComments = [comment, ...allComments]

      // Save all comments
      saveAllComments(updatedAllComments)

      // Update local state with this movie's comments
      const movieComments = updatedAllComments
        .filter((c: Comment) => c.movieSlug === movieSlug)
        .sort((a: Comment, b: Comment) => b.dateAdded - a.dateAdded)
      setComments(movieComments)

      // Clear form
      setNewComment("")
      setUserName("")

      alert("Comment posted successfully! 🎉")
    } catch (error) {
      console.error("Error posting comment:", error)
      alert("Error posting comment. Please try again.")
    }

    setIsSubmitting(false)
  }

  const displayedComments = showAll ? comments : comments.slice(0, 5)

  if (!isClient) {
    return <div>Loading comments...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-6 w-6" />
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="space-y-4">
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
              <label className="text-sm font-medium">Your Comment *</label>
              <Textarea
                placeholder="Share your thoughts about this movie..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-800 border-gray-700 focus-visible:ring-primary resize-none"
                rows={3}
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
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <Card key={comment.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {comment.user.initials}
                    </div>
                    <span className="font-semibold text-sm">{comment.user.name}</span>
                    <span className="text-gray-400 text-xs">{formatTimestamp(comment.dateAdded)}</span>
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
                {showAll ? "Show Less" : `View More Comments (${comments.length - 5} more)`}
              </Button>
            </div>
          )}
        </div>
      )}

      {comments.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-600 mx-auto mb-6" />
          <h4 className="text-xl font-medium mb-3">Be the First to Comment!</h4>
          <p className="text-gray-400 max-w-md mx-auto">
            No comments yet. Share your thoughts about this movie and start the conversation!
          </p>
        </div>
      )}

      {/* Debug Info */}
      <div className="text-xs text-gray-500 text-center">Comments sync every 3 seconds • Movie: {movieSlug}</div>
    </div>
  )
}
