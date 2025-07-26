"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Shield, Mail, Globe, ChevronRight, Eye, Lock, Users, FileText, Clock } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'definitions', title: 'Definitions', icon: Users },
    { id: 'data-collection', title: 'Data Collection', icon: Eye },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Lock },
    { id: 'data-use', title: 'Data Usage', icon: Shield },
    { id: 'security', title: 'Security', icon: Lock },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-1 z-40 w-full backdrop-blur-xl bg-black/80 border-b border-gray-800/50 mt-1">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-emerald-600/20 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
              <a href="/"><ArrowLeft className="h-5 w-5 group-hover:text-emerald-400 transition-colors" /></a>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </div>
          </div>

          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors duration-300">
              Home
            </a>
            <a href="/privacyterms/terms" className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors duration-300">
              Terms of Service
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        
        <div className="container mx-auto text-center space-y-8 px-4 relative">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-pulse">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>

          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Your privacy is our top priority. This comprehensive policy explains how we collect, use, and protect your information when you use 
            <span className="text-emerald-400 font-semibold"> CineVerse Hub</span>.
          </p>

          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-xl px-6 py-3 backdrop-blur-sm inline-flex">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-blue-200 font-medium">Last updated: July 26, 2025</span>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b border-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-800/30 hover:bg-emerald-900/20 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <Icon className="h-6 w-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm text-gray-300 group-hover:text-white text-center transition-colors">
                    {section.title}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <main className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="space-y-12">
            
            {/* Introduction */}
            <section id="introduction" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Privacy Policy for CineVerse Hub</h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                  </p>
                  <p>
                    We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Interpretation and Definitions */}
            <section id="definitions" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Interpretation and Definitions</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Interpretation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Definitions</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">For the purposes of this Privacy Policy:</p>
                    <div className="grid gap-4">
                      {[
                        { term: "Account", definition: "means a unique account created for You to access our Service or parts of our Service." },
                        { term: "Company", definition: "(referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to CineVerse Hub." },
                        { term: "Cookies", definition: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses." },
                        { term: "Personal Data", definition: "is any information that relates to an identified or identifiable individual." },
                        { term: "Service", definition: "refers to the Website." },
                        { term: "Website", definition: "refers to CineVerse Hub, accessible from https://cineverse-p.netlify.app/" }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                          <span className="font-semibold text-blue-300">{item.term}:</span>
                          <span className="text-gray-300 ml-2">{item.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section id="data-collection" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Collecting and Using Your Personal Data</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Types of Data Collected</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 p-6 rounded-xl border border-purple-700/30">
                        <h4 className="font-semibold mb-3 text-purple-300 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          Personal Data
                        </h4>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {["Email address", "First name and last name", "Usage Data"].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900/50 p-3 rounded-lg">
                              <ChevronRight className="h-4 w-4 text-purple-400" />
                              <span className="text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-700/30">
                        <h4 className="font-semibold mb-3 text-blue-300 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          Usage Data
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section id="cookies" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Tracking Technologies and Cookies</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. The technologies We use may include:
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700/30 hover:border-orange-500/30 transition-colors">
                      <h4 className="font-semibold text-orange-300 mb-2">Cookies or Browser Cookies</h4>
                      <p className="text-gray-300 text-sm">A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent.</p>
                    </div>
                    <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700/30 hover:border-orange-500/30 transition-colors">
                      <h4 className="font-semibold text-orange-300 mb-2">Web Beacons</h4>
                      <p className="text-gray-300 text-sm">Certain sections of our Service and our emails may contain small electronic files known as web beacons that permit the Company to count users who have visited those pages.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-orange-400">Cookie Types We Use:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 p-5 rounded-xl border border-green-700/30">
                        <h5 className="font-semibold text-green-400 mb-2">Necessary / Essential Cookies</h5>
                        <p className="text-gray-300 text-sm">These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features.</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-5 rounded-xl border border-blue-700/30">
                        <h5 className="font-semibold text-blue-400 mb-2">Functionality Cookies</h5>
                        <p className="text-gray-300 text-sm">These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section id="data-use" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Use of Your Personal Data</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">The Company may use Personal Data for the following purposes:</p>
                  <div className="grid gap-3">
                    {[
                      "To provide and maintain our Service: including to monitor the usage of our Service.",
                      "To manage Your Account: to manage Your registration as a user of the Service.",
                      "For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased.",
                      "To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.",
                      "To provide You with news: special offers and general information about other goods, services and events which we offer.",
                      "To manage Your requests: To attend and manage Your requests to Us."
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-900/30 p-4 rounded-lg border border-gray-700/30 hover:border-emerald-500/30 transition-colors">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Security of Your Personal Data</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Children's Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                Changes to this Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
              </p>
            </div>

            {/* Contact Information */}
            <section id="contact" className="group">
              <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy, You can contact us:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="mailto:patelpriyank2526@gmail.com" className="group flex items-center gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
                      <Mail className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email us at</p>
                      <p className="text-emerald-400 font-medium">patelpriyank2526@gmail.com</p>
                    </div>
                  </a>
                  
                  <a href="https://patel-priyank-1602.github.io/contactcvr/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                      <Globe className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Visit our</p>
                      <p className="text-blue-400 font-medium">Contact Page</p>
                    </div>
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 bg-black/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CineVerse Hub. All rights reserved. This Privacy Policy was last updated on July 26, 2025.
          </p>
        </div>
      </footer>
    </div>
  )
}