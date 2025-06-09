"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import UserAvatar from "@/components/user-avatar"
import AuthModal from "@/components/auth-modal"

interface Comment {
  id: string
  content: string
  createdAt: number
  movieSlug: string
  user: {
    id: string
    displayName: string
    photoURL?: string
  }
}

interface CommentSectionProps {
  movieSlug: string
}

const MOVIE_COMMENTS_KEY = "cineverse-movie-comments"

export default function CommentSection({ movieSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentUser, setIsAuthModalOpen } = useAuth()

  // Load comments for this movie
  useEffect(() => {
    const loadComments = () => {
      try {
        const savedComments = localStorage.getItem(MOVIE_COMMENTS_KEY)
        if (savedComments) {
          const allComments = JSON.parse(savedComments)
          const movieComments = allComments
            .filter((comment: Comment) => comment.movieSlug === movieSlug)
            .sort((a: Comment, b: Comment) => b.createdAt - a.createdAt)
          setComments(movieComments)
        }
      } catch (error) {
        console.error("Error loading comments:", error)
      }
    }

    loadComments()

    // Poll for new comments every 3 seconds
    const interval = setInterval(loadComments, 3000)
    return () => clearInterval(interval)
  }, [movieSlug])

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
      const comment: Comment = {
        id: `${movieSlug}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: newComment.trim(),
        createdAt: Date.now(),
        movieSlug,
        user: {
          id: currentUser.uid,
          displayName: currentUser.displayName || "Anonymous User",
          photoURL: currentUser.photoURL || undefined,
        },
      }

      // Get all existing comments
      const savedComments = localStorage.getItem(MOVIE_COMMENTS_KEY)
      const allComments = savedComments ? JSON.parse(savedComments) : []

      // Add new comment
      const updatedAllComments = [comment, ...allComments]

      // Save all comments
      localStorage.setItem(MOVIE_COMMENTS_KEY, JSON.stringify(updatedAllComments))

      // Update local state with this movie's comments
      const movieComments = updatedAllComments
        .filter((c: Comment) => c.movieSlug === movieSlug)
        .sort((a: Comment, b: Comment) => b.createdAt - a.createdAt)
      setComments(movieComments)

      // Clear form
      setNewComment("")

      alert("Comment posted successfully! 🎉")
    } catch (error) {
      console.error("Error posting comment:", error)
      alert("Error posting comment. Please try again.")
    }

    setIsSubmitting(false)
  }

  const displayedComments = showAll ? comments : comments.slice(0, 5)

  return (
    <div className="space-y-6">
      <AuthModal />

      <div className="flex items-center gap-2">
        <MessageCircle className="h-6 w-6" />
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
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
                <Textarea
                  placeholder="Share your thoughts about this movie..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-gray-800 border-gray-700 focus-visible:ring-primary resize-none"
                  rows={3}
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">{newComment.length}/500</div>
                  <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting} className="gap-2">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Posting..." : "Post Comment"}
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
          {displayedComments.map((comment) => (
            <Card key={comment.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UserAvatar displayName={comment.user.displayName} photoURL={comment.user.photoURL} size="sm" />
                    <span className="font-semibold text-sm">{comment.user.displayName}</span>
                    <span className="text-gray-400 text-xs">{formatTimestamp(comment.createdAt)}</span>
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
    </div>
  )
}
