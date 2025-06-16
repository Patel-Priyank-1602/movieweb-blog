"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Info, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import YouTube, { YouTubeProps } from "react-youtube";

interface FeaturedContent {
  id: number;
  title: string;
  nameImage: string;
  description: string;
  image: string;
  type: "Movie" | "Series";
  releaseDate: string;
  slug: string;
  trailerUrl: string;
}

export default function FeaturedShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showBannerFirst, setShowBannerFirst] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const featuredContent: FeaturedContent[] = [
    {
      id: 1,
      title: "Stranger Things",
      nameImage: "/series/st_tr.png",
      description:
        "The fifth and final season of the beloved sci-fi series brings the story of Hawkins to an epic conclusion as the friends face their greatest challenge yet against the forces of the Upside Down.",
      image: "/series/sttt.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "October - November, 2025",
      slug: "stranger-things",
      trailerUrl: "https://youtu.be/QlYrNC_1Xmk?si=Ps2bq-3gXZsncNCr",
    },
    {
      id: 2,
      title: "Panchayat",
      nameImage: "/series/pan_r.png",
      description:
        "The fourth season of this beloved Indian comedy-drama continues to follow Abhishek Tripathi, the secretary of the Phulera village panchayat, as he navigates rural life and village administration.",
      image: "/series/pan.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "July 2, 2025",
      slug: "panchayat",
      trailerUrl: "https://youtu.be/AHMEtNAZTP4?si=CV85goqlNRNAFJdt",
    },
    {
      id: 3,
      title: "Alice in Borderland",
      nameImage: "/series/alic_r.png",
      description:
        "In the third season of this Japanese thriller, survivors of the deadly games must face new challenges as they uncover the truth behind the mysterious world they're trapped in.",
      image: "/series/aibbb.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "September, 2025",
      slug: "alice-in-borderland",
      trailerUrl: "https://youtu.be/HQtrqkKkq7E?si=XsWo1rqDMw3mYIeG",
    },
    {
      id: 4,
      title: "Final Destination Bloodlines",
      nameImage: "/series/fin_r.png",
      description:
        "The latest installment in the popular horror franchise follows a new group of survivors who cheat death after one of them has a premonition about a catastrophic event.",
      image: "/series/fdd.jpeg?height=600&width=1200",
      type: "Movie",
      releaseDate: "May 16, 2025",
      slug: "final-destination",
      trailerUrl: "https://youtu.be/UWMzKXsY9A4?si=zLqRiBGlkzReUe1G",
    },
    {
      id: 5,
      title: "The Last of Us",
      nameImage: "/series/thlous_r.png",
      description: "In a post-apocalyptic world ravaged by a fungal infection, hardened survivor Joel is tasked with smuggling 14-year-old Ellie, who may hold the key to humanity's survival, across a dangerous United States.",
      image: "/series/thlou_r.jpeg?height=600&width=1200",
      type: "Series",
      releaseDate: "April 13, 2025",
      slug: "the-last-of-us",
      trailerUrl: "https://youtu.be/_zHPsmXCjB0"
    },
    {
      id: 6,
      title: "Avatar 3",
      nameImage: "/series/avt_r.png",
      description:
        "Return to Pandora as Jake Sully and Neytiri continue their journey, exploring new regions of the planet and facing a threat that tests the bonds of their family and the Na'vi people.",
      image: "/series/avvv.jpeg?height=600&width=1200",
      type: "Movie",
      releaseDate: "December 19, 2025",
      slug: "avatar-3",
      trailerUrl: "",
    },
  ];

  const featured = featuredContent[currentIndex];

  const getYouTubeId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = featured.trailerUrl ? getYouTubeId(featured.trailerUrl) : null;

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
  };

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
      setIsDesktop(!isMobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!youtubeId || !showBannerFirst) return;

    if (trailerTimerRef.current) {
      clearTimeout(trailerTimerRef.current);
    }

    trailerTimerRef.current = setTimeout(() => {
      setIsTrailerPlaying(true);
      setShowBannerFirst(false);
    }, 4000);

    return () => {
      if (trailerTimerRef.current) {
        clearTimeout(trailerTimerRef.current);
      }
    };
  }, [currentIndex, youtubeId, showBannerFirst]);

  const handleTrailerEnd = () => {
    setIsTrailerPlaying(false);
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length);
      setIsFading(false);
      setShowBannerFirst(true);
    }, 350);
  };

  const handleStopTrailer = () => {
    setIsTrailerPlaying(false);
    setShowBannerFirst(true);
  };

  const handleBannerChange = (index: number) => {
    setIsFading(true);
    setIsTrailerPlaying(false);
    setShowBannerFirst(true);
    if (trailerTimerRef.current) {
      clearTimeout(trailerTimerRef.current);
    }
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 350);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startInterval = () => {
      interval = setInterval(() => {
        setIsFading(true);
        setIsTrailerPlaying(false);
        setShowBannerFirst(true);
        if (trailerTimerRef.current) {
          clearTimeout(trailerTimerRef.current);
        }
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length);
          setIsFading(false);
        }, 350);
      }, 3850);
    };

    const stopInterval = () => clearInterval(interval);

    startInterval();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", stopInterval);
      container.addEventListener("mouseleave", startInterval);
    }

    return () => {
      stopInterval();
      if (container) {
        container.removeEventListener("mouseenter", stopInterval);
        container.removeEventListener("mouseleave", startInterval);
      }
      if (trailerTimerRef.current) {
        clearTimeout(trailerTimerRef.current);
      }
    };
  }, [featuredContent.length]);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const selectedThumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
      if (selectedThumbnail) {
        const containerWidth = thumbnailContainerRef.current.offsetWidth;
        const thumbnailWidth = selectedThumbnail.offsetWidth;
        const scrollPosition = selectedThumbnail.offsetLeft - (containerWidth - thumbnailWidth) / 2;
        thumbnailContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0">
        {isTrailerPlaying && youtubeId && !showBannerFirst ? (
          <div className="relative w-full h-full">
            <YouTube
              videoId={youtubeId}
              opts={opts}
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
              onEnd={handleTrailerEnd}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 z-10"
              onClick={handleStopTrailer}
            >
              <X className="h-5 w-5 text-white" />
              <span className="sr-only">Stop trailer</span>
            </Button>
          </div>
        ) : (
          <>
            <Image
              src={featured.image}
              alt={`${featured.title} background`}
              fill
              className={`object-cover transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
              priority={currentIndex === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </>
        )}
      </div>

      <div
        className={`relative h-full container flex flex-col justify-end md:justify-end items-center md:items-start text-center md:text-left pb-16 transition-opacity duration-200 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-3xl space-y-4 flex flex-col items-center md:items-start">
          <div className="relative w-fit max-w-[80vw]">
            <Image
              src={featured.nameImage}
              alt={`${featured.title} logo`}
              width={400}
              height={120}
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain"
              style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))" }}
              priority={currentIndex === 0}
            />
          </div>

          <div className="flex justify-center md:justify-start gap-2">
            <span className="text-sm text-gray-300">{featured.type}</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">{featured.releaseDate}</span>
          </div>

          <p className="hidden md:block text-base sm:text-lg text-gray-300 max-w-2xl">{featured.description}</p>

          <div className="flex flex-nowrap justify-center md:justify-start gap-2 pt-4 group/more-info">
            {youtubeId ? (
              <Button size="sm" className="gap-2 md:h-11 md:rounded-md md:px-8" onClick={() => setIsTrailerOpen(true)}>
                <PlayCircle className="h-4 w-4 md:h-5 md:w-5" />
                Watch Trailer
              </Button>
            ) : (
              <Button size="sm" className="gap-2 md:h-11 md:px-8" disabled>
                <PlayCircle className="h-4 w-4 md:h-5 md:w-5" />
                Trailer Unavailable
              </Button>
            )}
            <Link href={`/${featured.type.toLowerCase()}/${featured.slug}`}>
              <Button size="sm" variant="secondary" className="gap-2 md:h-11 md:px-8 group-hover/more-info:bg-opacity-100">
                <Info className="h-4 w-4 md:h-5 md:w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>

        {/* Fixed className syntax */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {featuredContent.map((item) => (
            <button
              key={item.id}
              onClick={() => handleBannerChange(item.id - 1)}
              className={`w-3 h-3 rounded-full ${item.id - 1 === currentIndex ? "bg-white" : "bg-gray-600"}`}
              aria-label={`View ${item.title} featured content`}
            />
          ))}
        </div>

        <div
          className="absolute bottom-6 right-6 hidden md:flex flex-row gap-2 overflow-x-auto scrollbar-hide group-hover/more-info:opacity-0 group-hover/more-info:pointer-events-none transition-opacity duration-200 w-[19rem] lg:w-[29.5rem]"
          ref={thumbnailContainerRef}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {featuredContent.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleBannerChange(index)}
              className={`relative group transition-all duration-200 flex-shrink-0 ${
                index === currentIndex ? "ring-2 ring-white scale-105" : "hover:scale-105 hover:ring-1 hover:ring-white/50"
              }`}
              style={{ width: "5rem", height: "3.5rem" }}
            >
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {item.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>

      {isTrailerOpen && youtubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 z-10"
              onClick={() => setIsTrailerOpen(false)}
            >
              <X className="h-5 w-5 text-white" />
              <span className="sr-only">Close trailer</span>
            </Button>
            <div className="relative aspect-video">
              <YouTube videoId={youtubeId} opts={opts} className="absolute inset-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}