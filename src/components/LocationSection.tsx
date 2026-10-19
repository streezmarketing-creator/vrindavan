import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-[#EAE0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Descriptive Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#9E7B4E]">
              Strategic Regional Connectivity
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1A17] tracking-tight">
              Location & Connectivity in Vrindavan
            </h2>

            <p className="text-base sm:text-lg text-[#5A4B40] leading-relaxed">
              The featured Suncity projects in Vrindavan are primarily situated along the prestigious National Highway 2 (NH-2 Delhi-Agra corridor) and the key Chhatikara arterial route.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded-xs border border-[#E0D5C7] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2C241E]">
                  <Navigation className="w-4 h-4 text-[#9E7B4E]" />
                  <span>National Highway 2 (NH-2 Corridor)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                  Direct highway frontage connecting effortlessly to Delhi-NCR, Faridabad, and Agra, ensuring smooth vehicular transit without entering congested city lanes.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xs border border-[#E0D5C7] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2C241E]">
                  <Compass className="w-4 h-4 text-[#9E7B4E]" />
                  <span>Chhatikara Arterial Corridor</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                  The primary gateway road leading directly into the heart of Vrindavan’s pilgrimage circuits, Prem Mandir, ISKCON, and Chandrodaya Mandir.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xs border border-[#E0D5C7] space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-[#2C241E]">
                  <MapPin className="w-4 h-4 text-[#9E7B4E]" />
                  <span>Mathura District & Rail Linkages</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                  Convenient access to Mathura Junction, one of North India’s most well-connected rail hubs, providing direct train links across India.
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#EFE7DC] border border-[#DFCDB9] rounded-xs text-xs text-[#6B5747] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8A6736] shrink-0 mt-0.5" />
              <span>
                Accurate route maps, exact geo-coordinates, and physical demarcations are presented during verified on-site visits with our representative.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Map Placeholder & Visual */}
          <div className="lg:col-span-6">
            <div className="bg-white p-4 sm:p-5 rounded-xs border border-[#E0D5C7] shadow-sm space-y-4">
              {/* Map Canvas / Simulated Satellite Framing */}
              <div className="relative h-72 sm:h-96 rounded-xs overflow-hidden border border-[#E5DACD] bg-[#2C241E]">
                <iframe
                  title="Vrindavan Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113264.48202517227!2d77.6256247920152!3d27.57597148858276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c7e00f!2sVrindavan%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter saturate-90 contrast-105"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map showing Vrindavan and NH-2 area"
                />

                <div className="absolute top-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-xs px-3 py-1.5 rounded-xs border border-[#D5C7B6] text-xs font-semibold text-[#1F1A17] shadow-xs">
                  Vrindavan & NH-2 Corridor
                </div>
              </div>

              {/* Map Footer Bar with external link */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                <div>
                  <span className="block text-xs font-bold text-[#1F1A17]">Region: Vrindavan, Mathura (U.P.)</span>
                  <span className="text-[11px] text-[#7A695B]">NH-2 Delhi-Agra Highway / Chhatikara Junction</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Vrindavan,+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF8F5] text-[#2C241E] border border-[#D5C7B6] text-xs font-semibold rounded-xs hover:bg-[#F2ECE2] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9E7B4E]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
