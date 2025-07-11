"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Film, Star, Users, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import YouTube, { YouTubeProps } from "react-youtube"
import { useState } from "react"
import { use } from "react"

interface MovieDetailsProps {
  params: Promise<{
    status: string
    slug: string
  }>
}

export default function MovieDetailsPage({ params }: MovieDetailsProps) {
  // State to control trailer modal visibility
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  // Unwrap params using React.use()
  const resolvedParams = use(params)

  // Ensure params are defined before accessing
  if (!resolvedParams || !resolvedParams.slug || !resolvedParams.status) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Invalid parameters</h1>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // In a real app, you would fetch this data from an API or database
  // For now, we'll use mock data based on the slug
  const movieData = getMovieData(resolvedParams.slug, resolvedParams.status)

  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  // YouTube player options
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Content not found</h1>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const youtubeId = movieData.trailerUrl ? getYouTubeId(movieData.trailerUrl) : null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full-screen background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={movieData?.posterImage || "/placeholder.svg"}
          alt={movieData?.title || "Poster"}
          fill
          className="object-cover opacity-20 blur-sm"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/blur.svg"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10">
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <Image
            src={movieData?.coverImage || "/placeholder.svg"}
            alt={movieData?.title || "Cover Image"}
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur-cover.svg"
            priority={false}
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
                  src={movieData?.posterImage || "/placeholder.svg"}
                  alt={movieData?.title || "Poster"}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/blur-poster.svg"
                />
              </div>

              <div className="mt-6">
                {youtubeId ? (
                  <Button className="w-full gap-2" onClick={() => setIsTrailerOpen(true)}>
                    <Play className="h-4 w-4" />
                    Watch Trailer
                  </Button>
                ) : (
                  <Button className="w-full gap-2" disabled>
                    <Play className="h-4 w-4" />
                    Trailer Not Available
                  </Button>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="outline"
                    className={
                      movieData.status === "released" || resolvedParams.status === "released"
                        ? "bg-green-900/30 text-green-400 hover:bg-green-900/30 border-green-800"
                        : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/30 border-blue-800"
                    }
                  >
                    {movieData.status === "released" || resolvedParams.status === "released" ? "Released" : "Upcoming"}
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
                  <span className="text-lg font-medium">{movieData.imdbRating || 'TBD'} / 10</span>
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

              <div className="flex items-center gap-2">
                <span className="text-gray-400">Release Date:</span>
                <span className="font-medium">{movieData.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isTrailerOpen && youtubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl p-4">
            <div className="absolute top-2 right-2 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70"
                onClick={() => setIsTrailerOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close trailer</span>
              </Button>
            </div>
            <div className="relative aspect-video">
              <YouTube
                videoId={youtubeId}
                opts={opts}
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getMovieData(slug: string, status: string) {
  // This would normally come from a database or API
  const moviesData = {
    // Movies - Released
    "raid-2": {
      title: "Raid 2",
      type: "Movie",
      posterImage: "/series/radc.jpeg?height=450&width=300",
      coverImage: "/series/rad.jpeg?height=600&width=1200",
      releaseDate: "May 1, 2025",
      director: "Rajkumar Gupta",
      productionCompany: "T-Series Films",
      imdbRating: 7.5,
      duration: "2h 18m",
      genre: "Action/Crime",
      description:
        "Following the success of the first film, Raid 2 continues the story of an honest income tax officer who takes on powerful corrupt individuals. This time, he faces an even more dangerous network of corruption that reaches the highest levels of government.",
      trailerUrl: "https://youtu.be/kQF1gl7nLaU?si=mt9-hO2Rnsh1Sicu",
      status: status === "released" ? "released" : "released",
    },
    thunderbolt: {
      title: "Thunderbolt",
      type: "Movie",
      posterImage: "/series/thnc.jpeg?height=450&width=300",
      coverImage: "/series/thnn.jpeg?height=600&width=1200",
      releaseDate: "May 1, 2025",
      director: "Michael Bay",
      productionCompany: "Paramount Pictures",
      imdbRating: 7.6,
      duration: "2h 6m",
      genre: "Action/Sci-Fi",
      description:
        "When a brilliant engineer develops a revolutionary technology that harnesses lightning as an unlimited energy source, powerful interests will stop at nothing to control it. As global powers race to acquire the technology, the inventor must protect his creation from falling into the wrong hands.",
      trailerUrl: "https://youtu.be/-sAOWhvheK8?si=kelc3zzg3EToo0mg",
      status: status === "released" ? "released" : "released",
    },
    chhava: {
      title: "Chhava",
      type: "Movie",
      posterImage: "/series/ch.jpeg?height=450&width=300",
      coverImage: "/series/chc.jpeg?height=600&width=1200",
      releaseDate: "February 14, 2025",
      director: "Laxman Utekar",
      productionCompany: "Maddock Films",
      imdbRating: 7.3,
      duration: "2h 35m",
      genre: "Historical/Drama",
      description:
        "Based on the life of Chhatrapati Sambhaji Maharaj, the son and successor of Chhatrapati Shivaji Maharaj. The film portrays his courage, military genius, and the challenges he faced while defending the Maratha kingdom against powerful enemies.",
      trailerUrl: "https://youtu.be/hs3w32RG8L8?si=4K8VgukqALdqlboa",
      status: status === "released" ? "released" : "released",
    },
    "final-destination": {
      title: "Final Destination Bloodlines",
      type: "Movie",
      posterImage: "/series/fdc.jpeg?height=450&width=300",
      coverImage: "/series/fd.jpeg?height=600&width=1200",
      releaseDate: "May 16, 2025",
      director: "Zach Lipovsky",
      productionCompany: "New Line Cinema",
      imdbRating: 7.1,
      duration: "1h 49m",
      genre: "Horror/Thriller",
      description:
        "The latest installment in the popular horror franchise follows a new group of survivors who cheat death after one of them has a premonition about a catastrophic event. As they begin to die in increasingly elaborate and gruesome ways, they race to find a way to break the cycle of death.",
      trailerUrl: "https://youtu.be/UWMzKXsY9A4?si=zLqRiBGlkzReUe1G",
      status: status === "released" ? "released" : "released",
    },
    "mission-impossible-final-reckoning": {
      title: "Mission Impossible: Final Reckoning",
      type: "Movie",
      posterImage: "/series/mic.jpeg?height=450&width=300",
      coverImage: "/series/mi.jpeg?height=600&width=1200",
      releaseDate: "May 17, 2025",
      director: "Christopher McQuarrie",
      productionCompany: "Paramount Pictures",
      imdbRating: 7.6,
      duration: "2h 51m",
      genre: "Action/Spy",
      description:
        "In the epic conclusion to the Mission Impossible saga, Ethan Hunt faces his most personal mission yet as he confronts enemies from his past while trying to prevent a global catastrophe. With the IMF disbanded and his allies scattered, Hunt must rely on new allies and old friends to complete his final mission.",
      trailerUrl: "https://youtu.be/fsQgc9pCyDU?si=BBElSbmi-HVWQlc5",
      status: status === "released" ? "released" : "released",
    },
    "ballerina": {
      title: "Ballerina",
      type: "Movie",
      posterImage: "/series/ban.jpeg?height=450&width=300",
      coverImage: "/series/banc.jpeg?height=600&width=1200",
      releaseDate: "June 6, 2025",
      director: "Len Wiseman",
      productionCompany: "Lionsgate",
      imdbRating: 8.1,
      duration: "2h 5m",
      genre: "Action/Thriller",
      description:
        "A young female assassin, trained in the traditions of the Ruska Roma, seeks vengeance in the underworld of the John Wick universe. This spin-off explores her deadly skills and relentless pursuit of justice in a gritty, action-packed narrative.",
      trailerUrl: "https://youtu.be/0FSwsrFpkbw?si=xaEjWThoXDltcjm1",
      status: status === "released" ? "released" : "released",
    },
    "captain-america-brave-new-world": {
      title: "Captain America: Brave New World",
      type: "Movie",
      posterImage: "/series/cam.jpeg?height=450&width=300",
      coverImage: "/series/camp.jpeg?height=600&width=1200",
      releaseDate: "February 14, 2025",
      director: "Julius Onah",
      productionCompany: "Marvel Studios",
      imdbRating: 8.0,
      duration: "2h 15m",
      genre: "Superhero/Action",
      description:
        "Sam Wilson, now Captain America, navigates an international conspiracy after meeting with U.S. President Thaddeus Ross. As he uncovers a nefarious global plot, Sam must rally allies to prevent chaos, balancing his new role as a hero with high-stakes action and political intrigue.",
      trailerUrl: "https://youtu.be/1pHDWnXmK7Y?si=0S3d7WR3blRSGl4-",
      status: status === "released" ? "released" : "released",
    },
    "28-years-later": {
      title: "28 Years Later",
      type: "Movie",
      posterImage: "/series/28y.jpeg?height=450&width=300",
      coverImage: "/series/28yc.jpeg?height=600&width=1200",
      releaseDate: "June 20, 2025",
      director: "Danny Boyle",
      productionCompany: "Columbia Pictures",
      imdbRating: 7.2,
      duration: "2h 6m",
      genre: "Horror/Sci-Fi",
      description:
        "Set nearly three decades after the rage virus outbreak, this third installment in the 28 Days Later series explores a world still ravaged by infection. A new group of survivors faces the horrors of a post-apocalyptic landscape, with hope and humanity hanging in the balance.",
      trailerUrl: "https://youtu.be/IYGG55qwQZQ?si=M6JMYo1Mg-csYlQ9",
      status: status === "released" ? "released" : "released",
    },
    "sitaare-zameen-par": {
      title: "Sitaare Zameen Par",
      type: "Movie",
      posterImage: "/series/si.jpeg?height=450&width=300",
      coverImage: "/series/sic.jpeg?height=600&width=1200",
      releaseDate: "June 20, 2025",
      director: "R.S. Prasanna",
      productionCompany: "Aamir Khan Productions",
      imdbRating: 7.3,
      duration: "2h 35m",
      genre: "Comedy/Drama/Sports",
      description: "A spiritual successor to Taare Zameen Par, this film follows Gulshan, a disgraced basketball coach sentenced to community service after a drunk-driving incident. Tasked with training a team of neurodivergent adults, he initially approaches the job with prejudice but soon learns valuable life lessons from his players, finding redemption and purpose.",
      trailerUrl: "https://youtu.be/YH6k5weqwy8?si=YzouQEcww3dopE3l",
      status: status === "released" ? "released" : "released",
    },
    "how-to-train-your-dragon": {
      title: "How to Train Your Dragon",
      type: "Movie",
      posterImage: "/series/htt.jpeg?height=450&width=300",
      coverImage: "/series/httdd.jpeg?height=600&width=1200",
      releaseDate: "June 13, 2025",
      director: "Dean DeBlois",
      productionCompany: "DreamWorks Animation, Universal Pictures",
      imdbRating: 8.1,
      duration: "2h 18m",
      genre: "Action/Adventure/Fantasy",
      description: "A live-action remake of the 2010 animated film, set on the rugged isle of Berk where Vikings and dragons are bitter enemies. Hiccup, an inventive yet overlooked young Viking, defies tradition by befriending Toothless, a rare Night Fury dragon. Their unlikely bond challenges the foundations of Viking society, revealing the true nature of dragons and forging a path toward peace as they confront an ancient threat.",
      trailerUrl: "https://youtu.be/OWEq2Pf8qpk?si=guhXV2kKgYPbH6t8",
      status: "released"
    },
    "f1-the-movie": {
      title: "F1: The Movie",
      type: "Movie",
      posterImage: "/series/f1.jpeg?height=450&width=300",
      coverImage: "/series/f1c.jpeg?height=600&width=1200",
      releaseDate: "June 27, 2025",
      director: "Joseph Kosinski",
      productionCompany: "Apple Original Films, Formula 1",
      imdbRating: 7.9,
      duration: "2h 36m",
      genre: "Sports/Drama",
      description:
        "Set in the fast-paced world of Formula 1 racing, this high-octane drama follows a seasoned driver mentoring a rising star as they face personal and professional challenges on the road to glory. With real F1 teams and tracks, this film brings motorsport to the cinematic edge.",
      trailerUrl: "https://youtu.be/8yh9BPUBbbQ?si=8l-0LrSlZL6hB4L1",
      status: status === "released" ? "released" : "released"
    },
    "minecraft-the-movie": {
      title: "Minecraft: The Movie",
      type: "Movie",
      posterImage: "/series/mnc.jpeg?height=450&width=300",
      coverImage: "/series/mn.jpeg?height=600&width=1200",
      releaseDate: "April 4, 2025",
      director: "Jared Hess",
      productionCompany: "Warner Bros. Pictures, Legendary Entertainment",
      imdbRating: 5.7,
      duration: "1h 41m",
      genre: "Adventure/Fantasy",
      description:
        "In a blocky world full of creativity and danger, a teenage girl and her unlikely team of adventurers must save the Overworld from the destructive Ender Dragon. Adapted from the beloved video game, this epic tale mixes humor, heart, and heroism.",
      trailerUrl: "https://youtu.be/8B1EtVPBSMw?si=Hq7u8tNC3nvbpRT1",
      status: status === "released" ? "released" : "released"
    },
    "kesari-chapter-2": {
      title: "Kesari: Chapter 2",
      type: "Movie",
      posterImage: "/series/kc.jpeg?height=450&width=300",
      coverImage: "/series/kcc.jpeg?height=600&width=1200",
      releaseDate: "April 18, 2025",
      director: "Anurag Singh",
      productionCompany: "Dharma Productions",
      imdbRating: 8.0,
      duration: "2h 35m",
      genre: "Historical/War",
      description:
        "Following the victory at Saragarhi, Havildar Ishar Singh’s legacy continues as the next generation of Sikh warriors confronts new colonial threats. 'Kesari: Chapter 2' brings an untold chapter of bravery, sacrifice, and honor to life.",
      trailerUrl: "https://youtu.be/r-7g08INMSI?si=oGRd6vdvcIa30_TT",
      status: status === "released" ? "released" : "released"
    },
    "dragon": {
      title: "Dragon",
      type: "Movie",
      posterImage: "/series/dr.jpeg?height=450&width=300",
      coverImage: "/series/drc.jpeg?height=600&width=1200",
      releaseDate: "February 21, 2025",
      director: "Ashwath Marimuthu",
      productionCompany: "AGS Entertainment",
      imdbRating: 7.9,
      duration: "2h 35m",
      genre: "Romance/Drama",
      description:
        "A brilliant engineering student spirals into chaos after heartbreak and reinvents himself as 'Dragon'—a street-smart hustler navigating lies, love, and identity in corporate Chennai. The film balances emotion, humor, and redemption in a youth-centric narrative.",
      trailerUrl: "https://youtu.be/1ONb0CBbgPQ?si=xiZDXjoxkH1bYH_8",
      status: status === "released" ? "released" : "released"
    },
    "jurassic-world-rebirth": {
      title: "Jurassic World: Rebirth",
      type: "Movie",
      posterImage: "/series/ju.jpeg?height=450&width=300",
      coverImage: "/series/juu.jpeg?height=600&width=1200",
      releaseDate: "July 4, 2025",
      director: "Colin Trevorrow",
      productionCompany: "Universal Pictures",
      imdbRating: 6.3,
      duration: "2h 14m",
      genre: "Adventure/Sci-Fi",
      description:
        "Ten years after the events of Jurassic World Dominion, dinosaurs have adapted to living alongside humans in various ecosystems around the world. When a new genetic breakthrough threatens to upset this delicate balance, a team of scientists and adventurers must prevent a new extinction event that could wipe out both dinosaurs and humanity.",
      trailerUrl: "https://youtu.be/6m1eOoUoVao?si=m2zUiKS5MTJZAITv",
      status: status === "released" ? "released" : "released",
    },
    "eleven": {
      title: "Eleven",
      type: "Movie",
      posterImage: "/series/ele.jpeg?height=450&width=300",
      coverImage: "/series/elec.jpeg?height=600&width=1200",
      releaseDate: "May 16, 2025",
      director: "Lokkesh Ajls",
      productionCompany: "Banners: Lokkesh Pictures & Aha Originals",
      imdbRating: 7.5,
      duration: "2h 16m",
      genre: "Crime/Thriller/Mystery",
      description:
        "An honest and intelligent officer, ACP Aravindan IPS, is assigned to crack a chilling serial killing case that spans multiple cities. As the clues get darker and the killer more ruthless, Aravindan must rely on instinct, intellect, and integrity to uncover the shocking truth.",
      trailerUrl: "https://youtu.be/wGvaO0_pWtA?si=hrPlD6wkRc7JbQzx",
      status: status === "released" ? "released" : "released"
    },
    "lilo-stitch": {
      title: "Lilo & Stitch",
      type: "Movie",
      posterImage: "/series/ls.jpeg?height=450&width=300",
      coverImage: "/series/lsc.png?height=600&width=1200",
      releaseDate: "May 23, 2025",
      director: "Dean Fleischer Camp",
      productionCompany: "Walt Disney Pictures",
      imdbRating: 6.9,
      duration: "1h 48m",
      genre: "Animation/Adventure/Comedy",
      description:
        "A young Hawaiian girl named Lilo adopts what she thinks is a dog, but it turns out to be a dangerous alien experiment named Stitch. Together, they form an unlikely bond, teaching the true meaning of family and love.",
      trailerUrl: "https://youtu.be/VWqJifMMgZE?si=xI_2Cb98F4ES_9O7",
      status: status === "released" ? "released" : "released"
    },

    // Movies - Upcoming
    superman: {
      title: "Superman",
      type: "Movie",
      posterImage: "/series/suc.jpeg?height=450&width=300",
      coverImage: "/series/su.jpeg?height=600&width=1200",
      releaseDate: "July 11, 2025",
      director: "James Gunn",
      productionCompany: "DC Studios",
      imdbRating: 7.8,
      duration: "2h 9m",
      genre: "Superhero/Action",
      description:
        "A bold reimagining of the Superman story, focusing on a younger Clark Kent as he balances his Kryptonian heritage with his human upbringing. As he emerges as Earth's greatest protector, he faces threats both alien and human while defining what it means to be a hero in the modern world.",
      trailerUrl: "https://youtu.be/brI3gt9girI?si=01A0-x3pFRT1Rbpl",
      status: status === "released" ? "released" : "released",
    },
    "fantastic-4": {
      title: "Fantastic 4",
      type: "Movie",
      posterImage: "/series/fanc.jpeg?height=450&width=300",
      coverImage: "/series/fann.jpeg?height=600&width=1200",
      releaseDate: "July 25, 2025",
      director: "Matt Shakman",
      productionCompany: "Marvel Studios",
      imdbRating: null,
      duration: "2h 20m",
      genre: "Superhero/Adventure",
      description:
        "Marvel's First Family finally joins the MCU in this origin story set in the 1960s. When four explorers gain extraordinary abilities after exposure to cosmic rays, they must learn to harness their new powers while facing threats from both Earth and beyond, including the mysterious ruler of Latveria.",
      trailerUrl: "https://youtu.be/pAsmrKyMqaA?si=khrrTA7d7mmrjnbj",
      status: status === "released" ? "released" : "upcoming",
    },
    "war-2": {
      title: "War 2",
      type: "Movie",
      posterImage: "/series/warr.jpeg?height=450&width=300",
      coverImage: "/series/warc.jpeg?height=600&width=1200",
      releaseDate: "August 14, 2025",
      director: "Ayan Mukerji",
      productionCompany: "YRF Films",
      imdbRating: null,
      duration: "2h 39m",
      genre: "Action/Thriller",
      description:
        "The sequel to the blockbuster action film continues the story of India's elite agents as they face a new international threat. When a rogue agent threatens global security, Kabir must team up with a new partner to stop a conspiracy that could trigger a world war.",
      trailerUrl: "https://youtu.be/dK1W-AViQ-M?si=_P-UXmnyDFLKxMM0",
      status: status === "released" ? "released" : "upcoming",
    },
    "the-conjuring": {
      title: "The Conjuring: The Last Rites",
      type: "Movie",
      posterImage: "/series/can.jpeg?height=450&width=300",
      coverImage: "/series/canc.jpeg?height=600&width=1200",
      releaseDate: "September 5, 2025",
      director: "Michael Chaves",
      productionCompany: "New Line Cinema",
      imdbRating: null,
      duration: "Unknown",
      genre: "Horror/Supernatural",
      description:
        "The next chapter in the Conjuring Universe follows paranormal investigators Ed and Lorraine Warren as they take on their most terrifying case yet. Based on another true case from their files, the Warrens face a demonic entity that has haunted a family for generations, revealing dark secrets about the history of the occult in America.",
      trailerUrl: "https://youtu.be/FSAz556s0fM?si=9ZduIyY3z0HVjxAd",
      status: status === "released" ? "released" : "upcoming",
    },
    "avatar-3": {
      title: "Avatar 3",
      type: "Movie",
      posterImage: "/series/av.jpeg?height=450&width=300",
      coverImage: "/series/avvvv.jpeg?height=600&width=1200",
      releaseDate: "December 19, 2025",
      director: "James Cameron",
      productionCompany: "20th Century Studios",
      imdbRating: null,
      duration: "3h 12m",
      genre: "Sci-Fi/Adventure",
      description:
        "Return to Pandora as Jake Sully and Neytiri continue their journey, exploring new regions of the planet and facing a threat that tests the bonds of their family and the Na'vi people. This third installment introduces the Ash People, a fire-based Na'vi tribe, and delves deeper into the conflict between humans and the indigenous population of Pandora.",
      trailerUrl: "",
      status: status === "released" ? "released" : "upcoming",
    },
    "zootopia-2": {
      title: "Zootopia 2",
      type: "Movie",
      posterImage: "/series/zoo.jpeg?height=450&width=300",
      coverImage: "/series/zooc.jpeg?height=600&width=1200",
      releaseDate: "November 26, 2025",
      director: "Jared Bush",
      productionCompany: "Walt Disney Animation Studios",
      imdbRating: null,
      duration: "1h 48m",
      genre: "Animation/Comedy",
      description:
        "Nick Wilde and Judy Hopps return to Zootopia, tackling a new mystery involving a mysterious reptile disrupting the animal metropolis. Their investigation tests their partnership and uncovers secrets that shake the city’s harmony.",
      trailerUrl: "https://youtu.be/xo4rkcC7kFc?si=ncEilBey3W_eRMPM",
      status: status === "released" ? "released" : "upcoming",
    },
    "the-bad-guys-2": {
      title: "The Bad Guys 2",
      type: "Movie",
      posterImage: "/series/bd.jpeg?height=450&width=300",
      coverImage: "/series/bdc.jpeg?height=600&width=1200",
      releaseDate: "August 1, 2025",
      director: "Pierre Perifel",
      productionCompany: "DreamWorks Animation",
      imdbRating: null,
      duration: "1h 42m",
      genre: "Animation/Comedy",
      description:
        "The reformed criminal crew of The Bad Guys faces new challenges as they navigate their lives as heroes. A fresh heist and unexpected threats push their skills and loyalty to the limit in this action-packed animated sequel.",
      trailerUrl: "https://youtu.be/HvLHYox_Vq8?si=FZL0qbo14WBBsRq2",
      status: status === "released" ? "released" : "upcoming",
    },
    // Series - Released
    you: {
      title: "You",
      type: "Series",
      posterImage: "/series/youc.jpeg?height=450&width=300",
      coverImage: "/series/you.jpeg?height=600&width=1200",
      releaseDate: "April 24, 2025",
      director: "Greg Berlanti",
      productionCompany: "Netflix",
      imdbRating: 7.7,
      duration: "10 Episodes",
      genre: "Thriller/Drama",
      description:
        "In the final season of the psychological thriller, Joe Goldberg attempts to leave his murderous past behind and start anew. However, his obsessive tendencies resurface when he becomes fixated on a mysterious woman who seems to know too much about his dark secrets.",
      trailerUrl: "https://youtu.be/kQdEHQLHDAI?si=Im5UUHBkOHmZjGqA",
      status: status === "released" ? "released" : "released",
    },
    adolescence: {
      title: "Adolescence",
      type: "Series",
      posterImage: "/series/adc.jpeg?height=450&width=300",
      coverImage: "/series/ad.jpeg?height=600&width=1200",
      releaseDate: "March 13, 2025",
      director: "Sam Levinson",
      productionCompany: "HBO",
      imdbRating: 8.2,
      duration: "4 Episodes",
      genre: "Drama/Coming-of-age",
      description:
        "A raw and unflinching look at the lives of a group of high school students as they navigate the complexities of modern teenage life. Dealing with issues of identity, trauma, addiction, and relationships, the series offers a powerful portrayal of the challenges facing today's youth.",
      trailerUrl: "https://youtu.be/Wk5OxqtpBR4?si=pm7gbZO7bNlKcgLB",
      status: status === "released" ? "released" : "released",
    },
    "pataal-lok": {
      title: "Pataal Lok",
      type: "Series",
      posterImage: "/series/patc.jpeg?height=450&width=300",
      coverImage: "/series/pat.jpeg?height=600&width=1200",
      releaseDate: "January 17, 2025",
      director: "Avinash Arun",
      productionCompany: "Amazon Prime Video",
      imdbRating: 8.2,
      duration: "8 Episodes",
      genre: "Crime/Thriller",
      description:
        "In the second season of this critically acclaimed series, Inspector Hathiram Chaudhary investigates a new case that takes him deeper into the dark underbelly of Indian society. As he uncovers layers of corruption, politics, and crime, he must confront his own demons while navigating a system designed to break him.",
      trailerUrl: "https://youtu.be/RyzVgy8JteA?si=EoO1KEZiwyA_fKe3",
      status: status === "released" ? "released" : "released",
    },
    "the-last-of-us": {
      title: "The Last of Us",
      type: "Series",
      posterImage: "/series/thlou.jpeg?height=450&width=300",
      coverImage: "/series/thlouc.jpeg?height=600&width=1200",
      releaseDate: "April 13, 2025",
      director: "Craig Mazin",
      productionCompany: "HBO",
      imdbRating: 7.8,
      duration: "7 Episodes",
      genre: "Drama/Post-apocalyptic",
      description:
        "The second season adapts the events of the acclaimed video game 'The Last of Us Part II'. Five years after the events of the first season, Joel and Ellie have settled in Jackson, Wyoming. When a violent event disrupts their peace, Ellie embarks on a journey for justice that forces her to confront the physical and emotional toll of her actions.",
      trailerUrl: "https://youtu.be/_zHPsmXCjB0?si=cS6rx7sKlYtm7IEg",
      status: status === "released" ? "released" : "released",
    },
    daredevil: {
      title: "Daredevil",
      type: "Series",
      posterImage: "/series/dar.jpeg?height=450&width=300",
      coverImage: "/series/darr.jpeg?height=600&width=1200",
      releaseDate: "March 4, 2025",
      director: "Drew Goddard",
      productionCompany: "Disney+",
      imdbRating: 8.1,
      duration: "9 Episodes",
      genre: "Superhero/Crime",
      description:
        "Daredevil: Born Again sees Matt Murdock return to Hell's Kitchen, where he must balance his dual life as a lawyer and vigilante. When Wilson Fisk rises to political power in New York City, Matt faces his greatest challenge yet as he confronts old enemies and new threats while trying to protect his city and those he loves.",
      trailerUrl: "https://youtu.be/7xALolZzhSM?si=0eizTuJ62nh4Bllf",
      status: status === "released" ? "released" : "released",
    },
    "khakee-the-bengal-chapter": {
      title: "Khakee: The Bengal Chapter",
      type: "Series",
      posterImage: "/series/kk.jpeg?height=450&width=300",
      coverImage: "/series/kkc.jpeg?height=600&width=1200",
      releaseDate: "March 20, 2025",
      director: "Neeraj Pandey",
      productionCompany: "Netflix",
      imdbRating: "7.5",
      duration: "7 episodes",
      genre: "Action/Drama",
      description:
        "A gritty police drama following a determined cop’s pursuit of a notorious criminal in West Bengal. Amid corruption, betrayal, and personal struggles, the battle between law and crime unfolds in a tense, action-driven narrative.",
      trailerUrl: "https://youtu.be/OErVaC--Bxk?si=9RSoejDPTF2GqUjD",
      status: status === "released" ? "released" : "released",
    },
    panchayat: {
      title: "Panchayat",
      type: "Series",
      posterImage: "/series/panc.jpeg?height=450&width=300",
      coverImage: "/series/pannn.jpeg?height=600&width=1200",
      releaseDate: "June 24, 2025",
      director: "Deepak Kumar Mishra",
      productionCompany: "Amazon Prime Video",
      imdbRating: 9,
      duration: "8 Episodes",
      genre: "Comedy/Drama",
      description:
        "The fourth season of this beloved Indian comedy-drama continues to follow Abhishek Tripathi, the secretary of the Phulera village panchayat. As he grows more accustomed to rural life, he faces new challenges in village administration while navigating personal and professional growth in the heart of rural India.",
      trailerUrl: "https://youtu.be/AHMEtNAZTP4?si=CV85goqlNRNAFJdt",
      status: status === "released" ? "released" : "released",
    },
    "squid-game": {
      title: "Squid Game",
      type: "Series",
      posterImage: "/series/sq.jpeg?height=450&width=300",
      coverImage: "/series/sqc.jpeg?height=600&width=1200",
      releaseDate: "June 27, 2025",
      director: "Hwang Dong-hyuk",
      productionCompany: "Netflix",
      imdbRating: 8,
      duration: "6 Episodes",
      genre: "Thriller/Drama",
      description:
        "In the highly anticipated second season of the global phenomenon, Gi-hun returns to the game with a mission to expose the organization behind the deadly competition. As he infiltrates the system that exploits the desperate, he discovers that the games have evolved and the stakes are higher than ever before.",
      trailerUrl: "https://youtu.be/ULi6SmLifVg?si=MPHkgrcL0ulDhnrj",
      status: status === "released" ? "released" : "released",
    },
    "ironheart": {
      title: "Ironheart",
      type: "Series",
      posterImage: "/series/ir.jpeg?height=450&width=300",
      coverImage: "/series/irc.jpeg?height=600&width=1200",
      releaseDate: "June 24, 2025",
      director: "Sam Bailey, Angela Barnes",
      productionCompany: "Marvel Studios",
      imdbRating: 3.7,
      duration: "6 episodes",
      genre: "Superhero/Action",
      description:
        "Riri Williams, a brilliant young inventor, returns to Chicago to make her mark with her innovative iron suits. Her ambitions entangle her with the mysterious Parker Robbins, aka The Hood, in a battle of technology versus magic in this Marvel series.",
      trailerUrl: "https://youtu.be/WpW36ldAqnM?si=Ptga7C5NSlLkVQp5",
      status: status === "released" ? "released" : "released",
    },
    "criminal-justice": {
      title: "Criminal Justice",
      type: "Series",
      posterImage: "/series/cr.jpeg?height=450&width=300",
      coverImage: "/series/crc.jpeg?height=600&width=1200",
      releaseDate: "May 29, 2025",
      director: "Rohan Sippy",
      productionCompany: "Disney+ Hotstar Specials",
      imdbRating: 8.1,
      duration: "10 Episodes",
      genre: "Crime/Legal Drama",
      description:
        "Madhav Mishra returns with a new complex case that tests the limits of justice when a famous influencer is found dead and all evidence points to an underage suspect. What is truth and who really decides justice?",
      trailerUrl: "https://youtu.be/98pKCUl4ljM?si=EiBjgp6ufAKrZEqY",
      status: status === "released" ? "released" : "released"
    },
    "the-sandman": {
      title: "The Sandman",
      type: "Series",
      posterImage: "/series/sad.jpeg?height=450&width=300",
      coverImage: "/series/sadc.jpeg?height=600&width=1200",
      releaseDate: "July 3, 2025",
      director: "Various",
      productionCompany: "Netflix",
      imdbRating: 7.7,
      duration: "10 episodes",
      genre: "Fantasy/Drama",
      description:
        "In Season 2, Dream continues rebuilding the Dreaming and restoring cosmic balance as new threats emerge from both realms and beyond. As old gods stir and ancient grudges resurface, the Endless face new trials that test their roles and relationships in Neil Gaiman’s ever-deepening universe.",
      trailerUrl: "https://youtu.be/Er18gmgqy2k?si=_S7iOjr2rhf9Mtvk",
      status: status === "released" ? "released" : "released",
    },
    // Series - Upcoming
    "stranger-things": {
      title: "Stranger Things",
      type: "Series",
      posterImage: "/series/stc.jpeg?height=450&width=300",
      coverImage: "/series/stttt.jpeg?height=600&width=1200",
      releaseDate: "November 26, 2025",
      director: "The Duffer Brothers",
      productionCompany: "Netflix",
      imdbRating: null,
      duration: "8 Episodes",
      genre: "Sci-Fi/Horror",
      description:
        "The fifth and final season of the beloved sci-fi series brings the story of Hawkins to an epic conclusion. As the friends face their greatest challenge yet against the forces of the Upside Down, they must uncover the origin of the dimensional rift and find a way to end the threat once and for all.",
      trailerUrl: "https://youtu.be/QlYrNC_1Xmk?si=Ps2bq-3gXZsncNCr",
      status: status === "released" ? "released" : "upcoming",
    },
    "alice-in-borderland": {
      title: "Alice in Borderland",
      type: "Series",
      posterImage: "/series/aibb.jpeg?height=450&width=300",
      coverImage: "/series/aib.jpeg?height=600&width=1200",
      releaseDate: "September, 2025",
      director: "Shinsuke Sato",
      productionCompany: "Netflix",
      imdbRating: null,
      duration: "Not Announced",
      genre: "Thriller/Sci-Fi",
      description:
        "In the third season of this Japanese thriller, survivors of the deadly games must face new challenges as they uncover the truth behind the mysterious world they're trapped in. As the final stage of games begins, Arisu and his allies race to find a way back to reality before time runs out.",
      trailerUrl: "https://youtu.be/CaWRDITtT1U?si=BRcG5ehylMkyGNy9",
      status: status === "released" ? "released" : "upcoming",
    },
    wednesday: {
      title: "Wednesday",
      type: "Series",
      posterImage: "/series/wenc.jpeg?height=450&width=300",
      coverImage: "/series/wen.jpeg?height=600&width=1200",
      releaseDate: "August 6, 2025",
      director: "Tim Burton",
      productionCompany: "Netflix",
      imdbRating: null,
      duration: "9 Episodes",
      genre: "Fantasy/Comedy",
      description:
        "In the second season, Wednesday Addams returns to Nevermore Academy for her sophomore year, where she faces new supernatural mysteries and gothic intrigue. As she hones her psychic abilities, Wednesday uncovers dark secrets about her family's past while navigating the complexities of friendship, rivalry, and first love.",
      trailerUrl: "https://youtu.be/03u4xyj0TH4?si=20-EHsGIgv5X6DDu",
      status: status === "released" ? "released" : "upcoming",
    },
    "family-man": {
      title: "Family Man",
      type: "Series",
      posterImage: "/series/fm.jpeg?height=450&width=300",
      coverImage: "/series/fmc.jpeg?height=600&width=1200",
      releaseDate: "November, 2025",
      director: "Raj & DK",
      productionCompany: "Amazon Prime Video",
      imdbRating: null,
      duration: "8 Episodes",
      genre: "Action/Thriller",
      description:
        "In the third season of this acclaimed Indian spy thriller, intelligence officer Srikant Tiwari faces his most dangerous mission yet as he confronts a new threat to national security. While balancing his family life with his secret identity, Srikant must navigate geopolitical tensions and personal crises that test his resolve and loyalty.",
      trailerUrl: "https://youtu.be/ZnapjfATb6w?si=oICXgMqiM14wWBkL",
      status: status === "released" ? "released" : "upcoming",
    },
    "the-witcher": {
      title: "The Witcher",
      type: "Series",
      posterImage: "/series/wi.jpeg?height=450&width=300",
      coverImage: "/series/wic.jpeg?height=600&width=1200",
      releaseDate: "Late 2025 (Expected)",
      director: "Various",
      productionCompany: "Netflix",
      imdbRating: null,
      duration: "8 episodes",
      genre: "Fantasy/Action",
      description:
        "In Season 4, Geralt of Rivia, now portrayed by Liam Hemsworth, continues his quest to protect Ciri amidst mounting political tensions and looming war across the Continent. As destinies collide and old enemies return, the stakes rise higher than ever for Geralt, Yennefer, and Ciri.",
      trailerUrl: "https://youtu.be/kr3br-3i8TY?si=jAox8ye-oQZA7V-f",
      status: status === "released" ? "released" : "upcoming",
    },
  }

  // Convert slug to key format
  const key = slug as keyof typeof moviesData

  // Return the movie data if it exists
  return moviesData[key] || null
}
