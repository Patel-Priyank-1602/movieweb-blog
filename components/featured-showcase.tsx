"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Info, X, Layers } from "lucide-react";
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

const FEATURED_CONTENT: FeaturedContent[] = [
  {
    id: 1,
    title: "Stranger Things",
    nameImage: "/series/st_tr.png",
    description: "The fifth and final season of the beloved sci-fi series brings the story of Hawkins to an epic conclusion as the friends face their greatest challenge yet against the forces of the Upside Down.",
    image: "/series/sttt.jpeg?height=600&width=1200",
    type: "Series",
    releaseDate: "November 26, 2025",
    slug: "stranger-things",
    trailerUrl: "https://youtu.be/QlYrNC_1Xmk?si=Ps2bq-3gXZsncNCr",
  },
  {
    id: 2,
    title: "Panchayat",
    nameImage: "/series/pan_r.png",
    description: "The fourth season of this beloved Indian comedy-drama continues to follow Abhishek Tripathi, the secretary of the Phulera village panchayat, as he navigates rural life and village administration.",
    image: "/series/pan.jpeg?height=600&width=1200",
    type: "Series",
    releaseDate: "June 24, 2025",
    slug: "panchayat",
    trailerUrl: "https://youtu.be/AHMEtNAZTP4?si=CV85goqlNRNAFJdt",
  },
  {
    id: 3,
    title: "Alice in Borderland",
    nameImage: "/series/alic_r.png",
    description: "In the third season of this Japanese thriller, survivors of the deadly games must face new challenges as they uncover the truth behind the mysterious world they're trapped in.",
    image: "/series/aibbb.jpeg?height=600&width=1200",
    type: "Series",
    releaseDate: "September 25, 2025",
    slug: "alice-in-borderland",
    trailerUrl: "https://youtu.be/CaWRDITtT1U?si=BRcG5ehylMkyGNy9",
  },
  {
    id: 4,
    title: "Final Destination Bloodlines",
    nameImage: "/series/fin_r.png",
    description: "The latest installment in the popular horror franchise follows a new group of survivors who cheat death after one of them has a premonition about a catastrophic event.",
    image: "/series/fdd.jpeg?height=600&width=1200",
    type: "Movie",
    releaseDate: "May 16, 2025",
    slug: "final-destination",
    trailerUrl: "https://youtu.be/UWMzKXsY9A4?si=zLqRiBGlkzReUe1G",
  },
  {
    id: 5,
    title: "F1: The Movie",
    nameImage: "/series/f1ct.png",
    description: "Set in the fast-paced world of Formula 1, this high-octane drama follows a seasoned driver mentoring a rising star as they battle personal demons, team rivalries, and the limits of speed on the world’s biggest racing stage.",
    image: "/series/f1f.jpeg?height=600&width=1200",
    type: "Movie",
    releaseDate: "June 27, 2025",
    slug: "f1-the-movie",
    trailerUrl: "https://youtu.be/8yh9BPUBbbQ?si=8l-0LrSlZL6hB4L1"
  },
  {
    id: 6,
    title: "How to Train Your Dragon",
    nameImage: "/series/httd_t.png",
    description: "A live-action remake set on the isle of Berk, where Hiccup, a young Viking, forms an unlikely bond with Toothless, a Night Fury dragon, challenging Viking traditions and working to bring peace between humans and dragons while facing an ancient threat.",
    image: "/series/httd.jpeg?height=600&width=1200",
    type: "Movie",
    releaseDate: "June 13, 2025",
    slug: "how-to-train-your-dragon",
    trailerUrl: "https://youtu.be/OWEq2Pf8qpk?si=guhXV2kKgYPbH6t8",
  },
  {
    id: 7,
    title: "Superman 2025",
    nameImage: "/series/supp_t.png",
    description: "Soar into a new era with Clark Kent as he embraces his destiny as Superman, confronting a formidable threat to Metropolis while balancing his Kryptonian heritage with his human heart.",
    image: "/series/sup.jpeg?height=600&width=1200",
    type: "Movie",
    releaseDate: "July 11, 2025",
    slug: "superman",
    trailerUrl: "https://youtu.be/brI3gt9girI?si=01A0-x3pFRT1Rbpl",
  },
];

const CAROUSEL_CONFIG = {
  AUTO_ROTATE_INTERVAL: 240000,
  TRANSITION_DURATION: 600,
  DRAG_THRESHOLD: 100,
  MOBILE_RADIUS: 180,
  DESKTOP_RADIUS: 280,
  LARGE_DESKTOP_RADIUS: 350,
};

export default function FeaturedContentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showBannerFirst, setShowBannerFirst] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
  });
  const [carouselMode, setCarouselMode] = useState<"showcase" | "rotating">("showcase");

  const containerRef = useRef<HTMLDivElement>(null);
  const trailerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<number | null>(null);

  const featured = FEATURED_CONTENT[currentIndex];

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

  // Device detection for showcase mode
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
      setIsDesktop(!isMobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Trailer auto-play for showcase mode
  useEffect(() => {
    if (!youtubeId || !showBannerFirst || carouselMode !== "showcase") return;

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
  }, [currentIndex, youtubeId, showBannerFirst, carouselMode]);

  // Auto-rotation for showcase mode
  useEffect(() => {
    if (carouselMode !== "showcase") return;

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
          setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURED_CONTENT.length);
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
  }, [carouselMode, FEATURED_CONTENT.length]);

  // Thumbnail scroll effect for showcase mode
  useEffect(() => {
    if (carouselMode !== "showcase" || !thumbnailContainerRef.current) return;

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
  }, [currentIndex, carouselMode]);

  // Auto-rotation for rotating mode
  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) return;

    autoRotateRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_CONTENT.length);
    }, CAROUSEL_CONFIG.AUTO_ROTATE_INTERVAL);
  }, []);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (carouselMode === "rotating") {
      startAutoRotate();
      return stopAutoRotate;
    }
  }, [carouselMode, startAutoRotate, stopAutoRotate]);

  // Rotating carousel handlers
  const rotateCarousel = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(newIndex);

      setTimeout(() => {
        setIsTransitioning(false);
      }, CAROUSEL_CONFIG.TRANSITION_DURATION);
    },
    [isTransitioning]
  );

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? FEATURED_CONTENT.length - 1 : currentIndex - 1;
    rotateCarousel(newIndex);
  }, [currentIndex, rotateCarousel]);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % FEATURED_CONTENT.length;
    rotateCarousel(newIndex);
  }, [currentIndex, rotateCarousel]);

  const handleCardClick = useCallback(
    (index: number) => {
      if (index !== currentIndex && !isTransitioning) {
        rotateCarousel(index);
      }
    },
    [currentIndex, rotateCarousel, isTransitioning]
  );

  const handleDragStart = useCallback(
    (clientX: number) => {
      stopAutoRotate();
      setDragState({
        isDragging: true,
        startX: clientX,
        currentX: 0,
      });
    },
    [stopAutoRotate]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!dragState.isDragging) return;

      setDragState((prev) => ({
        ...prev,
        currentX: clientX - prev.startX,
      }));
    },
    [dragState.isDragging]
  );

  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging) return;

    const { currentX } = dragState;

    if (Math.abs(currentX) > CAROUSEL_CONFIG.DRAG_THRESHOLD) {
      if (currentX > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }

    setDragState({
      isDragging: false,
      startX: 0,
      currentX: 0,
    });

    startAutoRotate();
  }, [dragState, handlePrevious, handleNext, startAutoRotate]);

  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const getCardTransform = useCallback(
    (index: number) => {
      const totalCards = FEATURED_CONTENT.length;
      let position = index - currentIndex;

      if (position > totalCards / 2) position -= totalCards;
      if (position < -totalCards / 2) position += totalCards;

      const angle = (position * 360) / totalCards;

      let radius;
      if (window.innerWidth < 768) {
        radius = CAROUSEL_CONFIG.MOBILE_RADIUS;
      } else if (window.innerWidth < 1200) {
        radius = CAROUSEL_CONFIG.DESKTOP_RADIUS;
      } else {
        radius = CAROUSEL_CONFIG.LARGE_DESKTOP_RADIUS;
      }

      const isCenter = position === 0;
      const isAdjacent = Math.abs(position) === 1;

      const translateX = Math.sin((angle * Math.PI) / 180) * radius;
      const translateZ = Math.cos((angle * Math.PI) / 180) * radius - radius;
      const rotateY = -angle * 0.25;

      const baseScale = window.innerWidth < 768 ? 0.9 : 1;
      const scale = isCenter ? baseScale : isAdjacent ? baseScale * 0.8 : baseScale * 0.65;
      const opacity = isCenter ? 1 : isAdjacent ? 0.75 : 0.4;
      const blur = isCenter ? 0 : isAdjacent ? 0.5 : 1.5;

      return {
        transform: `
          translate3d(${translateX}px, 0, ${translateZ}px)
          rotateY(${rotateY}deg)
          scale(${scale})
          ${dragState.isDragging ? `translateX(${dragState.currentX * 0.2}px)` : ""}
        `,
        opacity,
        zIndex: isCenter ? 20 : 10 - Math.abs(position),
        filter: `blur(${blur}px) saturate(${isCenter ? 1 : 0.8})`,
        transition: dragState.isDragging ? "opacity 0.3s ease" : "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
    [currentIndex, dragState]
  );

  const handleTrailerEnd = () => {
    setIsTrailerPlaying(false);
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURED_CONTENT.length);
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

  const handleTrailerClick = useCallback(() => {
    setIsTrailerOpen(true);
  }, []);

  const toggleCarouselMode = () => {
    setCarouselMode((prev) => (prev === "showcase" ? "rotating" : "showcase"));
    setIsTrailerPlaying(false);
    setIsTrailerOpen(false);
    setShowBannerFirst(true);
    setCurrentIndex(0);
    stopAutoRotate();
    if (trailerTimerRef.current) {
      clearTimeout(trailerTimerRef.current);
    }
  };

  return (
    <div className="relative w-full min-h-[90vh] overflow-hidden">
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 z-[25] bg-black/50 hover:bg-black/70 text-white border-white/30 text-xs px-3 py-1 h-8 flex items-center gap-1"
        onClick={toggleCarouselMode}
      >
        <Layers className="h-4 w-4" />
        {carouselMode === "showcase" ? "" : ""}
      </Button>
      {carouselMode === "showcase" ? (
        <div className="relative w-full h-[85vh] overflow-hidden" ref={containerRef}>
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
                  src={featured.image || "/placeholder-image.jpg"}
                  alt={`${featured.title} background`}
                  fill
                  className={`object-cover transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </>
            )}
          </div>

          <div
            className={`relative h-full container flex flex-col justify-end md:justify-end items-center md:items-start text-center md:text-left pb-16 transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"
              }`}
          >
            <div className="max-w-3xl space-y-4 flex flex-col items-center md:items-start">
              <div className="relative w-fit max-w-[80vw]">
                <Image
                  src={featured.nameImage || "/placeholder-logo.png"}
                  alt={`${featured.title} logo`}
                  width={400}
                  height={120}
                  className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain"
                  style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))" }}
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                />
              </div>

              <div className="flex justify-center md:justify-start gap-2">
                <span className="text-sm text-gray-300">{featured.type}</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm text-gray-300">{featured.releaseDate}</span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md sm:max-w-lg md:max-w-2xl px-4 md:px-0">{featured.description}</p>

              <div className="flex flex-nowrap justify-center md:justify-start gap-2 pt-4 group/more-info">
                {youtubeId ? (
                  <Button
                    size="sm"
                    className="gap-2 md:h-11 md:rounded-md md:px-8"
                    onClick={handleTrailerClick}
                  >
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
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2 md:h-11 md:px-8 group-hover/more-info:bg-opacity-100"
                  >
                    <Info className="h-4 w-4 md:h-5 md:w-5" />
                    More Info
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
              {FEATURED_CONTENT.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleBannerChange(item.id - 1)}
                  className={`w-3 h-3 rounded-full ${item.id - 1 === currentIndex ? "bg-white" : "bg-gray-600"
                    }`}
                  aria-label={`View ${item.title} featured content`}
                />
              ))}
            </div>

            <div
              className="absolute bottom-6 right-6 hidden md:flex flex-row gap-2 overflow-x-auto scrollbar-hide group-hover/more-info:opacity-0 group-hover/more-info:pointer-events-none transition-opacity duration-200 w-[19rem] lg:w-[29.5rem]"
              ref={thumbnailContainerRef}
              style={{ scrollBehavior: "smooth" }}
            >
              {FEATURED_CONTENT.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleBannerChange(index)}
                  className={`relative group transition-all duration-200 flex-shrink-0 ${index === currentIndex
                    ? "ring-2 ring-white scale-105"
                    : "hover:scale-105 hover:ring-1 hover:ring-white/50"
                    }`}
                  style={{ width: "5rem", height: "3.5rem" }}
                >
                  <div className="relative w-full h-full rounded overflow-hidden">
                    <Image
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                      loading="lazy"
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
      ) : (
        <div className="relative w-full min-h-[90vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden select-none">
          <div className="absolute inset-0 transition-all duration-1000">
            <img
              src={featured.image || "/placeholder-image.jpg"}
              alt={featured.title}
              loading="lazy"
              className="w-full h-full object-cover opacity-12 blur-sm scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/15 to-pink-900/15" />
          </div>

          <div className="relative z-10 h-full flex flex-col max-w-7xl mx-auto">
            <header className="flex-shrink-0 flex items-center justify-center pt-4 px-4 min-h-[40vh]">
              <div className="text-center max-w-5xl w-full">
                <div className="mb-3">
                  <img
                    src={featured.nameImage}
                    alt={featured.title}
                    loading="lazy"
                    className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto mx-auto drop-shadow-2xl transition-all duration-700 max-w-full"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      if (img.nextSibling && img.nextSibling instanceof HTMLElement) {
                        (img.nextSibling as HTMLElement).style.display = "block";
                      }
                    }}
                  />
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white hidden"
                    style={{ display: "none" }}
                  >
                    {featured.title}
                  </h1>
                </div>

                <div className="flex justify-center items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium text-white backdrop-blur-md border border-white/10">
                    {featured.type}
                  </span>
                  <span className="text-gray-200 text-xs font-medium">{featured.releaseDate}</span>
                </div>

                <p className="text-gray-200 text-sm md:text-base lg:text-lg max-w-3xl mx-auto mb-4 leading-6 opacity-90 px-4">
                  {featured.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-14">
                  <Button
                    onClick={handleTrailerClick}
                    style={{ backgroundColor: "#6426c4" }}
                    className="hover:bg-purple-800 text-white px-5 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-medium text-sm"
                  >
                    <PlayCircle className="mr-1 h-4 w-4" />
                    Watch Trailer
                  </Button>
                  <Link href={`/${featured.type.toLowerCase()}/${featured.slug}`} passHref>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/20 px-8 py-2 rounded-full backdrop-blur-md transition-all duration-200 font-medium text-sm flex items-center gap-2 min-w-[140px]"
                      style={{ minWidth: "140px" }}
                    >
                      <Info className="h-5 w-5 mr-2" />
                      <span>More Info</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            <section className="flex-1 flex items-center justify-center relative min-h-[40vh] px-4 pt-4">
              <div
                ref={containerRef}
                className="relative w-full h-full max-h-80 cursor-grab active:cursor-grabbing"
                style={{ perspective: "1000px" }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-88 lg:w-80 lg:h-96"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {FEATURED_CONTENT.map((item, index) => {
                      const isActive = index === currentIndex;

                      return (
                        <div
                          key={item.id}
                          className="absolute inset-0 cursor-pointer group"
                          style={{
                            ...getCardTransform(index),
                            transformStyle: "preserve-3d",
                          }}
                          onClick={() => handleCardClick(index)}
                        >
                          <article className="w-40 h-56 sm:w-48 sm:h-64 md:w-52 md:h-72 lg:w-56 lg:h-80 mx-auto">
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                              <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-3/4 object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE2Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                                <h3 className="font-bold text-xs md:text-sm lg:text-base mb-1 line-clamp-1">
                                  {item.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs">
                                  <span className="px-1.5 py-0.5 bg-white/30 rounded text-xs font-medium backdrop-blur-sm">
                                    {item.type}
                                  </span>
                                  <span className="text-xs text-gray-300 truncate">{item.releaseDate}</span>
                                </div>
                              </div>
                              {isActive && (
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl blur-lg opacity-40 -z-10 animate-pulse" />
                              )}
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
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
      )}
    </div>
  );
}
