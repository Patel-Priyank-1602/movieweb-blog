"use client"

import { ArrowLeft, FileText, Mail, Globe, ChevronRight, Scale, Shield, Users, AlertTriangle, Clock, Gavel } from 'lucide-react'

export default function TermsOfServicePage() {
  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'definitions', title: 'Definitions', icon: Users },
    { id: 'acknowledgment', title: 'Acknowledgment', icon: Shield },
    { id: 'links', title: 'External Links', icon: Globe },
    { id: 'termination', title: 'Termination', icon: AlertTriangle },
    { id: 'liability', title: 'Liability', icon: Scale },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/80 border-b border-gray-800/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <a href="/"><ArrowLeft className="h-5 w-5 group-hover:text-blue-400 transition-colors" /></a>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </div>
          </div>

          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Home
            </a>
            <a href="/privacyterms/privacy" className="text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="container mx-auto text-center space-y-8 px-4 relative">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 animate-pulse">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>

          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using 
            <span className="text-blue-400 font-semibold"> CineVerse Hub</span>. These terms govern your use of our service.
          </p>

          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-900/30 to-indigo-800/30 border border-blue-700/50 rounded-xl px-6 py-3 backdrop-blur-sm inline-flex">
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
                  className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-800/30 hover:bg-blue-900/20 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <Icon className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm text-gray-300 group-hover:text-white text-center transition-colors">
                    {section.title}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <main className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="space-y-12">
            
            {/* Introduction */}
            <section id="introduction" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Terms and Conditions for CineVerse Hub</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Please read these terms and conditions carefully before using Our Service.
                </p>
              </div>
            </section>

            {/* Interpretation and Definitions */}
            <section id="definitions" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Interpretation and Definitions</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Interpretation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Definitions</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">For the purposes of these Terms and Conditions:</p>
                    <div className="grid gap-4">
                      {[
                        { term: "Affiliate", definition: "means an entity that controls, is controlled by or is under common control with a party, where \"control\" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority." },
                        { term: "Country", definition: "refers to: Gujarat, India" },
                        { term: "Company", definition: "(referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to CineVerse Hub." },
                        { term: "Device", definition: "means any device that can access the Service such as a computer, a cellphone or a digital tablet." },
                        { term: "Service", definition: "refers to the Website." },
                        { term: "Website", definition: "refers to CineVerse Hub, accessible from https://cineverse-p.netlify.app/" }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-colors">
                          <span className="font-semibold text-purple-300">{item.term}:</span>
                          <span className="text-gray-300 ml-2">{item.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section id="acknowledgment" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Acknowledgment</h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                  </p>
                  <p>
                    Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                  </p>
                  <p>
                    By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                  </p>
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mt-6">
                    <p className="text-amber-200 font-medium">
                      <strong>Age Requirement:</strong> You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Links to Other Websites */}
            <section id="links" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Links to Other Websites</h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
                  </p>
                  <p>
                    The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
                  </p>
                  <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
                    <p className="text-orange-200 font-medium">
                      <strong>Recommendation:</strong> We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section id="termination" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Termination</h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                  </p>
                  <p>
                    Upon termination, Your right to use the Service will cease immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="liability" className="group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Limitation of Liability</h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                  </p>
                </div>
              </div>
            </section>

            {/* "AS IS" and "AS AVAILABLE" Disclaimer */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                "AS IS" and "AS AVAILABLE" Disclaimer
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.
                </p>
                <p>
                  Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-teal-500/30 transition-all duration-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Gavel className="h-5 w-5 text-white" />
                </div>
                Governing Law
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
              </p>
            </div>

            {/* Disputes Resolution */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                Disputes Resolution
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-pink-500/30 transition-all duration-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                Changes to These Terms and Conditions
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                </p>
                <p>
                  By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <section id="contact" className="group">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  If you have any questions about these Terms and Conditions, You can contact us:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <a href="mailto:patelpriyank2526@gmail.com" className="group flex items-center gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email us at</p>
                      <p className="text-blue-400 font-medium">patelpriyank2526@gmail.com</p>
                    </div>
                  </a>
                  
                  <a href="https://patel-priyank-1602.github.io/contactcvr/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                      <Globe className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Visit our</p>
                      <p className="text-indigo-400 font-medium">Contact Page</p>
                    </div>
                  </a>
                </div>

                <p className="text-gray-400 text-sm">
                  Generated using Privacy Policies Generator
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 bg-black/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CineVerse Hub. All rights reserved. These Terms were last updated on July 26, 2025.
          </p>
        </div>
      </footer>
    </div>
  )
}