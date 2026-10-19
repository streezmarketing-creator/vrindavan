import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageCircle, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { EnquiryFormData, PropertyCategory, BudgetRange, PurposeType } from '../types';
import { submitLeadEnquiry, validateIndianMobile, LEAD_BACKEND_ENDPOINT } from '../utils/formService';
import { getAndPreserveUtmParams } from '../utils/utm';

interface LeadFormProps {
  initialProject?: string;
  initialPropertyType?: PropertyCategory;
  onSuccessfulSubmission: (lead: EnquiryFormData) => void;
  formId?: string;
  isPopup?: boolean;
  onNavigatePrivacy?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialPropertyType = 'Residential Plots',
  onSuccessfulSubmission,
  formId = 'main-enquiry-form',
  isPopup = false,
  onNavigatePrivacy
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    mobile: '',
    propertyType: initialPropertyType,
    purpose: 'Self-Use',
    budget: '₹50 Lakhs–₹1 Crore',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'notice' | 'success';
    text: string;
    waUrl?: string;
  } | null>(null);

  // Demo bypass toggle for testing
  const [demoBypass, setDemoBypass] = useState(false);

  useEffect(() => {
    if (initialPropertyType) {
      setFormData((prev) => ({ ...prev, propertyType: initialPropertyType }));
    }
  }, [initialPropertyType]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Min 3 chars';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Required';
    } else if (!validateIndianMobile(formData.mobile)) {
      newErrors.mobile = '10-digit valid Indian number (starts 6-9)';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // Open a tab synchronously during the submit gesture so mobile browsers are less likely to block WhatsApp.
    const whatsappTab = window.open('about:blank', '_blank');

    try {
      const utm = getAndPreserveUtmParams();
      const payload: EnquiryFormData = {
        ...formData,
        utmParams: utm
      };

      const response = await submitLeadEnquiry(payload, demoBypass);

      if (response.success) {
        if (whatsappTab && response.whatsAppRedirectUrl) {
          whatsappTab.location.href = response.whatsAppRedirectUrl;
        } else if (response.whatsAppRedirectUrl) {
          window.location.href = response.whatsAppRedirectUrl;
          return;
        }
        onSuccessfulSubmission(payload);
      } else if (response.notConfigured) {
        if (whatsappTab && response.whatsAppRedirectUrl) whatsappTab.location.href = response.whatsAppRedirectUrl;
        else if (response.whatsAppRedirectUrl) window.location.href = response.whatsAppRedirectUrl;
        setStatusMessage({
          type: 'notice',
          text: response.message,
          waUrl: response.whatsAppRedirectUrl
        });
      } else {
        if (whatsappTab && response.whatsAppRedirectUrl) whatsappTab.location.href = response.whatsAppRedirectUrl;
        else if (response.whatsAppRedirectUrl) window.location.href = response.whatsAppRedirectUrl;
        setStatusMessage({
          type: 'error',
          text: response.message,
          waUrl: response.whatsAppRedirectUrl
        });
      }
    } catch {
      const fallbackUrl = `https://wa.me/918604300712?text=${encodeURIComponent(`Hi, I submitted a property enquiry. Name: ${formData.fullName}; Mobile: ${formData.mobile}; Property: ${formData.propertyType}; Purpose: ${formData.purpose}; Budget: ${formData.budget}`)}`;
      if (whatsappTab) whatsappTab.location.href = fallbackUrl;
      else window.location.href = fallbackUrl;
      setStatusMessage({
        type: 'error',
        text: 'Online submission could not be confirmed. WhatsApp is opening as a fallback.',
        waUrl: fallbackUrl
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`text-left ${isPopup ? 'w-full' : 'bg-white p-6 sm:p-8 rounded-xs border border-[#E0D5C7] shadow-sm'}`}>
      {!isPopup && (
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#766144] mb-1">
            Verified Project Consultation
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1A17] tracking-tight">
            Get Property Details
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4B40] leading-relaxed mt-1">
            Share your preferences and enquire about residential property options in Vrindavan.
          </p>
        </div>
      )}

      {/* Backend Status Notice / Alert Box */}
      {statusMessage && (
        <div
          role="alert"
          className={`p-3 mb-3 rounded-xs border text-xs leading-relaxed ${
            statusMessage.type === 'notice'
              ? 'bg-[#FFF9F2] border-[#E8CDB0] text-[#7A5328]'
              : statusMessage.type === 'error'
              ? 'bg-[#FFF5F5] border-[#F2C2C2] text-[#9E2A2B]'
              : 'bg-[#F2FBF6] border-[#BCE4CD] text-[#1E7E52]'
          }`}
        >
          <div className="flex items-start gap-2">
            {statusMessage.type === 'notice' && <AlertCircle className="w-4 h-4 shrink-0 text-[#B87A38] mt-0.5" />}
            {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-[#9E2A2B] mt-0.5" />}
            {statusMessage.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0 text-[#1E7E52] mt-0.5" />}
            <div className="flex-1 space-y-1.5">
              <p className="font-medium text-xs">{statusMessage.text}</p>
              {statusMessage.waUrl && (
                <a
                  href={statusMessage.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#18534F] text-white rounded-xs text-xs font-semibold hover:bg-[#12382F] transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Enquiry via WhatsApp Now</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <form id={formId} onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
        {/* Unified 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Row 1, Col 1: Full Name */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor={`${formId}-fullName`} className="text-[11px] font-semibold uppercase tracking-wider text-[#382E27]">
                Full Name <span className="text-[#A32A2A]">*</span>
              </label>
              {errors.fullName && <span className="text-[10px] text-[#C2410C] font-medium">{errors.fullName}</span>}
            </div>
            <input
              id={`${formId}-fullName`}
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="e.g. Ramesh Sharma"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              className={`w-full h-9 px-3 rounded-xs border text-xs sm:text-sm text-[#1F1A17] bg-white transition-colors focus:outline-hidden ${
                errors.fullName ? 'border-[#C2410C] ring-1 ring-[#C2410C]' : 'border-[#D5C7B6] focus:border-[#766144] focus:ring-1 focus:ring-[#766144]'
              }`}
            />
          </div>

          {/* Row 1, Col 2: Mobile Number */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor={`${formId}-mobile`} className="text-[11px] font-semibold uppercase tracking-wider text-[#382E27]">
                Mobile Number <span className="text-[#A32A2A]">*</span>
              </label>
              {errors.mobile && <span className="text-[10px] text-[#C2410C] font-medium">{errors.mobile}</span>}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7D6B5C]">
                +91
              </span>
              <input
                id={`${formId}-mobile`}
                type="tel"
                name="mobile"
                autoComplete="tel"
                placeholder="10-digit number"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, mobile: cleaned });
                  if (errors.mobile) setErrors({ ...errors, mobile: '' });
                }}
                className={`w-full h-9 pl-11 pr-3 rounded-xs border text-xs sm:text-sm text-[#1F1A17] bg-white transition-colors focus:outline-hidden ${
                  errors.mobile ? 'border-[#C2410C] ring-1 ring-[#C2410C]' : 'border-[#D5C7B6] focus:border-[#766144] focus:ring-1 focus:ring-[#766144]'
                }`}
              />
            </div>
          </div>

          {/* Row 2, Col 1: Property Type */}
          <div>
            <label htmlFor={`${formId}-propertyType`} className="block text-[11px] font-semibold uppercase tracking-wider text-[#382E27] mb-1">
              Property Type <span className="text-[#A32A2A]">*</span>
            </label>
            <select
              id={`${formId}-propertyType`}
              name="propertyType"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyCategory })}
              className="w-full h-9 px-3 rounded-xs border border-[#D5C7B6] text-xs sm:text-sm text-[#1F1A17] bg-white focus:outline-hidden focus:border-[#766144] focus:ring-1 focus:ring-[#766144]"
            >
              <option value="Residential Plots">Residential Plots</option>
              <option value="Apartments / Flats">Apartments / Flats</option>
              <option value="Luxury Projects">Luxury Projects</option>
              <option value="Investment Properties">Investment Properties</option>
              <option value="Villas / Independent Houses">Villas / Independent Houses</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Row 2, Col 2: Purpose */}
          <div>
            <label htmlFor={`${formId}-purpose`} className="block text-[11px] font-semibold uppercase tracking-wider text-[#382E27] mb-1">
              Purpose <span className="text-[#A32A2A]">*</span>
            </label>
            <select
              id={`${formId}-purpose`}
              name="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value as PurposeType })}
              className="w-full h-9 px-3 rounded-xs border border-[#D5C7B6] text-xs sm:text-sm text-[#1F1A17] bg-white focus:outline-hidden focus:border-[#766144] focus:ring-1 focus:ring-[#766144]"
            >
              <option value="Self-Use">Self-Use</option>
              <option value="Investment">Investment</option>
              <option value="Second Home">Second Home / Spiritual Retreat</option>
              <option value="Exploring Options">Exploring Options</option>
            </select>
          </div>

          {/* Row 3: Preferred Budget (Span 2 Columns) */}
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-budget`} className="block text-[11px] font-semibold uppercase tracking-wider text-[#382E27] mb-1">
              Preferred Budget <span className="text-[#A32A2A]">*</span>
            </label>
            <select
              id={`${formId}-budget`}
              name="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value as BudgetRange })}
              className="w-full h-9 px-3 rounded-xs border border-[#D5C7B6] text-xs sm:text-sm text-[#1F1A17] bg-white focus:outline-hidden focus:border-[#766144] focus:ring-1 focus:ring-[#766144]"
            >
              <option value="Below ₹25 Lakhs">Below ₹25 Lakhs</option>
              <option value="₹25–50 Lakhs">₹25–50 Lakhs</option>
              <option value="₹50 Lakhs–₹1 Crore">₹50 Lakhs–₹1 Crore</option>
              <option value="₹1–2 Crore">₹1–2 Crore</option>
              <option value="Above ₹2 Crore">Above ₹2 Crore</option>
              <option value="Not Decided Yet">Not Decided Yet</option>
            </select>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              id={`${formId}-consent`}
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={(e) => {
                setFormData({ ...formData, consent: e.target.checked });
                if (errors.consent) setErrors({ ...errors, consent: '' });
              }}
              className="mt-0.5 w-4 h-4 text-[#18534F] border-[#D5C7B6] rounded-2xs focus:ring-[#18534F] shrink-0"
            />
            <span className="text-[11px] sm:text-xs text-[#524439] leading-tight">
              I agree to be contacted by an authorised enquiry representative regarding property options in Vrindavan via Phone / WhatsApp.{' '}
              <span className="text-[#A32A2A]">*</span>
            </span>
          </label>
          {errors.consent && <p className="text-[10px] text-[#C2410C] mt-0.5">{errors.consent}</p>}
        </div>

        {/* Submit Button (Always accessible, prominent, and mobile-ready) */}
        <div className="pt-1">
          <button
            id={`${formId}-submit`}
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 px-4 bg-[#2C241E] text-[#FAF8F5] text-xs sm:text-sm font-semibold rounded-xs uppercase tracking-wider hover:bg-[#18534F] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#E5C9A6]" />
                <span>Processing Enquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Enquiry</span>
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-[10px] text-[#7D6B5C] text-center leading-tight">
          Your information is confidential and used solely to share verified project details.{' '}
          <button
            type="button"
            onClick={onNavigatePrivacy}
            className="text-[#766144] underline hover:text-[#2C241E] font-medium"
          >
            Privacy Policy
          </button>
          .
        </p>

        {/* Developer / Demo Verification Switch */}
        {!LEAD_BACKEND_ENDPOINT && !isPopup && (
          <div className="pt-2 text-center border-t border-[#F0EAE1]">
            <label className="inline-flex items-center gap-2 text-[10px] text-[#8C7A6B] cursor-pointer">
              <input
                type="checkbox"
                checked={demoBypass}
                onChange={(e) => setDemoBypass(e.target.checked)}
                className="w-3 h-3 text-[#766144] rounded-2xs"
              />
              <span>Test Mode (Simulate submission to preview Thank-You page)</span>
            </label>
          </div>
        )}
      </form>
    </div>
  );
};
