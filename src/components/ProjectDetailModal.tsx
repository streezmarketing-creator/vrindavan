import React, { useEffect, useState } from 'react';
import { X, MapPin, CheckCircle2, MessageCircle, ArrowRight, ShieldAlert, Images } from 'lucide-react';
import { Project } from '../types';
import { PRIMARY_CONTACT } from '../data/projectsData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onEnquire: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onEnquire
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentGallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xs shadow-2xl border border-[#E0D5C7] overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#EAE0D3] bg-white sticky top-0 z-20">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E7B4E]">
              {project.categoryLabel}
            </div>
            <h2 id="modal-project-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1A17]">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D6B5C] hover:text-[#1F1A17] hover:bg-[#F2ECE2] rounded-xs transition-colors"
            aria-label="Close project details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xs overflow-hidden bg-[#2C241E] border border-[#E8DFD3]">
              <img
                src={currentGallery[activeImageIndex]}
                alt={`${project.name} photo preview ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-black/65 text-white text-xs px-2.5 py-1 rounded-xs flex items-center gap-1.5 backdrop-blur-xs">
                <Images className="w-3.5 h-3.5" />
                <span>
                  {activeImageIndex + 1} / {currentGallery.length}
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {currentGallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {currentGallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xs overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#9E7B4E] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Bar */}
          <div className="flex items-center gap-2 p-3.5 bg-white border border-[#EAE0D3] rounded-xs text-sm text-[#4A3B32]">
            <MapPin className="w-4 h-4 text-[#9E7B4E] shrink-0" />
            <span className="font-medium">Location:</span>
            <span>{project.location}</span>
          </div>

          {/* Project Overview */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F1A17] mb-2">Project Overview</h3>
            <p className="text-sm sm:text-base text-[#5A4B40] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Property Options */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F1A17] mb-3">Property Options & Formats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.propertyOptions.map((opt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-[#EDE4D8] rounded-xs text-sm">
                  <span className="text-[#9E7B4E] font-bold">0{idx + 1}.</span>
                  <span className="text-[#3A2E25] font-medium">{opt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Amenities */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F1A17] mb-3">Planned Infrastructure & Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#524338]">
              {project.verifiedAmenities.map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D52] shrink-0 mt-0.5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency & Verification Note */}
          <div className="p-4 bg-[#F5EFE6] border border-[#DFCDB9] rounded-xs text-xs space-y-1.5 text-[#5A4839]">
            <div className="flex items-center gap-1.5 font-bold text-[#3B2C20]">
              <ShieldAlert className="w-4 h-4 text-[#8A6736]" />
              <span>Project Verification Notice</span>
            </div>
            <p>
              {project.statusNote}
            </p>
            <p className="text-[#756251]">
              Legal approvals, site plans, and RERA registration documents are available for inspection upon enquiry with our authorised representative.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#EAE0D3] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a
            href={PRIMARY_CONTACT.whatsappDirectUrl(`Hi Shiva, I am enquiring about details for ${project.name} in Vrindavan.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#E9F3EE] text-[#1E3A2F] border border-[#C5E1D4] hover:bg-[#DCEDE4] text-xs font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#1E7E52]" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquire(project.name);
            }}
            className="px-7 py-3 bg-[#2C241E] text-[#FAF8F5] hover:bg-[#43362C] text-xs font-semibold rounded-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <span>Enquire for this Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
