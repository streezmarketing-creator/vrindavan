import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Where are the listed projects located?',
      answer: 'The featured Suncity projects are located in Vrindavan, Mathura district, Uttar Pradesh. Specific projects such as Suncity Anantam, Anantam Villas, and Suncity Studio Apartments are situated along the National Highway 2 (NH-2 Delhi-Agra corridor), while Suncity Govind Sharnam is situated along the Chhatikara corridor with direct access toward central Vrindavan.'
    },
    {
      question: 'Which property categories can I enquire about?',
      answer: 'You can submit enquiries for residential plots of various dimensions, luxury independent villas, modern apartments / flats, turnkey service studio suites, and investment-oriented parcels across the listed projects.'
    },
    {
      question: 'How can I get current prices?',
      answer: 'Because real estate pricing varies depending on plot size, orientation, layout category, and current developmental phase, updated pricing schedules are provided upon direct enquiry with our representative. We do not display speculative prices on this website to maintain transparency.'
    },
    {
      question: 'How can I check property availability?',
      answer: 'Property availability and inventory status are confirmed directly through the developer’s authorised inventory desk. When you submit an enquiry form or message us on WhatsApp, we verify live unit availability for your preferred project and property type.'
    },
    {
      question: 'Can I request a site visit?',
      answer: 'Yes, physical on-ground site inspections can be coordinated. You can request a visit by selecting "Exploring Options" or "Self-Use" in our lead form or by messaging Shiva Chaurasia on WhatsApp (+91 8604300712) with your preferred visiting date and time.'
    },
    {
      question: 'How can I contact the enquiry representative?',
      answer: 'You can connect directly with Shiva Chaurasia via WhatsApp or direct phone call at +91 8604300712. You can also submit the enquiry form on this website, and our representative will reach out via your preferred contact channel.'
    },
    {
      question: 'Are all listed property types available in every project?',
      answer: 'No. Each project features distinct development formats. For example, Suncity Anantam emphasizes plotted township developments, Anantam Villas offers individual villa residences, and Studio Apartments focuses on compact suites. Please refer to individual project cards or enquire for project-specific options.'
    },
    {
      question: 'How is my enquiry information used?',
      answer: 'Your name, contact number, and property preferences are used exclusively to process your specific enquiry, share verified project brochures/details, and coordinate site discussions. We respect your privacy and never distribute your data to third-party telemarketers. See our Privacy Policy for full terms.'
    }
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE0D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#9E7B4E]">
            Frequently Asked Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1A17] tracking-tight mt-1">
            Questions & Answers
          </h2>
          <p className="text-sm sm:text-base text-[#5A4B40] leading-relaxed mt-2">
            Clear, factual information regarding project locations, property types, site visits, and consultation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5DACD] rounded-xs overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#2C241E]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xs bg-[#F4EEE5] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#2C241E] text-white' : 'text-[#6B5A4E]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-[#5A4B40] leading-relaxed border-t border-[#F2ECE2] animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-10 p-6 bg-[#F5EFE6] border border-[#E0D5C7] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#2C241E] text-[#E5C9A6] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-[#1F1A17]">Have a specific project question?</span>
              <span className="text-xs text-[#6B5A4E]">Speak directly with Shiva Chaurasia on WhatsApp.</span>
            </div>
          </div>
          <a
            href={PRIMARY_CONTACT.whatsappDirectUrl('Hi Shiva, I have a question about properties in Vrindavan.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1E7E52] text-white rounded-xs text-xs font-semibold hover:bg-[#16603E] transition-colors shrink-0 shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
