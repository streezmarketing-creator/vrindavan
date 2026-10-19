import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';
import { PeacockMotif } from './PeacockMotif';

interface FinalCtaProps {
  onOpenEnquire: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenEnquire }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#231C18] text-[#FAF8F5] relative overflow-hidden border-t border-[#382E27]">
      {/* Subtle background ambient styling */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#18534F] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C5A880] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-[#E5C9A6] text-xs font-semibold uppercase tracking-widest rounded-xs">
          <PeacockMotif size={18} />
          <span>Vrindavan Property Opportunities</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F5]">
          Let&apos;s Find the Right Property for You
        </h2>

        <p className="text-base sm:text-lg text-[#D8CEBE] max-w-2xl mx-auto leading-relaxed">
          Share your property preferences and enquire about selected residential projects in Vrindavan.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenEnquire}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] text-[#1F1A17] hover:bg-[#D4BB95] text-xs sm:text-sm font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Submit an Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={PRIMARY_CONTACT.whatsappDirectUrl('Hi Shiva, I am ready to explore residential properties in Vrindavan.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/15 text-[#FAF8F5] border border-white/20 text-xs sm:text-sm font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="text-xs text-[#A89A8B] pt-4">
          Direct representative: Shiva Chaurasia · WhatsApp: +91 8604300712 · Zero obligation enquiry
        </p>
      </div>
    </section>
  );
};
