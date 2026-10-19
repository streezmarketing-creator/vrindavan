import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { EnquiryFormData, PropertyCategory } from '../types';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
  preselectedPropertyType?: PropertyCategory;
  onSuccessfulSubmission: (lead: EnquiryFormData) => void;
  onNavigatePrivacy?: () => void;
}

export const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  preselectedProject = 'Suncity Anantam',
  preselectedPropertyType = 'Residential Plots',
  onSuccessfulSubmission,
  onNavigatePrivacy
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-enquiry-title"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Container: strictly constrained to viewport with flex-col */}
      <div className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[86vh] flex flex-col bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#DFCDB9] overflow-hidden my-auto text-left">
        {/* Compact Header (shrink-0) */}
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-white border-b border-[#EAE0D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xs bg-[#2C241E] text-[#E5C9A6] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#766144] block leading-none">
                Vrindavan Property Discovery
              </span>
              <h2 id="popup-enquiry-title" className="font-serif text-lg sm:text-xl font-bold text-[#1F1A17] mt-0.5 leading-tight">
                Interested in Property in Vrindavan?
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7D6B5C] hover:text-[#1F1A17] hover:bg-[#F2ECE2] rounded-xs transition-colors shrink-0"
            aria-label="Close enquiry popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Subtitle (shrink-0) */}
        <div className="shrink-0 px-4 sm:px-6 pt-2.5 pb-1 bg-[#FAF8F5]">
          <p className="text-xs text-[#5C4D41] leading-normal">
            Tell us your preferences and we’ll help you enquire about relevant Suncity project options.
          </p>
        </div>

        {/* Scrollable Form Body with explicit min-h-0 and internal scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-2.5 overscroll-contain">
          <LeadForm
            initialProject={preselectedProject}
            initialPropertyType={preselectedPropertyType}
            onSuccessfulSubmission={(lead) => {
              onSuccessfulSubmission(lead);
              onClose();
            }}
            formId="popup-enquiry-form"
            isPopup={true}
            onNavigatePrivacy={() => {
              onClose();
              if (onNavigatePrivacy) onNavigatePrivacy();
            }}
          />
        </div>
      </div>
    </div>
  );
};
