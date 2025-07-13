"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Bell, Film, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isOTTSidebarOpen, setIsOTTSidebarOpen] = useState(false)
    const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleOTTSidebar = () => setIsOTTSidebarOpen(!isOTTSidebarOpen)
    const toggleTabletMenu = () => setIsTabletMenuOpen(!isTabletMenuOpen)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isTabletMenuOpen && target && !target.closest('.tablet-menu-container')) {
                setIsTabletMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isTabletMenuOpen]);


    return (
        <>
            {/* Professional Navigation Bar */}
            <header
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg"
                    : "bg-black/80 backdrop-blur-sm"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Brand Section with OTT Sidebar */}
                        <div className="flex items-center">
                            <div className="relative group z-[9999]">
                                <div className="flex items-center gap-3" onClick={toggleOTTSidebar}>
                                    <Film className="h-6 w-6 text-primary" />
                                    {/* Brand Name */}
                                    <span className="text-xl font-bold cursor-pointer select-none">
                                        CineVers<span className="text-[#6325c3]">e Hub</span>
                                    </span>
                                </div>

                                {/* Full Screen OTT Sidebar - Slides from Left, Covers Screen Top to Bottom */}
                                <div
                                    className={`fixed top-0 left-0 h-screen w-80 bg-gradient-to-b from-[#18181b] to-[#0a0a0a] border-r border-gray-700 shadow-2xl transform transition-transform duration-300 z-[9999] overflow-y-auto ${isOTTSidebarOpen ? "translate-x-0" : "-translate-x-full"
                                        }`}
                                >
                                    {/* Header with Title and Close Button */}
                                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                                        <span className="text-lg font-semibold text-gray-400 uppercase tracking-wider">
                                            OTT Apps
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={toggleOTTSidebar}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    {/* OTT App Links */}
                                    <div className="py-6 px-4">
                                        <div className="flex flex-col space-y-2">
                                            {[
                                                {
                                                    name: "JioHotstar",
                                                    icon: "jioh",
                                                    link: "https://www.jiohotstar.com/",
                                                },
                                                {
                                                    name: "Netflix",
                                                    icon: "netflix",
                                                    link: "https://www.netflix.com/",
                                                },
                                                {
                                                    name: "Prime Video",
                                                    icon: "primev",
                                                    link: "https://www.primevideo.com/",
                                                },
                                                {
                                                    name: "Apple TV+",
                                                    icon: "appletv",
                                                    link: "https://tv.apple.com/",
                                                },
                                                {
                                                    name: "SonyLiv",
                                                    icon: "sonyliv",
                                                    link: "https://www.sonyliv.com/",
                                                },
                                            ].map((app) => (
                                                <a
                                                    key={app.name}
                                                    href={app.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                                                    onClick={toggleOTTSidebar}
                                                >
                                                    <img
                                                        src={`/icons/${app.icon}.png`}
                                                        alt={app.name}
                                                        loading="lazy"
                                                        className="w-7 h-7 object-contain"
                                                    />
                                                    <span className="text-white">{app.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation - Hidden on tablet */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link
                                href="/"
                                className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-white border-b-2 border-[#6d28d9] pb-1" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/released"
                                className={`text-sm font-medium transition-colors ${pathname === "/released" ? "text-white border-b-2 border-[#6d28d9] pb-1" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Released
                            </Link>
                            <Link
                                href="/upcoming"
                                className={`text-sm font-medium transition-colors ${pathname === "/upcoming" ? "text-white border-b-2 border-[#6d28d9] pb-1" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Upcoming
                            </Link>
                            <Link
                                href="/search"
                                className={`text-sm font-medium transition-colors ${pathname === "/search" ? "text-white border-b-2 border-[#6d28d9] pb-1" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Search
                            </Link>
                            <Link
                                href="/about"
                                className={`text-sm font-medium transition-colors ${pathname === "/about" ? "text-white border-b-2 border-[#6d28d9] pb-1" : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                About
                            </Link>
                        </nav>

                        {/* Desktop Action Buttons - Hidden on tablet */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href="/search">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`text-gray-300 hover:text-white ${pathname === "/search" ? "bg-[#6d28d9]" : ""
                                        }`}
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/notifications">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`text-gray-300 hover:text-white relative ${pathname === "/notifications" ? "bg-[#6d28d9]" : ""
                                        }`}
                                >
                                    <Bell className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-400 hover:bg-[#6d28d9] hover:text-white bg-transparent"
                                asChild
                            >
                                <Link href="https://cvrecommendation.netlify.app/">
                                    <Film className="h-4 w-4 mr-2" />
                                    Recommendations
                                </Link>
                            </Button>
                        </div>

                        {/* Tablet Menu Button - Shows on tablet (md to lg) */}
                        <div className="hidden md:flex lg:hidden items-center gap-4">
                            <Link href="/search">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`text-gray-300 hover:text-white ${pathname === "/search" ? "bg-[#6d28d9]" : ""
                                        }`}
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="relative tablet-menu-container">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleTabletMenu}
                                    className="text-gray-300 hover:text-white"
                                >
                                    {isTabletMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </Button>

                                {/* Tablet Dropdown Menu */}
                                <div
                                    className={`absolute right-0 top-12 w-64 bg-black/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl transform transition-all duration-300 ${isTabletMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                                        }`}
                                >
                                    <div className="p-4">
                                        <nav className="space-y-2">
                                            <Link
                                                href="/"
                                                onClick={toggleTabletMenu}
                                                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${pathname === "/" ? "text-white bg-[#6d28d9]/20 border-l-4 border-[#6d28d9]" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                    }`}
                                            >
                                                Home
                                            </Link>
                                            <Link
                                                href="/released"
                                                onClick={toggleTabletMenu}
                                                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${pathname === "/released" ? "text-white bg-[#6d28d9]/20 border-l-4 border-[#6d28d9]" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                    }`}
                                            >
                                                Released
                                            </Link>
                                            <Link
                                                href="/upcoming"
                                                onClick={toggleTabletMenu}
                                                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${pathname === "/upcoming" ? "text-white bg-[#6d28d9]/20 border-l-4 border-[#6d28d9]" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                    }`}
                                            >
                                                Upcoming
                                            </Link>
                                            <Link
                                                href="/about"
                                                onClick={toggleTabletMenu}
                                                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${pathname === "/about" ? "text-white bg-[#6d28d9]/20 border-l-4 border-[#6d28d9]" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                    }`}
                                            >
                                                About
                                            </Link>
                                        </nav>

                                        <div className="pt-4 border-t border-gray-700 mt-4 space-y-2">
                                            <Link href="/notifications">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 ${pathname === "/notifications" ? "bg-gray-800" : ""
                                                        }`}
                                                    onClick={toggleTabletMenu}
                                                >
                                                    <Bell className="h-4 w-4 mr-3" />
                                                    Updates
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full border-blue-600 text-blue-400 hover:bg-[#6d28d9] hover:text-white bg-transparent"
                                                asChild
                                            >
                                                <Link href="https://cvrecommendation.netlify.app/" onClick={toggleTabletMenu}>
                                                    <Film className="h-4 w-4 mr-2" />
                                                    Recommendations
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button - Shows only on mobile */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMenu}
                            className="md:hidden text-gray-300 hover:text-white"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Enhanced Mobile Menu with Slow Animation - Only on mobile */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-all duration-700 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-700 ${isMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={toggleMenu}
                ></div>

                {/* Menu Panel */}
                <div
                    className={`fixed top-0 right-0 w-80 h-full bg-black border-l border-gray-700 shadow-2xl transform transition-all duration-700 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMenu}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Menu Content */}
                    <nav className="p-6 space-y-4">
                        <Link
                            href="/"
                            onClick={toggleMenu}
                            className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 ${pathname === "/" ? "text-white bg-blue-600/20 border-l-4 border-blue-500" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                }`}
                            style={{ borderLeftColor: "#7336d5" }}
                        >
                            Home
                        </Link>
                        <Link
                            href="/released"
                            onClick={toggleMenu}
                            className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 ${pathname === "/released" ? "text-white bg-blue-600/20 border-l-4 border-blue-500" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                }`}
                            style={{ borderLeftColor: "#7336d5" }}
                        >
                            Released
                        </Link>
                        <Link
                            href="/upcoming"
                            onClick={toggleMenu}
                            className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 ${pathname === "/upcoming" ? "text-white bg-blue-600/20 border-l-4 border-blue-500" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                }`}
                            style={{ borderLeftColor: "#7336d5" }}
                        >
                            Upcoming
                        </Link>
                        <Link
                            href="/search"
                            onClick={toggleMenu}
                            className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 ${pathname === "/search" ? "text-white bg-blue-600/20 border-l-4 border-blue-500" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                }`}
                            style={{ borderLeftColor: "#7336d5" }}
                        >
                            Search
                        </Link>
                        <Link
                            href="/about"
                            onClick={toggleMenu}
                            className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 ${pathname === "/about" ? "text-white bg-blue-600/20 border-l-4 border-blue-500" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                }`}
                            style={{ borderLeftColor: "#7336d5" }}
                        >
                            About
                        </Link>

                        {/* Mobile Action Buttons */}
                        <div className="pt-6 border-t border-gray-700 space-y-3">
                            <div>
                                <Link href="/search">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 ${pathname === "/search" ? "bg-gray-800" : ""
                                            }`}
                                    >
                                        <Search className="h-4 w-4 mr-3" />
                                        Search
                                    </Button>
                                </Link>
                            </div>

                            <div>
                                <Link href="/notifications">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 relative ${pathname === "/notifications" ? "bg-gray-800" : ""
                                            }`}
                                    >
                                        <Bell className="h-4 w-4 mr-3" />
                                        Updates
                                    </Button>
                                </Link>
                            </div>

                            <div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-blue-600 text-blue-400 hover:bg-[#6d28d9] hover:text-white bg-transparent"
                                    asChild
                                >
                                    <Link href="https://cvrecommendation.netlify.app/" onClick={toggleMenu}>
                                        <Film className="h-4 w-4 mr-2" />
                                        Get Recommendations
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}