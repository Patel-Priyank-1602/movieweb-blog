"use client"

import Link from "next/link"
import { ArrowLeft, Film, Code, Github, Linkedin, Mail, Instagram, Twitter, Contact, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to home</span>
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Code className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">Developer</span>
                        </div>
                    </div>
                    {/* Navbar */}
                    <nav className="flex items-center gap-4">
                        <Link href="https://patel-priyank-1602.github.io/contactcvr/" target="_blank" rel="noopener noreferrer">
                            <Button variant="default" className="gap-2">
                                <Contact className="h-3 w-3" />
                                Contact
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
                <div className="container text-center space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-primary rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                            <img
                                src="/Priyank.jpg"
                                alt="Developer Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Hi, I'm the Developer
                            </h1>
                            <p className="text-lg text-primary font-medium">Frontend Developer</p>
                        </div>
                    </div>

                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        I'm a passionate developer driven by creativity, storytelling, and technology. I specialize in crafting interactive and impactful web experiences that blend design with functionality. My journey into web development started with a deep love for cinema and a desire to build platforms that connect people with the content they love.
                    </p>
                </div>
            </section>

            <section className="py-10 bg-black">
                <div className="container">
                    <div className="text-center mb-8">
                        <h2 className="text-xl md:text-4xl font-bold mb-4">Let's Connect</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            I'm always interested in discussing new opportunities, collaborations, or just chatting about technology!
                        </p>
                    </div>

                    <div className="flex justify-center gap-6 sm:gap-8">
                        <a
                            href="mailto:patelpriyank2526@gmail.com"
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Mail className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="sr-only">Email</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/patel-priyank-945131288/"
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Linkedin className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a
                            href="https://github.com/Patel-Priyank-1602"
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Github className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a
                            href="https://priyank-patel-d.netlify.app/"
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Laptop className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="sr-only">Portfolio</span>
                        </a>
                        <a
                            href="https://www.instagram.com/patelpriyank.d/"
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Instagram className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a
                            href="https://x.com/Priyank_P16"
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Twitter className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Thanks for Visiting!</h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        I hope you enjoy using CineVerse Hub. If you have any feedback, suggestions, or just want to say hi, don't
                        hesitate to reach out!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/">
                            <Button size="lg" className="gap-2">
                                <Film className="h-5 w-5" />
                                Explore CineVerse
                            </Button>
                        </Link>
                        <Link href="https://patel-priyank-1602.github.io/contactcvr/" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                                <Contact className="h-5 w-5" />
                                Contact Me
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div >
    )
}
