"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, FileText, Mail, Globe, ChevronRight, Scale, Shield, Users, AlertTriangle, Clock, Gavel, ArrowUp } from 'lucide-react';
import type { FC } from 'react';

const TermsOfServicePage: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 300);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = useMemo(() => [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'definitions', title: 'Definitions', icon: Users },
    { id: 'acknowledgment', title: 'Acknowledgment', icon: Shield },
    { id: 'links', title: 'External Links', icon: Globe },
    { id: 'termination', title: 'Termination', icon: AlertTriangle },
    { id: 'liability', title: 'Liability', icon: Scale },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ], []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/80 border-b border-gray-800/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[#6324C3]/20 border border-gray-800 hover:border-[#8B5CF6]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
              aria-label="Return to homepage"
            >
              <a href="/"><ArrowLeft className="h-5 w-5 group-hover:text-[#A78BFA] transition-colors" /></a>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center shadow-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </div>
          </div>

          <nav className="hidden sm:flex gap-4 sm:gap-6" aria-label="Main navigation">
            <a
              href="/"
              className="text-sm font-medium text-gray-300 hover:text-[#A78BFA] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
            >
              Home
            </a>
            <a
              href="/privacyterms/privacy"
              className="text-sm font-medium text-gray-300 hover:text-[#A78BFA] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
            >
              Privacy Policy
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
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-xl flex items-center justify-center shadow-xl shadow-[#6324C3]/20">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Please read these terms carefully before using <span className="text-[#A78BFA] font-semibold">CineVerse Hub</span>. These terms govern your use of our service.
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#4C1D95]/20 to-[#2E1065]/20 border border-[#6324C3]/50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm inline-flex">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#A78BFA]" />
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
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-gray-800/20 hover:bg-[#6324C3]/10 border ${activeSection === section.id ? 'border-[#6324C3]/50' : 'border-gray-800/50'} hover:border-[#8B5CF6]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]`}
                  aria-current={activeSection === section.id ? 'true' : 'false'}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-300 group-hover:text-[#A78BFA] transition-colors" />
                  <span className="text-xs sm:text-sm text-gray-200 group-hover:text-white text-center transition-colors">
                    {section.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <main className="py-12 sm:py-16" aria-label="Terms of service content">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-8 sm:space-y-12">
            {/* Introduction */}
            <section id="introduction" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Terms and Conditions for CineVerse Hub</h2>
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  Please read these terms and conditions carefully before using our Service.
                </p>
              </div>
            </section>

            {/* Interpretation and Definitions */}
            <section id="definitions" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Interpretation and Definitions</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#A78BFA]">Interpretation</h3>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                      Terms with initial capitalization have specific meanings as defined below, applicable in both singular and plural forms.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#A78BFA]">Definitions</h4>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">For the purposes of these Terms and Conditions:</p>
                    <div className="grid gap-3 sm:gap-4">
                      {[
                        { term: "Affiliate", definition: "An entity that controls, is controlled by, or is under common control with a party, where 'control' means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority." },
                        { term: "Country", definition: "Refers to: Gujarat, India" },
                        { term: "Company", definition: "(referred to as 'the Company', 'We', 'Us', or 'Our' in this Agreement) refers to CineVerse Hub." },
                        { term: "Device", definition: "Any device that can access the Service such as a computer, a cellphone, or a digital tablet." },
                        { term: "Service", definition: "Refers to the Website." },
                        { term: "Website", definition: "Refers to CineVerse Hub, accessible from https://cineverse-p.netlify.app/" }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-900/20 p-3 sm:p-4 rounded-lg border border-gray-800/30 hover:border-[#6324C3]/30 transition-colors">
                          <span className="font-semibold text-[#A78BFA]">{item.term}:</span>
                          <span className="text-gray-200 text-sm sm:text-base ml-2">{item.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section id="acknowledgment" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Acknowledgment</h2>
                </div>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    These Terms and Conditions govern your use of this Service and the agreement between you and the Company, outlining the rights and obligations of all users.
                  </p>
                  <p>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and Conditions, applicable to all visitors, users, and others.
                  </p>
                  <p>
                    By accessing or using the Service, you agree to be bound by these Terms and Conditions. If you disagree with any part, you may not access the Service.
                  </p>
                  <div className="bg-[#4C1D95]/20 border border-[#6324C3]/50 rounded-lg p-4 mt-6">
                    <p className="text-[#A78BFA] font-medium">
                      <strong>Age Requirement:</strong> You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Links to Other Websites */}
            <section id="links" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Links to Other Websites</h2>
                </div>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    Our Service may contain links to third-party websites or services not owned or controlled by the Company.
                  </p>
                  <p>
                    The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of third-party websites or services. You acknowledge and agree that the Company is not liable for any damage or loss caused by your use of or reliance on such content, goods, or services.
                  </p>
                  <div className="bg-[#4C1D95]/20 border border-[#6324C3]/50 rounded-lg p-4">
                    <p className="text-[#A78BFA] font-medium">
                      <strong>Recommendation:</strong> We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services you visit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section id="termination" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Termination</h2>
                </div>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason, including if you breach these Terms and Conditions.
                  </p>
                  <p>
                    Upon termination, your right to use the Service will cease immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="liability" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Limitation of Liability</h2>
                </div>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    The entire liability of the Company and its suppliers under these Terms is limited to the amount you paid through the Service or 100 USD if you haven't purchased anything.
                  </p>
                  <p>
                    To the maximum extent permitted by law, the Company and its suppliers shall not be liable for any special, incidental, indirect, or consequential damages (including loss of profits, data, or privacy) arising from the use or inability to use the Service, even if advised of such possibilities.
                  </p>
                </div>
              </div>
            </section>

            {/* "AS IS" and "AS AVAILABLE" Disclaimer */}
            <section id="disclaimer" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  "AS IS" and "AS AVAILABLE" Disclaimer
                </h2>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. The Company and its affiliates disclaim all warranties, express or implied, regarding the Service.
                  </p>
                  <p>
                    Neither the Company nor its providers guarantee the Service's operation, availability, accuracy, or freedom from viruses or harmful components.
                  </p>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section id="governing-law" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Gavel className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  Governing Law
                </h2>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  The laws of Gujarat, India, excluding its conflicts of law rules, govern these Terms and your use of the Service. Your use may also be subject to other local, state, national, or international laws.
                </p>
              </div>
            </section>

            {/* Disputes Resolution */}
            <section id="disputes" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  Disputes Resolution
                </h2>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  If you have any concerns or disputes about the Service, you agree to first attempt to resolve them informally by contacting the Company.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-gray-800/20 to-black/80 border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-[#6324C3]/30 transition-all duration-500">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  Changes to These Terms and Conditions
                </h2>
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    We reserve the right to modify or replace these Terms at our discretion. For material changes, we will provide at least 30 days' notice. Material changes are determined at our discretion.
                  </p>
                  <p>
                    By continuing to use our Service after revisions take effect, you agree to the revised terms. If you disagree, please stop using the website and Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="group animate-fade-in">
              <div className="bg-gradient-to-br from-[#4C1D95]/20 to-[#2E1065]/20 border border-[#6324C3]/30 rounded-2xl p-6 sm:p-8 hover:border-[#8B5CF6]/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6324C3] to-[#2E1065] rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">Contact Us</h2>
                </div>
                
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  For questions about these Terms and Conditions, please reach out to us:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <a
                    href="mailto:patelpriyank2526@gmail.com"
                    className="group flex items-center gap-3 bg-gray-900/20 p-3 sm:p-4 rounded-xl border border-gray-800/50 hover:border-[#6324C3]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6324C3]/20 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/30 transition-colors">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Email us at</p>
                      <p className="text-[#A78BFA] text-sm sm:text-base font-medium">patelpriyank2526@gmail.com</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://patel-priyank-1602.github.io/contactcvr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-gray-900/20 p-3 sm:p-4 rounded-xl border border-gray-800/50 hover:border-[#6324C3]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6324C3]"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6324C3]/20 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/30 transition-colors">
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-300">Visit our</p>
                      <p className="text-[#A78BFA] text-sm sm:text-base font-medium">Contact Page</p>
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
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#6324C3]/80 hover:bg-[#8B5CF6] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
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

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0;
            transform: translateY(10px);
          }
          to { opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TermsOfServicePage;
