"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Film, Menu, TrendingUp, X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedShowcase from "@/components/featured-showcase"
import MovieCard from "@/components/movie-card"
import { Badge } from "@/components/ui/badge"
import Loading from "./loading"

interface ContentItem {
  title: string;
  type: "Movie" | "Series";
  image: string;
  rating?: number;
  releaseDate: string;
  status: "released" | "upcoming";
  slug?: string; // Add slug for navigation
}

const arrivedMovies: ContentItem[] = [
  {
    title: "Raid 2",
    type: "Movie",
    image: "/series/radc.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "raid-2"
  },
  {
    title: "Thunderbolt",
    type: "Movie",
    image: "/series/thnc.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "thunderbolt"
  },
  {
    title: "Chhava",
    type: "Movie",
    image: "/series/ch.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Feb 14, 2025",
    status: "released",
    slug: "chhava"
  },
  {
    title: "Final Destination",
    type: "Movie",
    image: "/series/fdc.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 16, 2025",
    status: "released",
    slug: "final-destination"
  },
  {
    title: "Mission Impossible: Final Reckoning",
    type: "Movie",
    image: "/series/mic.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 17, 2025",
    status: "released",
    slug: "mission-impossible-final-reckoning"
  },
  {
    title: "Ballerina",
    type: "Movie",
    image: "/series/ban.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "June 6, 2025",
    status: "released",
    slug: "ballerina"
  },
  {
    title: "Captain America: Brave New World",
    type: "Movie",
    image: "/series/cam.jpeg?height=450&width=300",
    rating: 4.1,
    releaseDate: "February 14, 2025",
    status: "released",
    slug: "captain-america-brave-new-world"
  },
];

const upcomingMovies: ContentItem[] = [
  {
    title: "Jurassic World: Rebirth",
    type: "Movie",
    image: "/series/ju.jpeg?height=450&width=300",
    releaseDate: "July 4, 2025",
    status: "upcoming",
    slug: "jurassic-world-rebirth"
  },
  {
    title: "Superman",
    type: "Movie",
    image: "/series/suc.jpeg?height=450&width=300",
    releaseDate: "July 11, 2025",
    status: "upcoming",
    slug: "superman"
  },
  {
    title: "Fantastic 4",
    type: "Movie",
    image: "/series/fanc.jpeg?height=450&width=300",
    releaseDate: "July 25, 2025",
    status: "upcoming",
    slug: "fantastic-4"
  },
  {
    title: "War 2",
    type: "Movie",
    image: "/series/warr.jpeg?height=450&width=300",
    releaseDate: "Aug 14, 2025",
    status: "upcoming",
    slug: "war-2"
  },
  {
    title: "The Conjuring",
    type: "Movie",
    image: "/series/can.jpeg?height=450&width=300",
    releaseDate: "Sept 5, 2025",
    status: "upcoming",
    slug: "the-conjuring"
  },
  {
    title: "Avatar 3",
    type: "Movie",
    image: "/series/av.jpeg?height=450&width=300",
    releaseDate: "Dec 19, 2025",
    status: "upcoming",
    slug: "avatar-3"
  },
  {
    title: "28 Years Later",
    type: "Movie",
    image: "/series/28y.jpeg?height=450&width=300",
    releaseDate: "June 20, 2025",
    status: "upcoming",
    slug: "28-years-later"
  },
  {
    title: "Zootopia 2",
    type: "Movie",
    image: "/series/zoo.jpeg?height=450&width=300",
    releaseDate: "November 26, 2025",
    status: "upcoming",
    slug: "zootopia-2"
  },
  {
    title: "The Bad Guys 2",
    type: "Movie",
    image: "/series/bd.jpeg?height=450&width=300",
    releaseDate: "August 1, 2025",
    status: "upcoming",
    slug: "the-bad-guys-2"
  },
  {
    title: "Sitaare Zameen Par",
    type: "Movie",
    image: "/series/si.jpeg?height=450&width=300",
    releaseDate: "June 20, 2025",
    status: "upcoming",
    slug: "sitaare-zameen-par"
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
    slug: "you"
  },
  {
    title: "Adolescence",
    type: "Series",
    image: "/series/adc.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "Mar 13, 2025",
    status: "released",
    slug: "adolescence"
  },
  {
    title: "Pataal Lok",
    type: "Series",
    image: "/series/patc.jpeg?height=450&width=300",
    rating: 4.9,
    releaseDate: "Jan 17, 2025",
    status: "released",
    slug: "pataal-lok"
  },
  {
    title: "The Last of Us",
    type: "Series",
    image: "/series/thlou.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "Apr 13, 2025",
    status: "released",
    slug: "the-last-of-us"
  },
  {
    title: "Daredevil",
    type: "Series",
    image: "/series/dar.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "Mar 4, 2025",
    status: "released",
    slug: "daredevil"
  },
  {
    title: "Khakee: The Bengal Chapter",
    type: "Series",
    image: "/series/kk.jpeg?height=450&width=300",
    rating: 4.2,
    releaseDate: "March 20, 2025",
    status: "released",
    slug: "khakee-the-bengal-chapter"
  },
];

const upcomingSeries: ContentItem[] = [
  {
    title: "Stranger Things",
    type: "Series",
    image: "/series/stc.jpeg?height=450&width=300",
    releaseDate: "Oct - Nov, 2025",
    status: "upcoming",
    slug: "stranger-things"
  },
  {
    title: "Alice in Borderland",
    type: "Series",
    image: "/series/aibb.jpeg?height=450&width=300",
    releaseDate: "Sept, 2025",
    status: "upcoming",
    slug: "alice-in-borderland"
  },
  {
    title: "Panchayat",
    type: "Series",
    image: "/series/panc.jpeg?height=450&width=300",
    releaseDate: "Jul 2, 2025",
    status: "upcoming",
    slug: "panchayat"
  },
  {
    title: "Squid Game",
    type: "Series",
    image: "/series/sq.jpeg?height=450&width=300",
    releaseDate: "Jun 27, 2025",
    status: "upcoming",
    slug: "squid-game"
  },
  {
    title: "Wednesday",
    type: "Series",
    image: "/series/wenc.jpeg?height=450&width=300",
    releaseDate: "Aug 6, 2025",
    status: "upcoming",
    slug: "wednesday"
  },
  {
    title: "Family Man",
    type: "Series",
    image: "/series/fm.jpeg?height=450&width=300",
    releaseDate: "Nov, 2025",
    status: "upcoming",
    slug: "family-man"
  },
  {
    title: "The Witcher",
    type: "Series",
    image: "/series/wi.jpeg?height=450&width=300",
    releaseDate: "Late 2025",
    status: "upcoming",
    slug: "the-witcher"
  },
  {
    title: "Ironheart",
    type: "Series",
    image: "/series/ir.jpeg?height=450&width=300",
    releaseDate: "June 24, 2025",
    status: "upcoming",
    slug: "ironheart"
  },
  {
    title: "The Sandman",
    type: "Series",
    image: "/series/sad.jpeg?height=450&width=300",
    releaseDate: "July 3, 2025",
    status: "upcoming",
    slug: "the-sandman"
  },
];

// Top 10 combined content based on ratings and popularity
const top10Content: ContentItem[] = [
  {
    title: "Pataal Lok",
    type: "Series",
    image: "/series/patc.jpeg?height=450&width=300",
    rating: 4.9,
    releaseDate: "Jan 17, 2025",
    status: "released",
    slug: "pataal-lok"
  },
  {
    title: "Raid 2",
    type: "Movie",
    image: "/series/radc.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "raid-2"
  },
  {
    title: "The Last of Us",
    type: "Series",
    image: "/series/thlou.jpeg?height=450&width=300",
    rating: 4.8,
    releaseDate: "Apr 13, 2025",
    status: "released",
    slug: "the-last-of-us"
  },
  {
    title: "Ballerina",
    type: "Movie",
    image: "/series/ban.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "June 6, 2025",
    status: "released",
    slug: "ballerina"
  },
  {
    title: "You",
    type: "Series",
    image: "/series/youc.jpeg?height=450&width=300",
    rating: 4.7,
    releaseDate: "Apr 24, 2025",
    status: "released",
    slug: "you"
  },
  {
    title: "Thunderbolt",
    type: "Movie",
    image: "/series/thnc.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "May 1, 2025",
    status: "released",
    slug: "thunderbolt"
  },
  {
    title: "Daredevil",
    type: "Series",
    image: "/series/dar.jpeg?height=450&width=300",
    rating: 4.6,
    releaseDate: "Mar 4, 2025",
    status: "released",
    slug: "daredevil"
  },
  {
    title: "Final Destination",
    type: "Movie",
    image: "/series/fdc.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 16, 2025",
    status: "released",
    slug: "final-destination"
  },
  {
    title: "Mission Impossible: Final Reckoning",
    type: "Movie",
    image: "/series/mic.jpeg?height=450&width=300",
    rating: 4.5,
    releaseDate: "May 17, 2025",
    status: "released",
    slug: "mission-impossible-final-reckoning"
  },
  {
    title: "Chhava",
    type: "Movie",
    image: "/series/ch.jpeg?height=450&width=300",
    rating: 4.3,
    releaseDate: "Feb 14, 2025",
    status: "released",
    slug: "chhava"
  },
];

// Simplified Top 10 Movie Card Component
interface TopMovieCardProps extends ContentItem {
  rank: number;
}

function TopMovieCard({ title, type, image, rating, releaseDate, status, rank, slug }: TopMovieCardProps) {
  const router = useRouter();

  const handleMoreInfo = () => {
    router.push(`/${status}/${slug}`);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700">
      {/* Simple Rank Badge */}
      <div className="absolute top-3 left-3 z-20">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{rank}</span>
        </div>
      </div>
      
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* More Info Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={handleMoreInfo}
            className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-lg"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CineVerse() {
  const [contentType, setContentType] = useState<"movies" | "series">("movies");
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [top10StartIndex, setTop10StartIndex] = useState(0);

  const handleLoadingComplete = () => setIsLoading(false);
  const toggleMenu = () => setIsMenuOpen((o) => !o);

  const arrivedContent = contentType === "movies" ? arrivedMovies : arrivedSeries;
  const upcomingContent = contentType === "movies" ? upcomingMovies : upcomingSeries;

  // Removed sliding functionality - now using mouse drag scroll

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
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-base font-medium text-white">Home</Link>
            <Link href="/released" className="text-base font-medium text-gray-400 transition-colors hover:text-white">Released</Link>
            <Link href="/upcoming" className="text-base font-medium text-gray-400 transition-colors hover:text-white">Upcoming</Link>
            <Link href="/search" className="text-base font-medium text-gray-400 transition-colors hover:text-white">Search</Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300
          bg-black/95 border-b border-gray-800
          shadow-lg
          ${isMenuOpen ? "max-h-80 py-4" : "max-h-0 py-0"}
        `}
        style={{ transitionProperty: "max-height, padding" }}
      >
        <nav className="container flex flex-col gap-4">
          <Link href="/" className="text-base font-medium text-white" onClick={toggleMenu}>Home</Link>
          <Link href="/released" className="text-base font-medium text-gray-400 transition-colors hover:text-white" onClick={toggleMenu}>Released</Link>
          <Link href="/upcoming" className="text-base font-medium text-gray-400 transition-colors hover:text-white" onClick={toggleMenu}>Upcoming</Link>
          <Link href="/search" className="text-base font-medium text-gray-400 transition-colors hover:text-white" onClick={toggleMenu}>Search</Link>
        </nav>
      </div>

      <main className="flex-1">
        <FeaturedShowcase />

        {/* Top 10 Section */}
        <section className="container py-12">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <span>Top 10 Movies & Series</span>
            </h2>
          </div>

          {/* Horizontal scrollable container */}
          <div 
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseDown={(e) => {
              const container = e.currentTarget;
              const startX = e.pageX - container.offsetLeft;
              const scrollLeft = container.scrollLeft;
              let isDown = true;

              const handleMouseMove = (e: { preventDefault: () => void; pageX: number }) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
              };

              const handleMouseUp = () => {
                isDown = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            {top10Content.map((item, index) => (
              <div 
                key={`${item.title}-${index}`} 
                className="flex-shrink-0 w-48 md:w-56 lg:w-64"
              >
                <TopMovieCard
                  {...item}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">2025 Releases</h2>
            <Tabs value={contentType} onValueChange={(value) => setContentType(value as "movies" | "series")} className="w-[300px]">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900">
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
                    slug={movie.slug}
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
                    slug={movie.slug}
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