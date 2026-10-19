import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';
import { PeacockMotif } from './PeacockMotif';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenEnquire: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenEnquire }) => {
  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#FDFBF7] via-[#F7F2E9] to-[#FAF8F5]">
      {/* Subtle sacred Vrindavan background textures & geometric aura */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#18534F]/15 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-[#C5A880]/20 blur-3xl" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#E2D6C5]/60" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-[#E2D6C5]/60" />
      </div>
<div className="absolute top-24 right-2 sm:right-8 opacity-30 pointer-events-none z-0" aria-hidden="true">
  <svg viewBox="0 0 100 160" className="w-28 h-44 sm:w-36 sm:h-56 drop-shadow-sm" fill="none">
    <path d="M50 155 C45 110 10 80 22 42 C30 15 65 5 78 30 C95 60 65 95 50 155Z" fill="#18534F"/>
    <ellipse cx="53" cy="43" rx="17" ry="25" fill="#C5A880"/>
    <ellipse cx="53" cy="43" rx="11" ry="18" fill="#18534F"/>
    <ellipse cx="53" cy="43" rx="5" ry="10" fill="#2D7D78"/>
  </svg>
</div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Subtle spiritual Peacock Motif & Location Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white/80 backdrop-blur-xs border border-[#E5DACD] rounded-xs shadow-2xs">
              <PeacockMotif size={20} className="shrink-0" />
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#766144]">
                <span>Holy Vrindavan</span>
                <span aria-hidden="true" className="text-[#18534F]">·</span>
                <span>Mathura Corridor</span>
                <span aria-hidden="true" className="text-[#C5A880]">·</span>
                <span className="text-[#18534F]">NH-2 Expressway</span>
              </div>
            </div>

            {/* Main Headline strictly matching master prompt */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1A17] leading-[1.12]">
              Find Your Place in the Land of <span className="italic font-normal text-[#18534F]">Krishna</span>
            </h1>

            {/* Master Prompt Supporting Text */}
            <p className="text-base sm:text-lg text-[#524439] leading-relaxed max-w-2xl font-normal">
              Discover thoughtfully selected plots, villas and residential opportunities in the sacred land of Vrindavan. Find your place closer to the divine love of Radha Rani and Shri Krishna, surrounded by the timeless peace and spiritual charm of Braj.
            </p>

            {/* Trust-focused line */}
            <div className="py-0.5">
              <p className="text-xs sm:text-sm font-medium text-[#6B5A4E] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#18534F] shrink-0" />
                <span>Verified project information, site inspection assistance &amp; direct representative support.</span>
              </p>
            </div>

            {/* 3 Prominent CTAs per prompt: Explore Projects, Enquire Now, WhatsApp Enquiry */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="main-explore-button"
                onClick={onExploreProjects}
                type="button"
                className="px-6 py-3.5 bg-[#2C241E] text-[#FAF8F5] text-xs sm:text-sm font-semibold rounded-xs tracking-wider uppercase hover:bg-[#43362C] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="main-enquire-button"
                onClick={onOpenEnquire}
                type="button"
                className="px-6 py-3.5 bg-white text-[#2C241E] border border-[#766144] text-xs sm:text-sm font-semibold rounded-xs tracking-wider uppercase hover:bg-[#F9F5EE] transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Enquire Now</span>
                <Sparkles className="w-4 h-4 text-[#766144]" />
              </button>

              <a
                id="hero-whatsapp-button"
                href={PRIMARY_CONTACT.whatsappDirectUrl('Hi Shiva, I am interested in exploring Suncity Projects in Vrindavan. Please share available options.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#E8F2EE] text-[#12382F] border border-[#BBD7CB] hover:bg-[#D9EBE3] text-xs sm:text-sm font-semibold rounded-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#18534F]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Factual Highlights List */}
            <div className="pt-6 border-t border-[#E8DFD3] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#8A796B] font-medium">Strategic Corridors</span>
                <span className="text-sm font-semibold text-[#2C241E] block mt-0.5">NH-2 &amp; Chhatikara</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#8A796B] font-medium">Property Formats</span>
                <span className="text-sm font-semibold text-[#2C241E] block mt-0.5">Plots, Villas, Suites</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-xs uppercase tracking-wider text-[#8A796B] font-medium">Ground Assistance</span>
                <span className="text-sm font-semibold text-[#2C241E] block mt-0.5">Assisted Site Visits</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xs overflow-hidden shadow-xl border border-[#E5DACD] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
                alt="Architectural landscape and residential township planning in Vrindavan"
                className="w-full h-80 sm:h-96 lg:h-[440px] object-cover transition-transform duration-700 group-hover:scale-102"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17]/85 via-[#1F1A17]/25 to-transparent" />

              {/* Card caption overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white text-left">
                <div className="flex items-center gap-2 mb-1">
                  <PeacockMotif size={16} />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E5C9A6]">
                    Vrindavan Residential Portfolio
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F5]">
                  Suncity Anantam, Villas &amp; Sharnam
                </h3>
                <p className="text-xs text-[#E8DFD1] mt-1.5 line-clamp-2 leading-relaxed">
                  Prime residential plots, private villa enclaves, and serviced suites along the peaceful corridors of Mathura-Vrindavan.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                  <span className="text-xs text-white/90">Dedicated Site Inspections</span>
                  <a
                    href={PRIMARY_CONTACT.whatsappDirectUrl('Hi Shiva, I would like to schedule a site visit for Suncity projects in Vrindavan.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#E5C9A6] hover:underline flex items-center gap-1"
                  >
                    <span>Request Visit</span>
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Subtle verification badge with peacock accent */}
            <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-[#FAF8F5] border border-[#766144] p-3 sm:p-4 rounded-xs shadow-md hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-xs bg-[#18534F] text-[#E5C9A6] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#1F1A17]">Verified Property Discovery</span>
                <span className="block text-[11px] text-[#6B5A4E]">Direct representative · Factual assistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
