import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ArrowRight } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';
import { SuncityLogo } from './SuncityLogo';

interface HeaderProps {
  onOpenEnquireModal: (projectName?: string) => void;
  onNavigatePage?: (page: 'home' | 'thank-you' | 'privacy') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquireModal, onNavigatePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Explore Projects', href: '#projects' },
    { label: 'Property Types', href: '#property-types' },
    { label: 'Why Vrindavan', href: '#why-explore' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#enquire' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigatePage) {
      onNavigatePage('home');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/98 backdrop-blur-md shadow-xs border-b border-[#EAE0D3]'
          : 'bg-[#FAF8F5] border-b border-[#F0EAE1]'
      }`}
    >
      {/* Top Notification / Trust Bar with subtle spiritual peacock green accent */}
      <div className="bg-[#2C241E] text-[#EDE4D8] px-4 py-1.5 text-xs text-center font-normal tracking-wide flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#18534F] inline-block" />
          <span>Vrindavan Property Discovery &amp; Enquiry Assistance</span>
        </span>
        <span className="hidden sm:inline opacity-30">|</span>
        <a
          href={PRIMARY_CONTACT.whatsappDirectUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E5C9A6] hover:underline flex items-center gap-1 font-medium"
        >
          <span>WhatsApp Enquiries: {PRIMARY_CONTACT.displayPhone}</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Attached Brand Logo */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="flex items-center gap-3 py-1 group"
            aria-label="Suncity Projects - Home"
          >
            <SuncityLogo height={42} className="transition-transform group-hover:scale-101" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A3B32]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#18534F] transition-colors py-2 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#18534F] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick WhatsApp Connect */}
            <a
              id="header-whatsapp-button"
              href={PRIMARY_CONTACT.whatsappDirectUrl('Hi Shiva, I am exploring Suncity Projects in Vrindavan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold text-[#12382F] bg-[#E8F2EE] border border-[#BBD7CB] hover:bg-[#D9EBE3] transition-colors"
              aria-label="Direct WhatsApp Enquiry"
            >
              <MessageCircle className="w-4 h-4 text-[#18534F]" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Enquire Now CTA */}
            <button
              id="header-enquire-button"
              onClick={() => onOpenEnquireModal()}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xs text-xs font-semibold tracking-wide uppercase bg-[#2C241E] text-[#FAF8F5] hover:bg-[#18534F] transition-all shadow-xs"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={PRIMARY_CONTACT.whatsappDirectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#18534F] bg-[#E8F2EE] border border-[#BBD7CB] rounded-xs"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#2C241E] hover:text-[#18534F] focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#EAE0D3] bg-[#FAF8F5] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-[#2C241E] py-2 border-b border-[#F0EAE1]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquireModal();
                }}
                className="w-full py-3 bg-[#2C241E] text-[#FAF8F5] text-sm font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={PRIMARY_CONTACT.whatsappDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#E8F2EE] text-[#12382F] border border-[#BBD7CB] text-sm font-medium rounded-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#18534F]" />
                <span>Chat on WhatsApp (+91 8604300712)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
