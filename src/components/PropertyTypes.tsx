import React from 'react';
import { Layers, Home, Sparkles, TrendingUp, Sun, Building2, ArrowRight } from 'lucide-react';
import { PropertyCategory } from '../types';

interface PropertyTypesProps {
  onSelectPropertyType: (type: PropertyCategory) => void;
}

export const PropertyTypes: React.FC<PropertyTypesProps> = ({ onSelectPropertyType }) => {
  const propertyCategories: {
    title: PropertyCategory;
    icon: React.ReactNode;
    subtitle: string;
    description: string;
  }[] = [
    {
      title: 'Residential Plots',
      icon: <Layers className="w-5 h-5 text-[#18534F]" />,
      subtitle: 'Freehold Plots',
      description: 'Demarcated plots in integrated townships offering freehold freedom to build your bespoke Vrindavan sanctuary.'
    },
    {
      title: 'Villas / Independent Houses',
      icon: <Home className="w-5 h-5 text-[#18534F]" />,
      subtitle: 'Exclusive Residences',
      description: 'Private duplex and independent villa residences with personal garden courtyards and dedicated parking.'
    },
    {
      title: 'Apartments / Flats',
      icon: <Building2 className="w-5 h-5 text-[#18534F]" />,
      subtitle: 'Contemporary Convenience',
      description: 'Modern low-maintenance apartments ideal for family living, close to essential markets and arterial roads.'
    },
    {
      title: 'Luxury Projects',
      icon: <Sparkles className="w-5 h-5 text-[#18534F]" />,
      subtitle: 'Gated Enclaves',
      description: 'Premium residential opportunities with enhanced privacy, scenic landscaping, and high-end master planning.'
    },
    {
      title: 'Investment Properties',
      icon: <TrendingUp className="w-5 h-5 text-[#18534F]" />,
      subtitle: 'Capital Growth Corridor',
      description: 'Strategic parcels on the NH-2 highway corridor benefiting from ongoing Vrindavan infrastructure expansion.'
    },
    {
      title: 'Other',
      icon: <Sun className="w-5 h-5 text-[#18534F]" />,
      subtitle: 'Turnkey Suites & More',
      description: 'Service suites and turnkey retreats designed for peaceful weekend getaways and pilgrimage stays.'
    }
  ];

  return (
    <section id="property-types" className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-[#EAE0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#9E7B4E]">
            Tailored Property Categories
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1A17] tracking-tight mt-1">
            Find a Property That Fits Your Needs
          </h2>
          <p className="text-base sm:text-lg text-[#5A4B40] leading-relaxed mt-2">
            Whether you seek a custom residential plot, a peaceful holiday retreat, or an investment asset, discover options across Vrindavan.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-xs border border-[#E0D5C7] shadow-xs hover:border-[#C5A880] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xs bg-[#FAF8F5] border border-[#EAE0D3] flex items-center justify-center mb-4 group-hover:bg-[#2C241E] group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8A796B] mb-1">
                  {cat.subtitle}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1A17] mb-2 group-hover:text-[#8A6736] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-[#5C4D41] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#F0EAE1]">
                <button
                  type="button"
                  onClick={() => onSelectPropertyType(cat.title)}
                  className="w-full py-2.5 px-4 bg-[#FAF8F5] text-[#2C241E] hover:bg-[#2C241E] hover:text-[#FAF8F5] text-xs font-semibold rounded-xs uppercase tracking-wider flex items-center justify-between transition-colors border border-[#E0D5C7]"
                >
                  <span>Enquire for {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-12 p-8 bg-white border border-[#E0D5C7] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1F1A17]">
              Not sure which option aligns with your goals?
            </h3>
            <p className="text-sm text-[#635347] mt-1">
              Speak directly with our enquiry representative Shiva Chaurasia for tailored project recommendations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPropertyType('Other')}
            className="px-7 py-3.5 bg-[#2C241E] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#18534F] transition-all shrink-0 flex items-center gap-2"
          >
            <span>Request Guidance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
