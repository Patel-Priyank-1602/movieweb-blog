"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import UserAvatar from "@/components/user-avatar"
import AuthModal from "@/components/auth-modal"

interface SiteComment {
  id: string
  content: string
  rating?: number
  createdAt: number
  user: {
    id: string
    displayName: string
    photoURL?: string
  }
}

const COMMENTS_KEY = "cineverse-site-comments"

export default function SiteCommentSection() {
  const [comments, setComments] = useState<SiteComment[]>([])
  const [newComment, setNewComment] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentUser, setIsAuthModalOpen } = useAuth()

  // Load comments from localStorage
  useEffect(() => {
    const loadComments = () => {
      try {
        const savedComments = localStorage.getItem(COMMENTS_KEY)
        if (savedComments) {
          const parsed = JSON.parse(savedComments)
          const sorted = parsed.sort((a: SiteComment, b: SiteComment) => b.createdAt - a.createdAt)
          setComments(sorted)
        }
      } catch (error) {
        console.error("Error loading comments:", error)
      }
    }

    loadComments()

    // Poll for new comments every 3 seconds
    const interval = setInterval(loadComments, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diffInMs = now - timestamp
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting || !currentUser) return

    setIsSubmitting(true)

    try {
      const comment: SiteComment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: newComment.trim(),
        rating: userRating > 0 ? userRating : undefined,
        createdAt: Date.now(),
        user: {
          id: currentUser.uid,
          displayName: currentUser.displayName || "Anonymous User",
          photoURL: currentUser.photoURL || undefined,
        },
      }

      // Get existing comments
      const existingComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || "[]")

      // Add new comment
      const updatedComments = [comment, ...existingComments]

      // Save to localStorage
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments))

      // Update state
      setComments(updatedComments)

      // Clear form
      setNewComment("")
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

  return (
    <div className="space-y-6">
      <AuthModal />

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
            {currentUser ? (
              <div className="flex items-center gap-3">
                <UserAvatar displayName={currentUser.displayName} photoURL={currentUser.photoURL} size="sm" />
                <div>
                  <p className="font-medium">{currentUser.displayName || "Anonymous User"}</p>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 p-3 rounded-md text-center">
                <p className="text-sm">
                  Please{" "}
                  <button onClick={() => setIsAuthModalOpen(true)} className="text-primary hover:underline font-medium">
                    log in or sign up
                  </button>{" "}
                  to leave a comment
                </p>
              </div>
            )}

            {currentUser && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
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
                <Textarea
                  placeholder="Share your feedback about the website..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus-visible:ring-primary resize-none"
                  rows={4}
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">{newComment.length}/500</div>
                  <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting} className="gap-2">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Posting..." : "Post Feedback"}
                  </Button>
                </div>
              </div>
            )}

            {!currentUser && (
              <div className="flex justify-center">
                <Button onClick={() => setIsAuthModalOpen(true)} className="gap-2">
                  Log In to Comment
                </Button>
              </div>
            )}
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
                      <UserAvatar displayName={comment.user.displayName} photoURL={comment.user.photoURL} size="sm" />
                      <span className="font-semibold text-sm">{comment.user.displayName}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{formatTimestamp(comment.createdAt)}</span>
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

      {/* Working Demo Notice */}
      <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 text-center">
        <p className="text-green-300 text-sm">
          ✅ <strong>Working Demo:</strong> This comment system is fully functional using localStorage!
        </p>
        <p className="text-green-200 text-xs mt-1">
          Create an account, log in, and post comments. They'll be saved and visible to everyone on this device.
        </p>
      </div>
    </div>
  )
}
