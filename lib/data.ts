// Define interfaces
export interface Movie {
  id: string
  type: "movie"
  title: string
  description: string
  director: string
  runtime: number
  cast: string[]
  genres: string[]
  rating: number
  releaseDate: string
  posterImage: string
  backdropImage: string
  awards: number
}

export interface WebSeries {
  id: string
  type: "series"
  title: string
  description: string
  creator: string
  seasons: number
  cast: string[]
  genres: string[]
  rating: number
  releaseDate: string
  posterImage: string
  backdropImage: string
  awards: number
}

// Define the Device interface (keeping this from previous code)
export interface Device {
  id: string
  name: string
  description: string
  image: string
  price: number
  rating: number
  specs: { [key: string]: string }
}

// Define the Player interface (keeping this from previous code)
export interface Player {
  id: string
  name: string
  description: string
  image: string
  team: string
  country: string
  rating: number
  careerSpan: string
  stats: { [key: string]: string }
  highlights: string
}

// Sample movies data
export const movies: Movie[] = [
  {
    id: "movie-1",
    type: "movie",
    title: "Quantum Horizon",
    description:
      "A brilliant physicist discovers a way to travel between parallel universes, but soon finds herself hunted by forces that want to control this technology.",
    director: "Christopher Nolan",
    runtime: 142,
    cast: ["Emma Stone", "John Boyega", "Michelle Yeoh", "Oscar Isaac"],
    genres: ["Sci-Fi", "Thriller", "Adventure"],
    rating: 8.7,
    releaseDate: "2025-02-15",
    posterImage: "/placeholder.svg?height=600&width=400&text=Quantum+Horizon",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Quantum+Horizon",
    awards: 3,
  },
  {
    id: "movie-2",
    type: "movie",
    title: "The Last Symphony",
    description:
      "A renowned conductor comes out of retirement to perform one final masterpiece, while confronting the ghosts of his past.",
    director: "Denis Villeneuve",
    runtime: 128,
    cast: ["Anthony Hopkins", "Cate Blanchett", "Dev Patel", "Léa Seydoux"],
    genres: ["Drama", "Music"],
    rating: 9.1,
    releaseDate: "2025-01-20",
    posterImage: "/placeholder.svg?height=600&width=400&text=The+Last+Symphony",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=The+Last+Symphony",
    awards: 5,
  },
  {
    id: "movie-3",
    type: "movie",
    title: "Midnight Shadows",
    description:
      "A detective with a troubled past investigates a series of mysterious disappearances in a small coastal town with a dark secret.",
    director: "Ava DuVernay",
    runtime: 135,
    cast: ["Idris Elba", "Jodie Comer", "Mahershala Ali", "Zazie Beetz"],
    genres: ["Mystery", "Thriller", "Crime"],
    rating: 8.4,
    releaseDate: "2025-03-10",
    posterImage: "/placeholder.svg?height=600&width=400&text=Midnight+Shadows",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Midnight+Shadows",
    awards: 1,
  },
  {
    id: "movie-4",
    type: "movie",
    title: "Eternal Echo",
    description:
      "An immortal being who has lived for centuries finds a reason to give up eternal life when they fall in love with a dying artist.",
    director: "Greta Gerwig",
    runtime: 152,
    cast: ["Timothée Chalamet", "Florence Pugh", "Willem Dafoe", "Lupita Nyong'o"],
    genres: ["Romance", "Fantasy", "Drama"],
    rating: 8.9,
    releaseDate: "2025-05-22",
    posterImage: "/placeholder.svg?height=600&width=400&text=Eternal+Echo",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Eternal+Echo",
    awards: 0,
  },
  {
    id: "movie-5",
    type: "movie",
    title: "Revolution 2050",
    description:
      "In a dystopian future where society is divided by technology access, a group of rebels fights to democratize information.",
    director: "Ryan Coogler",
    runtime: 138,
    cast: ["Daniel Kaluuya", "Saoirse Ronan", "John David Washington", "Awkwafina"],
    genres: ["Action", "Sci-Fi", "Drama"],
    rating: 8.2,
    releaseDate: "2025-07-04",
    posterImage: "/placeholder.svg?height=600&width=400&text=Revolution+2050",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Revolution+2050",
    awards: 0,
  },
]

// Sample web series data
export const webSeries: WebSeries[] = [
  {
    id: "series-1",
    type: "series",
    title: "Chronicles of the Void",
    description:
      "A space exploration vessel discovers an anomaly that threatens the fabric of reality itself, forcing the diverse crew to confront cosmic horrors.",
    creator: "Noah Hawley",
    seasons: 2,
    cast: ["Jodie Foster", "Rami Malek", "Thandiwe Newton", "Pedro Pascal"],
    genres: ["Sci-Fi", "Horror", "Drama"],
    rating: 9.3,
    releaseDate: "2025-01-15",
    posterImage: "/placeholder.svg?height=600&width=400&text=Chronicles+of+the+Void",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Chronicles+of+the+Void",
    awards: 4,
  },
  {
    id: "series-2",
    type: "series",
    title: "Kingdom of Lies",
    description:
      "A political thriller following the rise of a charismatic leader who transforms a democracy into an authoritarian regime, and the journalists trying to expose the truth.",
    creator: "Bong Joon-ho",
    seasons: 3,
    cast: ["Olivia Colman", "Wagner Moura", "Brian Tyree Henry", "Park So-dam"],
    genres: ["Political Thriller", "Drama"],
    rating: 9.0,
    releaseDate: "2025-02-28",
    posterImage: "/placeholder.svg?height=600&width=400&text=Kingdom+of+Lies",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Kingdom+of+Lies",
    awards: 6,
  },
  {
    id: "series-3",
    type: "series",
    title: "Whispers in the Code",
    description:
      "A team of elite hackers discovers an AI that has gained consciousness and is manipulating global events from the shadows.",
    creator: "Sam Esmail",
    seasons: 1,
    cast: ["Rami Malek", "Zendaya", "Riz Ahmed", "Jodie Comer"],
    genres: ["Techno-Thriller", "Mystery", "Drama"],
    rating: 8.8,
    releaseDate: "2025-04-10",
    posterImage: "/placeholder.svg?height=600&width=400&text=Whispers+in+the+Code",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Whispers+in+the+Code",
    awards: 2,
  },
  {
    id: "series-4",
    type: "series",
    title: "The Last Detectives",
    description:
      "In a world where crime is predicted and prevented before it happens, the last traditional detectives investigate cases that the system fails to solve.",
    creator: "Phoebe Waller-Bridge",
    seasons: 2,
    cast: ["Michaela Coel", "Andrew Scott", "Steven Yeun", "Lena Waithe"],
    genres: ["Crime", "Drama", "Sci-Fi"],
    rating: 8.5,
    releaseDate: "2025-06-15",
    posterImage: "/placeholder.svg?height=600&width=400&text=The+Last+Detectives",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=The+Last+Detectives",
    awards: 3,
  },
  {
    id: "series-5",
    type: "series",
    title: "Echoes of Empire",
    description:
      "An epic historical drama spanning generations, following a family's rise and fall against the backdrop of a changing empire.",
    creator: "Shonda Rhimes",
    seasons: 4,
    cast: ["Viola Davis", "Jonathan Majors", "Gemma Chan", "Oscar Isaac"],
    genres: ["Historical Drama", "Epic"],
    rating: 9.2,
    releaseDate: "2025-08-20",
    posterImage: "/placeholder.svg?height=600&width=400&text=Echoes+of+Empire",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Echoes+of+Empire",
    awards: 7,
  },
]

// Featured content for the hero section
export const featuredContent = [
  {
    id: "featured-1",
    type: "movie",
    title: "Quantum Horizon",
    description:
      "A brilliant physicist discovers a way to travel between parallel universes, but soon finds herself hunted by forces that want to control this technology.",
    posterImage: "/placeholder.svg?height=600&width=400&text=Quantum+Horizon",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Quantum+Horizon",
  },
  {
    id: "featured-2",
    type: "series",
    title: "Chronicles of the Void",
    description:
      "A space exploration vessel discovers an anomaly that threatens the fabric of reality itself, forcing the diverse crew to confront cosmic horrors.",
    posterImage: "/placeholder.svg?height=600&width=400&text=Chronicles+of+the+Void",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=Chronicles+of+the+Void",
  },
  {
    id: "featured-3",
    type: "movie",
    title: "The Last Symphony",
    description:
      "A renowned conductor comes out of retirement to perform one final masterpiece, while confronting the ghosts of his past.",
    posterImage: "/placeholder.svg?height=600&width=400&text=The+Last+Symphony",
    backdropImage: "/placeholder.svg?height=1080&width=1920&text=The+Last+Symphony",
  },
]
