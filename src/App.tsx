import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectDiscovery } from './components/ProjectDiscovery';
import { PropertyTypes } from './components/PropertyTypes';
import { WhyExplore } from './components/WhyExplore';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { LeadForm } from './components/LeadForm';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PopupModal } from './components/PopupModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ThankYouPage } from './pages/ThankYouPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { EnquiryFormData, PropertyCategory } from './types';
import { getAndPreserveUtmParams } from './utils/utm';

export const App: React.FC = () => {
  // Navigation state: 'home' | 'thank-you' | 'privacy'
  const [currentPage, setCurrentPage] = useState<'home' | 'thank-you' | 'privacy'>('home');

  // Lead Form & Preselection state
  const [selectedProject, setSelectedProject] = useState<string>('Suncity Anantam');
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyCategory>('Residential Plots');

  // Popup Modal state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;

    audio.play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  }, []);

  // Initialize and handle URL routing & UTM tracking
  useEffect(() => {
    // 1. Capture and preserve UTM parameters from landing query
    getAndPreserveUtmParams();

    // 2. Initial route resolution based on path or query param
    const path = window.location.pathname.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get('page');

    if (path.includes('thank-you') || pageParam === 'thank-you') {
      setCurrentPage('thank-you');
    } else if (path.includes('privacy') || pageParam === 'privacy') {
      setCurrentPage('privacy');
    } else {
      setCurrentPage('home');
    }

    // 3. Handle browser back / forward buttons
    const handlePopState = () => {
      const currentPath = window.location.pathname.toLowerCase();
      const currentSearch = new URLSearchParams(window.location.search);
      const curPageParam = currentSearch.get('page');

      if (currentPath.includes('thank-you') || curPageParam === 'thank-you') {
        setCurrentPage('thank-you');
      } else if (currentPath.includes('privacy') || curPageParam === 'privacy') {
        setCurrentPage('privacy');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 10-Second Automatic Popup logic
  // Prompt requirement: "Appear after 10 seconds. Display only once per browser session. Do not appear on thank-you page or after submission."
  useEffect(() => {
    if (currentPage !== 'home') {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }

    const alreadyDismissed = sessionStorage.getItem('suncity_popup_dismissed');
    const alreadySubmitted = sessionStorage.getItem('suncity_lead_submitted');

    if (!alreadyDismissed && !alreadySubmitted) {
      timerRef.current = window.setTimeout(() => {
        setIsPopupOpen(true);
      }, 10000); // 10,000 ms = 10 seconds
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [currentPage]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    sessionStorage.setItem('suncity_popup_dismissed', 'true');
  };

  const navigateTo = (page: 'home' | 'thank-you' | 'privacy') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL cleanly
    try {
      const newPath = page === 'home' ? '/' : page === 'thank-you' ? '/thank-you.html' : '/privacy-policy.html';
      window.history.pushState({ page }, '', newPath);
    } catch {
      // Fallback
    }
  };

  // Called when enquiry form is successfully validated and submitted
  const handleLeadSuccess = (lead: EnquiryFormData) => {
    // Record submission flag to prevent any further popup in this session
    sessionStorage.setItem('suncity_lead_submitted', 'true');
    setIsPopupOpen(false);
    navigateTo('thank-you');
  };

  // Scroll to main lead form smoothly
  const scrollToForm = () => {
    const el = document.getElementById('enquire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsPopupOpen(true);
    }
  };

  // Handle project specific enquiry triggers
  const handleEnquireProject = (projectName: string) => {
    setSelectedProject(projectName);
    setIsPopupOpen(true);
  };

  // Handle property type preselection
  const handleSelectPropertyType = (type: PropertyCategory) => {
    setSelectedPropertyType(type);
    setIsPopupOpen(true);
  };

  // Render Thank You View
  if (currentPage === 'thank-you') {
    return <ThankYouPage onBackToHome={() => navigateTo('home')} />;
  }

  // Render Privacy Policy View
  if (currentPage === 'privacy') {
    return <PrivacyPolicyPage onBackToHome={() => navigateTo('home')} />;
  }

  // Render Main Home Discovery View
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241E] flex flex-col justify-between selection:bg-[#E8DFD1]">
      {/* Premium Header */}
      <Header
        onOpenEnquireModal={(project) => {
          if (project) setSelectedProject(project);
          setIsPopupOpen(true);
        }}
        onNavigatePage={navigateTo}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenEnquire={scrollToForm}
        />
 {/* Main Lead Capture Form Section */}
        <section id="enquire" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE0D3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadForm
              initialProject={selectedProject}
              initialPropertyType={selectedPropertyType}
              onSuccessfulSubmission={handleLeadSuccess}
              formId="main-enquiry-form"
              onNavigatePrivacy={() => navigateTo('privacy')}
            />
          </div>
        </section>
        {/* Multi-Project Discovery Section */}
        <ProjectDiscovery onEnquireProject={handleEnquireProject} />

        {/* Property Type Preferences Section */}
        <PropertyTypes onSelectPropertyType={handleSelectPropertyType} />

        {/* Why Explore Section */}
        <WhyExplore />

        {/* Location & Connectivity Section */}
        <LocationSection />

    

        {/* FAQ Accordion Section */}
        <FaqSection />

        {/* Final Call to Action Section */}
        <FinalCta onOpenEnquire={scrollToForm} />
      </main>

      {/* Global Footer */}
      <Footer onNavigatePage={navigateTo} />

      {/* Persistent Floating WhatsApp Button */}
      <WhatsAppFloatingButton currentProject={selectedProject} />

      {/* 10-Second Automatic / Interactive Lead Popup Modal */}
      <PopupModal
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        preselectedProject={selectedProject}
        preselectedPropertyType={selectedPropertyType}
        onSuccessfulSubmission={handleLeadSuccess}
        onNavigatePrivacy={() => {
          handleClosePopup();
          navigateTo('privacy');
        }}
      />
    </div>
  );
};

export default App;
