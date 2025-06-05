"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Film, TrendingUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedShowcase from "@/components/featured-showcase"
import MovieCard from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Loading from "./loading"

interface ContentItem {
  title: string;
  type: "Movie" | "Series";
  image: string;
  rating?: number;
  releaseDate: string;
  status: "released" | "upcoming";
}

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
}

export default function Home() {
  const [contentType, setContentType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ username: "", text: "" })
  const [showAllComments, setShowAllComments] = useState(false)
  const [ws, setWs] = useState<WebSocket | null>(null)

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

  // Initialize WebSocket connection with reconnection logic
  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      console.log("Connecting to WebSocket:", WS_URL);
      const websocket = new WebSocket(WS_URL);
      setWs(websocket);

      websocket.onopen = () => {
        console.log("WebSocket connected");
      };

      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "comments") {
            const sortedComments = message.data.sort((a: Comment, b: Comment) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            setComments(sortedComments);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      websocket.onclose = () => {
        console.log("WebSocket disconnected, attempting to reconnect...");
        reconnectTimeout = setTimeout(connectWebSocket, 3000);
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        websocket.close();
      };
    };

    connectWebSocket();

    // Fetch initial comments
    console.log("Fetching initial comments from:", `${SERVER_URL}/comments`);
    fetch(`${SERVER_URL}/comments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const sortedComments = data.sort((a: Comment, b: Comment) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setComments(sortedComments);
      })
      .catch((error) => console.error("Error fetching comments:", error.message));

    return () => {
      if (ws) {
        ws.close();
      }
      clearTimeout(reconnectTimeout);
    };
  }, [SERVER_URL, WS_URL]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.username.trim() && newComment.text.trim()) {
      const comment: Comment = {
        id: Date.now(),
        username: newComment.username.trim(),
        text: newComment.text.trim(),
        timestamp: new Date().toLocaleString(),
      };

      console.log("Posting comment to:", `${SERVER_URL}/comments`, comment);

      try {
        const response = await fetch(`${SERVER_URL}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        });

        if (response.ok) {
          setNewComment({ username: "", text: "" });
          console.log("Comment posted successfully");
        } else {
          const errorData = await response.json();
          console.error("Failed to post comment:", errorData.error, { status: response.status });
          alert(`Failed to post comment: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error posting comment:", error instanceof Error ? error.message : "Unknown error");
        alert("Error posting comment. Please try again.");
      }
    } else {
      alert("Please fill in both username and comment fields.");
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  const arrivedMovies: ContentItem[] = [
    {
      title: "Raid 2",
      type: "Movie",
      image: "/series/radc.jpeg?height=450&width=300",
      rating: 4.8,
      releaseDate: "May 1, 2025",
      status: "released",
    },
    {
      title: "Thunderbolt",
      type: "Movie",
      image: "/series/thnc.jpeg?height=450&width=300",
      rating: 4.6,
      releaseDate: "May 1, 2025",
      status: "released",
    },
    {
      title: "Chhava",
      type: "Movie",
      image: "/series/ch.jpeg?height=450&width=300",
      rating: 4.3,
      releaseDate: "Feb 14, 2025",
      status: "released",
    },
    {
      title: "Final Destination",
      type: "Movie",
      image: "/series/fdc.jpeg?height=450&width=300",
      rating: 4.5,
      releaseDate: "May 16, 2025",
      status: "released",
    },
    {
      title: "Mission Impossible: Final Reckoning",
      type: "Movie",
      image: "/series/mic.jpeg?height=450&width=300",
      rating: 4.5,
      releaseDate: "May 17, 2025",
      status: "released",
    },
    {
      title: "Ballerina",
      type: "Movie",
      image: "/series/ban.jpeg?height=450&width=300",
      rating: 4.7,
      releaseDate: "June 6, 2025",
      status: "released",
    },
    {
      title: "Captain America: Brave New World",
      type: "Movie",
      image: "/series/cam.jpeg?height=450&width=300",
      rating: 4.1,
      releaseDate: "February 14, 2025",
      status: "released",
    },
  ];

  const upcomingMovies: ContentItem[] = [
    {
      title: "Jurassic World: Rebirth",
      type: "Movie",
      image: "/series/ju.jpeg?height=450&width=300",
      releaseDate: "July 4, 2025",
      status: "upcoming",
    },
    {
      title: "Superman",
      type: "Movie",
      image: "/series/suc.jpeg?height=450&width=300",
      releaseDate: "July 11, 2025",
      status: "upcoming",
    },
    {
      title: "Fantastic 4",
      type: "Movie",
      image: "/series/fanc.jpeg?height=450&width=300",
      releaseDate: "July 25, 2025",
      status: "upcoming",
    },
    {
      title: "War 2",
      type: "Movie",
      image: "/series/warr.jpeg?height=450&width=300",
      releaseDate: "Aug 14, 2025",
      status: "upcoming",
    },
    {
      title: "The Conjuring",
      type: "Movie",
      image: "/series/can.jpeg?height=450&width=300",
      releaseDate: "Sept 5, 2025",
      status: "upcoming",
    },
    {
      title: "Avatar 3",
      type: "Movie",
      image: "/series/av.jpeg?height=450&width=300",
      releaseDate: "Dec 19, 2025",
      status: "upcoming",
    },
    {
      title: "28 Years Later",
      type: "Movie",
      image: "/series/28y.jpeg?height=450&width=300",
      releaseDate: "June 20, 2025",
      status: "upcoming",
    },
    {
      title: "Zootopia 2",
      type: "Movie",
      image: "/series/zoo.jpeg?height=450&width=300",
      releaseDate: "November 26, 2025",
      status: "upcoming",
    },
    {
      title: "The Bad Guys 2",
      type: "Movie",
      image: "/series/bd.jpeg?height=450&width=300",
      releaseDate: "August 1, 2025",
      status: "upcoming",
    },
  ];

  const arrivedSeries: ContentItem[] = [
    {
      title: "You",
      type: "Series",
      image: "/series/youc.jpeg?height=450&width=300",
      rating: 4.7,
      releaseDate: "Apr 24, 2025",
      status: "released",
    },
    {
      title: "Adolescence",
      type: "Series",
      image: "/series/adc.jpeg?height=450&width=300",
      rating: 4.2,
      releaseDate: "Mar 13, 2025",
      status: "released",
    },
    {
      title: "Pataal Lok",
      type: "Series",
      image: "/series/patc.jpeg?height=450&width=300",
      rating: 4.9,
      releaseDate: "Jan 17, 2025",
      status: "released",
    },
    {
      title: "The Last of Us",
      type: "Series",
      image: "/series/thlou.jpeg?height=450&width=300",
      rating: 4.8,
      releaseDate: "Apr 13, 2025",
      status: "released",
    },
    {
      title: "Daredevil",
      type: "Series",
      image: "/series/dar.jpeg?height=450&width=300",
      rating: 4.6,
      releaseDate: "Mar 4, 2025",
      status: "released",
    },
    {
      title: "Khakee: The Bengal Chapter",
      type: "Series",
      image: "/series/kk.jpeg?height=450&width=300",
      rating: 4.2,
      releaseDate: "March 20, 2025",
      status: "released",
    },
  ];

  const upcomingSeries: ContentItem[] = [
    {
      title: "Stranger Things",
      type: "Series",
      image: "/series/stc.jpeg?height=450&width=300",
      releaseDate: "Oct - Nov, 2025",
      status: "upcoming",
    },
    {
      title: "Alice in Borderland",
      type: "Series",
      image: "/series/aibb.jpeg?height=450&width=300",
      releaseDate: "Sept, 2025",
      status: "upcoming",
    },
    {
      title: "Panchayat",
      type: "Series",
      image: "/series/panc.jpeg?height=450&width=300",
      releaseDate: "Jul 2, 2025",
      status: "upcoming",
    },
    {
      title: "Squid Game",
      type: "Series",
      image: "/series/sq.jpeg?height=450&width=300",
      releaseDate: "Jun 27, 2025",
      status: "upcoming",
    },
    {
      title: "Wednesday",
      type: "Series",
      image: "/series/wenc.jpeg?height=450&width=300",
      releaseDate: "Aug 6, 2025",
      status: "upcoming",
    },
    {
      title: "Family Man",
      type: "Series",
      image: "/series/fm.jpeg?height=450&width=300",
      releaseDate: "Nov, 2025",
      status: "upcoming",
    },
    {
      title: "The Witcher",
      type: "Series",
      image: "/series/wi.jpeg?height=450&width=300",
      releaseDate: "Late 2025",
      status: "upcoming",
    },
    {
      title: "Ironheart",
      type: "Series",
      image: "/series/ir.jpeg?height=450&width=300",
      releaseDate: "June 24, 2025",
      status: "upcoming",
    },
    {
      title: "The Sandman",
      type: "Series",
      image: "/series/sad.jpeg?height=450&width=300",
      releaseDate: "July 3, 2025",
      status: "upcoming",
    },
  ];

  const arrivedContent: ContentItem[] =
    contentType === "all"
      ? [...arrivedMovies, ...arrivedSeries]
      : contentType === "movies"
        ? arrivedMovies
        : arrivedSeries;

  const upcomingContent =
    contentType === "all"
      ? [...upcomingMovies, ...upcomingSeries]
      : contentType === "movies"
        ? upcomingMovies
        : upcomingSeries;

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CineVerse 2025</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-white">
              Home
            </Link>
            <Link href="/released" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Released
            </Link>
            <Link href="/upcoming" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Upcoming
            </Link>
            <Link href="/search" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Search
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <TrendingUp className="h-5 w-5" />
              <span className="sr-only">Trending</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <FeaturedShowcase />

        <section className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">2025 Releases</h2>
            <Tabs value={contentType} onValueChange={setContentType} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-12">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-900/30 text-green-400 hover:bg-green-900/30 border-green-800"
                  >
                    Released
                  </Badge>
                  <span>Already Released</span>
                </h3>
                <Link href="/released" className="text-sm text-primary flex items-center">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                {arrivedContent.slice(0, 5).map((movie, index) => (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    type={movie.type}
                    image={movie.image}
                    rating={movie.rating}
                    releaseDate={movie.releaseDate}
                    status="released"
                  />
                ))}
                {arrivedContent.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-400">
                      No {contentType === "movies" ? "movies" : "series"} available in this category.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/30 border-blue-800"
                  >
                    Upcoming
                  </Badge>
                  <span>Coming Soon</span>
                </h3>
                <Link href="/upcoming" className="text-sm text-primary flex items-center">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                {upcomingContent.slice(0, 5).map((movie, index) => (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    type={movie.type}
                    image={movie.image}
                    releaseDate={movie.releaseDate}
                    status="upcoming"
                  />
                ))}
                {upcomingContent.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-400">
                      No {contentType === "movies" ? "movies" : "series"} available in this category.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Community Comments</h3>
              <form onSubmit={handleCommentSubmit} className="mb-8 flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Your username"
                  value={newComment.username}
                  onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                  className="bg-gray-900 text-white border-gray-700"
                  required
                />
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  className="bg-gray-900 text-white border-gray-700"
                  rows={4}
                  required
                />
                <Button type="submit" className="self-start bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </form>

              <div className="space-y-4">
                {displayedComments.length === 0 ? (
                  <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                ) : (
                  displayedComments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-800 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.username}</span>
                        <span className="text-sm text-gray-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-muted">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
              {comments.length > 5 && (
                <Button
                  className="mt-6 bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                  onClick={() => setShowAllComments(!showAllComments)}
                  variant="outline"
                >
                  {showAllComments ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="container">
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold">The Last Update on this Website was on 6/6/2025</h2>
              <p className="text-gray-400">For some Movies/Series, the official Trailer is not Available, so only a Teaser has been released. In some cases, neither a Teaser nor a Trailer is Available — only a Date Announcement Video is Provided.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}