"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowLeft, Shield, Mail, Globe, ChevronRight, Eye, Lock, Users, FileText, Clock, ArrowUp } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
      setShowBackToTop(window.scrollY > 300)

      // Update active section
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = useMemo(() => [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'definitions', title: 'Definitions', icon: Users },
    { id: 'data-collection', title: 'Data Collection', icon: Eye },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Lock },
    { id: 'data-use', title: 'Data Usage', icon: Shield },
    { id: 'security', title: 'Security', icon: Lock },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ], [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/80 border-b border-gray-800/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[#6324C3]/20 border border-gray-800 hover:border-[#7B4CD6]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
              aria-label="Return to homepage"
            >
              <a href="/"><ArrowLeft className="h-5 w-5 group-hover:text-[#A68BF4] transition-colors" /></a>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </div>
          </div>

          <nav className="hidden sm:flex gap-4 sm:gap-6" aria-label="Main navigation">
            <a
              href="/"
              className="text-sm font-medium text-gray-300 hover:text-[#A68BF4] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
            >
              Home
            </a>
            <a
              href="/privacyterms/terms"
              className="text-sm font-medium text-gray-300 hover:text-[#A68BF4] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6324C3]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,36,195,0.15),transparent_70%)]" />
        
        <div className="container mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6 relative">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-xl flex items-center justify-center shadow-xl shadow-[#6324C3]/20">
              <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white to-[#A68BF4] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            At <span className="text-[#A68BF4] font-semibold">CineVerse Hub</span>, your privacy is our priority. This policy outlines how we collect, use, and safeguard your information.
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#4B1A92]/20 to-[#3A136E]/20 border border-[#6324C3]/50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm inline-flex">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#A68BF4]" />
            <span className="text-gray-200 text-sm sm:text-base font-medium">Last updated: July 26, 2025</span>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b border-gray-800/50" aria-labelledby="toc-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 id="toc-heading" className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-white">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-gray-800/20 hover:bg-[#6324C3]/10 border ${activeSection === section.id ? 'border-[#6324C3]/50' : 'border-gray-800/50'} hover:border-[#7B4CD6]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]`}
                  aria-current={activeSection === section.id ? 'true' : 'false'}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-300 group-hover:text-[#A68BF4] transition-colors" />
                  <span className="text-xs sm:text-sm text-gray-200 group-hover:text-white text-center transition-colors">
                    {section.title}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <main className="py-12 sm:py-16" aria-label="Privacy policy content">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-8 sm:space-y-12">
            
            {/* Introduction */}
            <section id="introduction" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Privacy Policy for CineVerse Hub</h2>
                </div>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    This Privacy Policy outlines our policies and procedures regarding the collection, use, and disclosure of your information when you use our Service, as well as your privacy rights and legal protections.
                  </p>
                  <p>
                    By using our Service, you consent to the collection and use of information in accordance with this Privacy Policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Interpretation and Definitions */}
            <section id="definitions" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Interpretation and Definitions</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#A68BF4]">Interpretation</h3>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                      Terms with initial capitalization have specific meanings as defined below, applicable in both singular and plural forms.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#A68BF4]">Definitions</h3>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">For the purposes of this Privacy Policy:</p>
                    <div className="grid gap-3 sm:gap-4">
                      {[
                        { term: "Account", definition: "A unique account created for you to access our Service or parts of our Service." },
                        { term: "Company", definition: "(referred to as 'the Company', 'We', 'Us', or 'Our' in this Agreement) refers to CineVerse Hub." },
                        { term: "Cookies", definition: "Small files placed on your device by a website, containing details of your browsing history, among other uses." },
                        { term: "Personal Data", definition: "Any information relating to an identified or identifiable individual." },
                        { term: "Service", definition: "Refers to the Website." },
                        { term: "Website", definition: "Refers to CineVerse Hub, accessible from https://cineverse-p.netlify.app/" }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-900/20 p-3 sm:p-4 rounded-lg border border-gray-800/30 hover:border-[#6324C3]/30 transition-colors">
                          <span className="font-semibold text-[#A68BF4]">{item.term}:</span>
                          <span className="text-gray-200 text-sm sm:text-base ml-2">{item.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section id="data-collection" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Collecting and Using Your Personal Data</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#A68BF4]">Types of Data Collected</h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-gradient-to-r from-[#4B1A92]/20 to-[#3A136E]/20 p-4 sm:p-6 rounded-xl border border-[#6324C3]/30">
                        <h4 className="font-semibold mb-2 sm:mb-3 text-[#A68BF4] flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#A68BF4] rounded-full" />
                          Personal Data
                        </h4>
                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                          We may collect personally identifiable information to contact or identify you, including but not limited to:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {["Email address", "First name and last name", "Usage Data"].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900/20 p-2 sm:p-3 rounded-lg">
                              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#A68BF4]" />
                              <span className="text-gray-200 text-sm sm:text-base">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#4B1A92]/20 to-[#3A136E]/20 p-4 sm:p-6 rounded-xl border border-[#6324C3]/30">
                        <h4 className="font-semibold mb-2 sm:mb-3 text-[#A68BF4] flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#A68BF4] rounded-full" />
                          Usage Data
                        </h4>
                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                          Usage Data is collected automatically and may include your device's IP address, browser type, browser version, pages visited, visit time and date, time spent on pages, and other diagnostic data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section id="cookies" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Tracking Technologies and Cookies</h2>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    We use cookies and similar tracking technologies to monitor activity and store information. These technologies include:
                  </p>
                  
                  <div className="grid gap-3 sm:gap-4">
                    <div className="bg-gray-900/20 p-3 sm:p-5 rounded-xl border border-gray-800/30 hover:border-[#6324C3]/30 transition-colors">
                      <h4 className="font-semibold text-[#A68BF4] mb-2">Cookies or Browser Cookies</h4>
                      <p className="text-gray-200 text-sm">Small files placed on your device. You can configure your browser to refuse cookies or notify you when they are set.</p>
                    </div>
                    <div className="bg-gray-900/20 p-3 sm:p-5 rounded-xl border border-gray-800/30 hover:border-[#6324C3]/30 transition-colors">
                      <h4 className="font-semibold text-[#A68BF4] mb-2">Web Beacons</h4>
                      <p className="text-gray-200 text-sm">Small electronic files in our Service and emails that allow us to count users who have visited specific pages.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 sm:mb-4 text-[#A68BF4]">Cookie Types We Use:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-[#4B1A92]/20 to-[#3A136E]/20 p-3 sm:p-5 rounded-xl border border-[#6324C3]/30">
                        <h5 className="font-semibold text-[#A68BF4] mb-2">Necessary / Essential Cookies</h5>
                        <p className="text-gray-200 text-sm">Essential for providing services and enabling features on our Website.</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#4B1A92]/20 to-[#3A136E]/20 p-3 sm:p-5 rounded-xl border border-[#6324C3]/30">
                        <h5 className="font-semibold text-[#A68BF4] mb-2">Functionality Cookies</h5>
                        <p className="text-gray-200 text-sm">Allow us to remember your choices, such as login details or language preferences.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section id="data-use" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Use of Your Personal Data</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">We may use Personal Data for the following purposes:</p>
                  <div className="grid gap-3">
                    {[
                      "To provide and maintain our Service, including monitoring usage.",
                      "To manage your Account and registration as a user.",
                      "To fulfill contracts for products, items, or services you have purchased.",
                      "To contact you via email, phone, SMS, or other electronic communication.",
                      "To provide news, special offers, and information about our goods, services, and events.",
                      "To manage and respond to your requests."
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3 bg-gray-900/20 p-3 sm:p-4 rounded-lg border border-gray-800/30 hover:border-[#6324C3]/30 transition-colors">
                        <div className="w-2 h-2 bg-[#A68BF4] rounded-full mt-1 sm:mt-2 flex-shrink-0" />
                        <span className="text-gray-200 text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Security of Your Personal Data</h2>
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  We prioritize the security of your Personal Data but note that no internet transmission or electronic storage method is completely secure. We use commercially acceptable measures to protect your data, though absolute security cannot be guaranteed.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section id="childrens-privacy" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  Children's Privacy
                </h2>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  Our Service is not intended for individuals under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with Personal Data, please contact us.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section id="changes" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  Changes to this Privacy Policy
                </h2>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  We may update this Privacy Policy periodically. Changes will be posted on this page, and we will notify you via email or a prominent notice on our Service. The "Last updated" date will be updated accordingly.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-[#4B1A92]/20 to-[#3A136E]/20 border border-[#6324C3]/30 rounded-2xl p-6 sm:p-8 hover:border-[#7B4CD6]/50 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6324C3] to-[#3A136E] rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Contact Us</h2>
                </div>
                
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  For questions about this Privacy Policy, please reach out to us:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <a
                    href="mailto:patelpriyank2526@gmail.com"
                    className="group flex items-center gap-3 bg-gray-900/20 p-3 sm:p-4 rounded-xl border border-gray-800/50 hover:border-[#6324C3]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6324C3]/20 rounded-lg flex items-center justify-center group-hover:bg-[#7B4CD6]/30 transition-colors">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#A68BF4]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Email us at</p>
                      <p className="text-[#A68BF4] text-sm sm:text-base font-medium">patelpriyank2526@gmail.com</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://patel-priyank-1602.github.io/contactcvr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-gray-900/20 p-3 sm:p-4 rounded-xl border border-gray-800/50 hover:border-[#6324C3]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6324C3]/20 rounded-lg flex items-center justify-center group-hover:bg-[#7B4CD6]/30 transition-colors">
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-[#A68BF4]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Visit our</p>
                      <p className="text-[#A68BF4] text-sm sm:text-base font-medium">Contact Page</p>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#6324C3]/80 hover:bg-[#7B4CD6] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A68BF4]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-6 sm:py-8 bg-black/80" aria-label="Footer">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-300 text-xs sm:text-sm">
            © 2025 CineVerse Hub. All rights reserved. Last updated: July 26, 2025.
          </p>
        </div>
      </footer>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}