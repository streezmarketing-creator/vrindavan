import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Mail, Phone, Lock, Eye, FileText } from 'lucide-react';
import { PRIMARY_CONTACT } from '../data/projectsData';
import { SuncityLogo } from '../components/SuncityLogo';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241E] text-left">
      {/* Header */}
      <div className="border-b border-[#EAE0D3] bg-white py-4 px-4 sm:px-8 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SuncityLogo height={36} />
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs font-semibold text-[#6B5A4E] hover:text-[#1F1A17] flex items-center gap-1.5 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-10 rounded-xs border border-[#E0D5C7] shadow-xs space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E7B4E] mb-2">
              <Shield className="w-4 h-4" />
              <span>Transparency & Data Practice</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1A17] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#8C7A6B] mt-1">
              Last updated: October 2026 · Effective for all visitors to suncityvrindavan.in
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#524439] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1F1A17] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#9E7B4E]" />
                <span>1. Overview and Purpose</span>
              </h2>
              <p>
                This Privacy Policy explains how <strong>Suncity Projects Vrindavan</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operated by our property discovery and enquiry representative, collects, uses, and safeguards information provided by visitors through our website.
              </p>
              <p>
                This website is dedicated to real estate discovery, project information sharing, and customer enquiry facilitation for residential properties in Vrindavan, Mathura, Uttar Pradesh.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1F1A17] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#9E7B4E]" />
                <span>2. Information We Collect</span>
              </h2>
              <p>
                We only collect information that you deliberately provide through our enquiry forms, WhatsApp conversations, or direct telephone calls. This may include:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#42362D]">
                <li><strong>Full Name:</strong> To address you correctly during property consultations.</li>
                <li><strong>Mobile Phone Number:</strong> To contact you via telephone or WhatsApp regarding your specific enquiry.</li>
                <li><strong>Property Preferences:</strong> Property category, purpose, and budget bracket.</li>
                <li><strong>Technical & Marketing Attribution:</strong> Anonymous URL query parameters (such as UTM source, medium, or campaign) to evaluate marketing campaign performance.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1F1A17] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#9E7B4E]" />
                <span>3. How Your Information Is Used</span>
              </h2>
              <p>
                The information you submit is strictly utilized for legitimate real estate enquiry assistance:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#42362D]">
                <li>To respond to your request for property details, pricing schedules, or availability.</li>
                <li>To coordinate physical on-ground site visits in Vrindavan at your request.</li>
                <li>To communicate with you via telephone call or WhatsApp regarding your enquiry.</li>
                <li>We do <strong>not</strong> sell, rent, lease, or trade your personal contact details to third-party telemarketers or unrelated advertisers.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1F1A17]">
                4. Consent and Communication
              </h2>
              <p>
                By checking the consent box on our enquiry form or sending us a message on WhatsApp, you grant explicit consent for our authorised representative to contact you regarding residential properties in Vrindavan. You may opt out of future communications at any time simply by replying &ldquo;STOP&rdquo; on WhatsApp or by contacting us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1F1A17]">
                5. Third-Party Links & Services
              </h2>
              <p>
                Our website includes direct links to external services such as WhatsApp (Meta Platforms) and Google Maps (Alphabet Inc.). When interacting with these third-party services, their respective privacy policies govern your data.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-[#EDE4D8]">
              <h2 className="font-serif text-xl font-bold text-[#1F1A17]">
                6. Contact the Enquiry Operator
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, wish to access, rectify, or request the deletion of your submitted details, please contact:
              </p>
              <div className="p-4 bg-[#FAF8F5] border border-[#E5DACD] rounded-xs space-y-1.5 text-xs sm:text-sm">
                <p><strong>Primary Representative:</strong> {PRIMARY_CONTACT.name}</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#9E7B4E]" />
                  <span>Phone / WhatsApp: {PRIMARY_CONTACT.displayPhone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#9E7B4E]" />
                  <span>Location: {PRIMARY_CONTACT.location}</span>
                </p>
              </div>
            </section>
          </div>

          <div className="pt-6 border-t border-[#EAE0D3] flex justify-between items-center">
            <button
              type="button"
              onClick={onBackToHome}
              className="py-3 px-6 bg-[#2C241E] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#43362C] transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
