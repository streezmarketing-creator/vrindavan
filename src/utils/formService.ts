import { EnquiryFormData } from '../types';
import { PRIMARY_CONTACT } from '../data/projectsData';

/**
 * Lead Submission Configuration
 * 
 * Replace this endpoint URL with your Google Apps Script Webhook URL,
 * Zapier webhook, or Vercel Serverless Function (/api/lead).
 * Instructions are documented in README.md.
 */
export const LEAD_BACKEND_ENDPOINT =
  (import.meta.env.VITE_LEAD_API_ENDPOINT as string) ||
  'https://script.google.com/macros/s/AKfycby91-bKiLuObG4UPGBJLF3-GL2nQmT4uI4YuB6YAvETrjFM-A3AQJARF4oPuctPLdfvXw/exec';

export interface SubmissionResponse {
  success: boolean;
  notConfigured?: boolean;
  message: string;
  leadData?: EnquiryFormData;
  whatsAppRedirectUrl?: string;
}

/**
 * GOOGLE ADS & CONVERSION TRACKING HOOK
 * 
 * IMPORTANT: This function fires ONLY after a real backend confirms receipt of the enquiry.
 * Never fire tracking on button clicks or failed submissions.
 * When you receive your Google Ads conversion ID and label, uncomment and paste here:
 */
export function fireConversionTracking(data: EnquiryFormData) {
  // =========================================================================
  // GOOGLE ADS CONVERSION TRACKING PLACEHOLDER
  // Example implementation when you have your Tag ID & Conversion Label:
  //
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', 'conversion', {
  //     'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYYYY',
  //     'value': 1.0,
  //     'currency': 'INR',
  //     'transaction_id': data.submittedAt || Date.now().toString()
  //   });
  //   console.log('[Tracking] Google Ads conversion successfully recorded');
  // }
  // =========================================================================
  console.log('[Suncity Tracking Placeholder] Lead successfully submitted:', {
    type: data.propertyType,
    purpose: data.purpose,
    budget: data.budget,
    time: data.submittedAt
  });
}

/**
 * Validates Indian 10-digit mobile number
 */
export function validateIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Allows 10 digits starting with 6, 7, 8, or 9; or 12 digits starting with 91 followed by 6-9
  if (cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)) {
    return true;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^[6-9]\d{9}$/.test(cleaned.substring(2))) {
    return true;
  }
  return false;
}


/**
 * Submits enquiry to backend endpoint
 */
export async function submitLeadEnquiry(formData: EnquiryFormData, _allowDemoBypass = false): Promise<SubmissionResponse> {
  const payload: EnquiryFormData = {
    ...formData,
    submittedAt: new Date().toISOString()
  };

  const waMsg = [
    'Hi, I have submitted a property enquiry for Vrindavan.',
    `Name: ${formData.fullName}`,
    `Mobile: ${formData.mobile}`,
    `Property type: ${formData.propertyType}`,
    `Purpose: ${formData.purpose}`,
    `Preferred budget: ${formData.budget}`
  ].join('\n');
  const whatsAppRedirectUrl = PRIMARY_CONTACT.whatsappDirectUrl(waMsg);

  if (!LEAD_BACKEND_ENDPOINT) {
    return {
      success: false,
      notConfigured: true,
      message: 'Enquiry service is not configured. Please continue on WhatsApp.',
      leadData: payload,
      whatsAppRedirectUrl
    };
  }

  try {
    // Apps Script Web Apps commonly do not expose CORS headers. A simple
    // URL-encoded no-cors POST lets the browser send the form without a preflight.
    const params = new URLSearchParams();
    params.set('fullName', formData.fullName.trim());
    params.set('mobile', formData.mobile.replace(/\D/g, ''));
    params.set('propertyType', formData.propertyType);
    params.set('purpose', formData.purpose);
    params.set('budget', formData.budget);
    params.set('consent', formData.consent ? 'Yes' : 'No');
    params.set('source', 'Website');

    await fetch(LEAD_BACKEND_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params.toString()
    });

    // Opaque no-cors responses cannot confirm the row was saved. We record
    // that the browser dispatched the request, not that Google confirmed it.
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('suncity_lead_submitted', 'true');
      sessionStorage.setItem('suncity_last_submission', JSON.stringify({
        propertyType: payload.propertyType,
        purpose: payload.purpose,
        budget: payload.budget,
        time: payload.submittedAt
      }));
    }

    return {
      success: true,
      message: 'Your enquiry has been sent. Please continue on WhatsApp.',
      leadData: payload,
      whatsAppRedirectUrl
    };
  } catch (error) {
    console.error('Lead submission failure:', error);
    return {
      success: false,
      message: 'We could not send the enquiry to the online sheet. Please continue on WhatsApp so your enquiry is not lost.',
      leadData: payload,
      whatsAppRedirectUrl
    };
  }
}
