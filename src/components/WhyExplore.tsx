import React from 'react';
import { Layers, Scale, Compass, FileCheck2, UserCheck } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';

export const WhyExplore: React.FC = () => {
  const points = [
    {
      icon: <Layers className="w-5 h-5 text-[#9E7B4E]" />,
      title: 'Consolidated Vrindavan Showcase',
      description: 'Explore multiple residential development concepts—integrated townships, private villa clusters, and studio suites—through one transparent enquiry platform.'
    },
    {
      icon: <Scale className="w-5 h-5 text-[#9E7B4E]" />,
      title: 'Compare Property Categories',
      description: 'Evaluate plotted land versus independent villas or turnkey service suites to determine which configuration best matches your lifestyle and financial horizon.'
    },
    {
      icon: <Compass className="w-5 h-5 text-[#9E7B4E]" />,
      title: 'Customised Project Matching',
      description: 'Share your exact budget range and purpose (second home, self-use, or long-term investment) to receive focused, relevant project recommendations.'
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-[#9E7B4E]" />,
      title: 'Factual Project Documentation',
      description: 'Obtain verified layout plans, developmental phase information, and official RERA documentation directly from authorised project coordinators.'
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#9E7B4E]" />,
      title: 'Direct Enquiry Representative',
      description: `Connect directly with ${PRIMARY_CONTACT.name} via WhatsApp or phone call for prompt answers and physical site visit coordination in Vrindavan.`
    }
  ];

  return (
    <section id="why-explore" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#766144]">
            Strategic &amp; Devotional Living
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1A17] tracking-tight mt-1">
            Why Explore Property in Vrindavan?
          </h2>
          <p className="text-base sm:text-lg text-[#524439] leading-relaxed mt-2">
            Discover why homebuyers, retirees, devotees, and prudent investors are choosing Vrindavan’s prime residential corridors for their next address.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-xs border border-[#E5DACD] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border border-[#EAE0D3] flex items-center justify-center mb-4">
                  {pt.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1F1A17] mb-2">
                  {pt.title}
                </h3>
                <p className="text-sm text-[#5C4D41] leading-relaxed">
                  {pt.description}
                </p>
              </div>
            </div>
          ))}

          {/* Quick Consultation Highlight Card */}
          <div className="bg-[#2C241E] p-6 sm:p-7 rounded-xs text-[#FAF8F5] flex flex-col justify-between border border-[#3D322B]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#D8B486] mb-2">
                Personalized Site Visits
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FAF8F5] mb-2">
                Plan a Ground Inspection
              </h3>
              <p className="text-sm text-[#DDD2C4] leading-relaxed">
                Visiting Vrindavan? Arrange an assisted site inspection of the Anantam corridor and nearby developments.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-white/15">
              <a
                href={PRIMARY_CONTACT.whatsappDirectUrl(`Hi ${PRIMARY_CONTACT.name}, I am planning a visit to Vrindavan and would like to arrange a site visit.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#E5C9A6] hover:underline flex items-center gap-2"
              >
                <span>Coordinate Site Visit on WhatsApp</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
