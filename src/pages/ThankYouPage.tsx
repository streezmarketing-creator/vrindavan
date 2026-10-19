import React, { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, Home } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';
import { SuncityLogo } from '../components/SuncityLogo';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  const [submissionDetails, setSubmissionDetails] = useState<{
    project?: string;
    propertyType?: string;
  }>({});

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Retrieve last non-PII submission marker
    try {
      const stored = sessionStorage.getItem('suncity_last_submission');
      if (stored) {
        setSubmissionDetails(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }

    /*
     * =========================================================================
     * GOOGLE ADS & ANALYTICS CONVERSION TRACKING PLACEHOLDER
     * 
     * When you are ready to configure Google Ads Conversion Tracking:
     * 1. Add your Google tag (gtag.js) to index.html.
     * 2. Paste your Event Snippet below:
     * 
     * example:
     * if (typeof window !== 'undefined' && (window as any).gtag) {
     *   (window as any).gtag('event', 'conversion', {
     *     'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYYYY',
     *     'value': 1.0,
     *     'currency': 'INR'
     *   });
     * }
     * =========================================================================
     */
  }, []);

  const projectText = submissionDetails.project ? ` for ${submissionDetails.project}` : '';
  const propertyText = submissionDetails.propertyType ? ` (${submissionDetails.propertyType})` : '';

  // Non-PII message format strictly adhering to prompt instruction:
  // "Do not include the visitor's full name, email, or mobile number in the URL."
  const waCustomMessage = `Hi Shiva, I have submitted an enquiry through the Suncity Projects website${projectText}${propertyText}. I would like to discuss property options in Vrindavan.`;
  const waUrl = PRIMARY_CONTACT.whatsappDirectUrl(waCustomMessage);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241E] flex flex-col justify-between text-left">
      {/* Top Simple Header */}
      <div className="border-b border-[#EAE0D3] bg-white py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SuncityLogo height={36} />
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs font-semibold text-[#6B5A4E] hover:text-[#1F1A17] flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Main Confirmation Content */}
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 my-auto w-full">
        <div className="bg-white p-6 sm:p-10 rounded-xs border border-[#E0D5C7] shadow-sm text-center space-y-6">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-[#EAF5EE] text-[#1E7E52] flex items-center justify-center mx-auto border border-[#C5E1D4]">
            <CheckCircle2 className="w-9 h-9 text-[#18534F]" />
          </div>

          {/* Master Prompt Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1A17] tracking-tight">
            Thank You for Your Enquiry!
          </h1>

          {/* Master Prompt Supporting Text */}
          <p className="text-base sm:text-lg text-[#5A4B40] leading-relaxed max-w-lg mx-auto">
            Thank you for your interest in Suncity Projects, Vrindavan. Your enquiry has been received successfully. You can continue the conversation on WhatsApp for further assistance.
          </p>

          {/* Selected Project Summary Pill */}
          {submissionDetails.project && (
            <div className="p-3 bg-[#FAF8F5] border border-[#E8DFD3] rounded-xs text-xs text-[#6B5A4E] inline-block">
              Enquiry logged for: <strong className="text-[#2C241E]">{submissionDetails.project}</strong>
              {submissionDetails.propertyType && ` · ${submissionDetails.propertyType}`}
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
            <a
              id="thank-you-whatsapp-button"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 bg-[#1E7E52] hover:bg-[#16603E] text-white text-xs sm:text-sm font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue on WhatsApp</span>
            </a>

            <button
              id="thank-you-back-button"
              type="button"
              onClick={onBackToHome}
              className="py-3.5 px-6 bg-[#FAF8F5] text-[#2C241E] border border-[#D5C7B6] hover:bg-[#F2ECE2] text-xs sm:text-sm font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </button>
          </div>

          {/* Direct Contact Reference */}
        
        </div>

        {/* Verification & Privacy notice */}
        <div className="mt-6 text-center text-xs text-[#8C7A6B] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#9E7B4E]" />
          <span>Your information is handled strictly in accordance with our Privacy Policy.</span>
        </div>
      </div>

      {/* Simple Footer */}
      <div className="border-t border-[#EAE0D3] py-6 text-center text-xs text-[#8C7A6B] bg-[#FAF8F5]">
        &copy; {new Date().getFullYear()} Suncity Projects Vrindavan. All rights reserved.
      </div>
    </div>
  );
};
