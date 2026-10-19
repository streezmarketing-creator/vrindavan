import React from 'react';
import { MessageCircle, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';
import { SuncityLogo } from './SuncityLogo';

interface FooterProps {
  onNavigatePage: (page: 'home' | 'thank-you' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1512] text-[#DDD3C7] border-t border-[#2F2620] pt-14 pb-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Platform Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SuncityLogo variant="white" height={42} />
            </div>

            <p className="text-xs sm:text-sm text-[#A89A8B] leading-relaxed max-w-md">
              A curated property discovery and lead enquiry portal dedicated to residential plots, villas, and apartments situated across selected Suncity projects in Vrindavan, Mathura, Uttar Pradesh.
            </p>

            <div className="pt-2 text-xs text-[#C5A880] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Independent property enquiry & discovery platform</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#B8A89A]">
              <li>
                <a
                  href="#top"
                  onClick={() => onNavigatePage('home')}
                  className="hover:text-[#E5C9A6] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() => onNavigatePage('home')}
                  className="hover:text-[#E5C9A6] transition-colors"
                >
                  Explore Projects
                </a>
              </li>
              <li>
                <a
                  href="#property-types"
                  onClick={() => onNavigatePage('home')}
                  className="hover:text-[#E5C9A6] transition-colors"
                >
                  Property Types
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={() => onNavigatePage('home')}
                  className="hover:text-[#E5C9A6] transition-colors"
                >
                  Location & Map
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  onClick={() => onNavigatePage('home')}
                  className="hover:text-[#E5C9A6] transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('privacy')}
                  className="hover:text-[#E5C9A6] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Representative */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Enquiry Representative
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#B8A89A]">
              <p className="text-white font-medium">
                {PRIMARY_CONTACT.name}
              </p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{PRIMARY_CONTACT.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{PRIMARY_CONTACT.displayPhone}</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={PRIMARY_CONTACT.whatsappDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E7E52] hover:bg-[#16603E] text-white text-xs font-semibold rounded-xs transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 8604300712)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Factual Disclaimer Banner (Strict Master Prompt Requirement) */}
        <div className="pt-8 border-t border-[#2F2620]">
          <div className="bg-[#241D19] p-4 sm:p-5 rounded-xs border border-[#3A2F27] text-xs text-[#9E8E80] leading-relaxed">
            <span className="font-semibold text-[#D4C3B2] block mb-1">Disclaimer:</span>
            <p>
              &ldquo;This website provides property information for enquiry purposes. Project details, prices, availability, amenities, approvals, and terms are subject to verification and confirmation with the relevant authorised representative. This website does not guarantee investment returns or property appreciation.&rdquo;
            </p>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7D70]">
          <div>
            &copy; {currentYear} Suncity Projects Vrindavan. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigatePage('privacy')}
              className="hover:text-[#D4C3B2] transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigatePage('home')}
              className="hover:text-[#D4C3B2] transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
