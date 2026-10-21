```tsx
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
  const [currentPage, setCurrentPage] = useState<
    'home' | 'thank-you' | 'privacy'
  >('home');

  const [selectedProject, setSelectedProject] =
    useState<string>('Suncity Anantam');

  const [selectedPropertyType, setSelectedPropertyType] =
    useState<PropertyCategory>('Residential Plots');

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background music: one persistent audio element for the whole app.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;
    audio.preload = 'auto';

    let disposed = false;

    const startMusic = () => {
      if (disposed || !audio.paused) return;

      const playPromise = audio.play();

      if (playPromise) {
        playPromise.catch((error: unknown) => {
          // Playback may be retried after the user's first interaction.
          console.info('Background music playback attempt:', error);
        });
      }
    };

    const retryOnInteraction = () => {
      startMusic();
    };

    const retryWhenVisible = () => {
      if (!document.hidden && audio.paused) {
        startMusic();
      }
    };

    audio.addEventListener('canplay', startMusic);
    audio.addEventListener('loadeddata', startMusic);

    document.addEventListener('pointerdown', retryOnInteraction);
    document.addEventListener('keydown', retryOnInteraction);
    document.addEventListener('touchstart', retryOnInteraction);
    document.addEventListener('visibilitychange', retryWhenVisible);

    // Request playback immediately and when the media becomes ready.
    audio.load();
    startMusic();

    return () => {
      disposed = true;

      audio.removeEventListener('canplay', startMusic);
      audio.removeEventListener('loadeddata', startMusic);

      document.removeEventListener('pointerdown', retryOnInteraction);
      document.removeEventListener('keydown', retryOnInteraction);
      document.removeEventListener('touchstart', retryOnInteraction);
      document.removeEventListener('visibilitychange', retryWhenVisible);
    };
  }, []);

  // Resolve the current page and preserve UTM parameters.
  useEffect(() => {
    getAndPreserveUtmParams();

    const resolvePage = () => {
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');

      if (path.includes('thank-you') || pageParam === 'thank-you') {
        setCurrentPage('thank-you');
      } else if (path.includes('privacy') || pageParam === 'privacy') {
        setCurrentPage('privacy');
      } else {
        setCurrentPage('home');
      }
    };

    resolvePage();
    window.addEventListener('popstate', resolvePage);

    return () => {
      window.removeEventListener('popstate', resolvePage);
    };
  }, []);

  // Show the enquiry popup after 10 seconds on the home page.
  useEffect(() => {
    if (currentPage !== 'home') {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      return;
    }

    const dismissed = sessionStorage.getItem('suncity_popup_dismissed');
    const submitted = sessionStorage.getItem('suncity_lead_submitted');

    if (!dismissed && !submitted) {
      timerRef.current = window.setTimeout(() => {
        setIsPopupOpen(true);
      }, 10000);
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
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

    try {
      const path =
        page === 'home'
          ? '/'
          : page === 'thank-you'
            ? '/thank-you.html'
            : '/privacy-policy.html';

      window.history.pushState({ page }, '', path);
    } catch {
      // Keep the current page if URL navigation is unavailable.
    }
  };

  const handleLeadSuccess = (_lead: EnquiryFormData) => {
    sessionStorage.setItem('suncity_lead_submitted', 'true');
    setIsPopupOpen(false);
    navigateTo('thank-you');
  };

  const scrollToForm = () => {
    const element = document.getElementById('enquire');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsPopupOpen(true);
    }
  };

  const handleEnquireProject = (projectName: string) => {
    setSelectedProject(projectName);
    setIsPopupOpen(true);
  };

  const handleSelectPropertyType = (type: PropertyCategory) => {
    setSelectedPropertyType(type);
    setIsPopupOpen(true);
  };

  return (
    <>
      {/* Persistent background flute music. No visible music button. */}
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        autoPlay
        loop
        preload="auto"
        playsInline
      />

      {currentPage === 'thank-you' ? (
        <ThankYouPage onBackToHome={() => navigateTo('home')} />
      ) : currentPage === 'privacy' ? (
        <PrivacyPolicyPage onBackToHome={() => navigateTo('home')} />
      ) : (
        <div className="min-h-screen bg-[#FAF8F5] text-[#2C241E] flex flex-col justify-between selection:bg-[#E8DFD1]">
          <Header
            onOpenEnquireModal={(project) => {
              if (project) setSelectedProject(project);
              setIsPopupOpen(true);
            }}
            onNavigatePage={navigateTo}
          />

          <main className="flex-1">
            <Hero
              onExploreProjects={() => {
                const element = document.getElementById('projects');

                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onOpenEnquire={scrollToForm}
            />

            <section
              id="enquire"
              className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE0D3]"
            >
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

            <ProjectDiscovery onEnquireProject={handleEnquireProject} />

            <PropertyTypes
              onSelectPropertyType={handleSelectPropertyType}
            />

            <WhyExplore />
            <LocationSection />
            <FaqSection />

            <FinalCta onOpenEnquire={scrollToForm} />
          </main>

          <Footer onNavigatePage={navigateTo} />

          <WhatsAppFloatingButton currentProject={selectedProject} />

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
      )}
    </>
  );
};

export default App;
