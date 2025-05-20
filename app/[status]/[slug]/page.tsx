import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Film, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MovieDetailsProps {
  params: {
    status: string
    slug: string
  }
}

export default function MovieDetailsPage({ params }: MovieDetailsProps) {
  // In a real app, you would fetch this data from an API or database
  // For now, we'll use mock data based on the slug
  const movieData = getMovieData(params.slug, params.status)

  if (!movieData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Movie not found</h1>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full-screen background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={movieData.posterImage || "/placeholder.svg?height=450&width=300"}
          alt={movieData.title}
          fill
          className="object-cover opacity-20 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10">
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <Image
            src={movieData.coverImage || "/placeholder.svg?height=600&width=1200"}
            alt={movieData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="absolute top-4 left-4 z-10">
            <Link href="/">
              <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={movieData.posterImage || "/placeholder.svg?height=450&width=300"}
                  alt={movieData.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="outline"
                    className={
                      params.status === "arrived"
                        ? "bg-green-900/30 text-green-400 hover:bg-green-900/30 border-green-800"
                        : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/30 border-blue-800"
                    }
                  >
                    {params.status === "arrived" ? "Released" : "Upcoming"}
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-800">
                    {movieData.type}
                  </Badge>
                  <span className="text-sm text-gray-400">{movieData.duration}</span>
                  <span className="text-sm text-gray-400">{movieData.genre}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{movieData.title}</h1>

                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="h-5 w-5 fill-yellow-500" />
                  <span className="text-lg font-medium">{movieData.imdbRating} / 10</span>
                  <span className="text-sm text-gray-400">IMDb Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-gray-800">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Release Date</p>
                    <p className="font-medium">{movieData.releaseDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Director</p>
                    <p className="font-medium">{movieData.director}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Film className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Production Company</p>
                    <p className="font-medium">{movieData.productionCompany}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{movieData.description}</p>
              </div>

              {params.status === "arrived" ? (
                <Button size="lg" className="gap-2">
                  Watch Now
                </Button>
              ) : (
                <Button size="lg" className="gap-2">
                  Watch Trailer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getMovieData(slug: string, status: string) {
  // This would normally come from a database or API
  const moviesData = {
    "quantum-horizon": {
      title: "Quantum Horizon",
      type: "Movie",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "January 15, 2025",
      director: "Alexandra Chen",
      productionCompany: "Nebula Studios",
      imdbRating: 8.7,
      duration: "2h 15m",
      genre: "Sci-Fi/Thriller",
      description:
        "In the year 2150, a team of scientists discovers a way to manipulate quantum reality, but their breakthrough threatens to unravel the fabric of existence itself. As they delve deeper into the quantum realm, they face ethical dilemmas and unforeseen consequences that could change humanity forever.",
    },
    "neon-dynasty": {
      title: "Neon Dynasty",
      type: "Series",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "February 3, 2025",
      director: "Hiroshi Nakamura",
      productionCompany: "Cyber Visions Entertainment",
      imdbRating: 9.2,
      duration: "8 Episodes",
      genre: "Cyberpunk/Drama",
      description:
        "In a cyberpunk metropolis ruled by corporate AI, a group of hackers fights to expose the dark secrets of the system that controls their lives. As they navigate the neon-lit streets and digital landscapes, they discover conspiracies that go deeper than they ever imagined.",
    },
    "ethereal-echoes": {
      title: "Ethereal Echoes",
      type: "Movie",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "March 22, 2025",
      director: "Sophia Williams",
      productionCompany: "Dreamscape Pictures",
      imdbRating: 8.4,
      duration: "1h 58m",
      genre: "Fantasy/Adventure",
      description:
        "When a young musician discovers she can travel between dimensions through sound, she embarks on a journey to save a dying world whose fate is mysteriously tied to her own. Her melodies become the key to unlocking ancient powers and healing the rifts between worlds.",
    },
    "nebula-chronicles": {
      title: "Nebula Chronicles",
      type: "Series",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "June 18, 2025",
      director: "Marcus Johnson",
      productionCompany: "Stellar Entertainment",
      imdbRating: 9.0,
      duration: "10 Episodes",
      genre: "Space Opera/Adventure",
      description:
        "An interstellar saga following the crew of the starship Artemis as they navigate uncharted space and encounter ancient civilizations. Their mission of exploration becomes one of survival as they uncover secrets that have remained hidden for millennia.",
    },
    "astral-convergence": {
      title: "Astral Convergence",
      type: "Movie",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "July 30, 2025",
      director: "Elena Rodriguez",
      productionCompany: "Cosmic Films",
      imdbRating: 8.8,
      duration: "2h 30m",
      genre: "Sci-Fi/Mystery",
      description:
        "When multiple realities begin to collapse into one another, a physicist must work with her alternate selves to prevent the complete destruction of the multiverse. As the boundaries between worlds blur, she confronts versions of her life that could have been.",
    },
    "synthetic-dreams": {
      title: "Synthetic Dreams",
      type: "Series",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "August 12, 2025",
      director: "David Kim",
      productionCompany: "Neural Network Productions",
      imdbRating: 8.6,
      duration: "8 Episodes",
      genre: "Sci-Fi/Drama",
      description:
        "In a world where dreams can be programmed and shared, a dream designer discovers a pattern of nightmares that seems to predict real-world disasters. As she investigates, she finds herself caught in a conspiracy that blurs the line between reality and simulation.",
    },
    "prism-protocol": {
      title: "Prism Protocol",
      type: "Movie",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "September 25, 2025",
      director: "Michael Torres",
      productionCompany: "Spectrum Films",
      imdbRating: 8.3,
      duration: "2h 10m",
      genre: "Thriller/Sci-Fi",
      description:
        "A security expert with synesthesia is recruited to test a new quantum encryption system, only to discover that the technology has been compromised by an entity that may not be human. Her unique perception becomes both her greatest asset and her greatest vulnerability.",
    },
    "void-whispers": {
      title: "Void Whispers",
      type: "Series",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "October 31, 2025",
      director: "Sarah Chen",
      productionCompany: "Eclipse Entertainment",
      imdbRating: 9.1,
      duration: "6 Episodes",
      genre: "Horror/Sci-Fi",
      description:
        "When a deep space mining operation encounters an ancient signal, the crew begins experiencing hallucinations that seem to predict their deaths. As they race back to Earth, they must determine if they've discovered an alien intelligence or unleashed something far more sinister.",
    },
    "celestial-odyssey": {
      title: "Celestial Odyssey",
      type: "Series",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "April 5, 2025",
      director: "Jonathan Wright",
      productionCompany: "Astral Media",
      imdbRating: 8.9,
      duration: "12 Episodes",
      genre: "Space Opera/Adventure",
      description:
        "Following the journey of the starship Elysium as it embarks on humanity's first mission to a nearby star system. The crew must navigate not only the dangers of deep space but also the complex politics and personal conflicts that threaten their mission from within.",
    },
    "temporal-paradox": {
      title: "Temporal Paradox",
      type: "Movie",
      posterImage: "/placeholder.svg?height=450&width=300",
      coverImage: "/placeholder.svg?height=600&width=1200",
      releaseDate: "May 1, 2025",
      director: "Thomas Reynolds",
      productionCompany: "Chronos Pictures",
      imdbRating: 8.5,
      duration: "2h 25m",
      genre: "Sci-Fi/Mystery",
      description:
        "A physicist discovers a way to send messages to her past self, creating a series of cascading timeline changes that have unexpected consequences. As she tries to fix the damage, she uncovers a conspiracy that spans multiple timelines and threatens the very fabric of reality.",
    },
  }

  // Convert slug to key format
  const key = slug as keyof typeof moviesData

  // Return the movie data if it exists
  return moviesData[key] || null
}
