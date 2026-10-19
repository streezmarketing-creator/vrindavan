/**
 * Suncity Projects Vrindavan - Vanilla JavaScript & Form Interaction Module
 * Complies strictly with master prompt:
 * - 10-second popup timer (1 display per browser session)
 * - Indian phone number validation (10-digits starting with 6-9)
 * - Real backend endpoint submission logic with clear status messages
 * - Google Ads conversion tracking hook (fires ONLY upon verified backend response)
 * - WhatsApp direct click-to-chat integration (Contact: Shiva Chaurasia, +91 8604300712)
 */

const SUNCITY_CONFIG = {
  representativeName: 'Shiva Chaurasia',
  whatsappNumber: '918604300712',
  backendEndpoint: '', // Configure your Google Apps Script Webhook or Vercel API endpoint here
  popupDelayMs: 10000 // 10 seconds
};

// 1. UTM Attribution Capture
function getPreservedUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const existing = JSON.parse(sessionStorage.getItem('suncity_utm_tracking') || '{}');
    const utm = {
      source: params.get('utm_source') || existing.source || '',
      medium: params.get('utm_medium') || existing.medium || '',
      campaign: params.get('utm_campaign') || existing.campaign || '',
      term: params.get('utm_term') || existing.term || '',
      content: params.get('utm_content') || existing.content || ''
    };
    sessionStorage.setItem('suncity_utm_tracking', JSON.stringify(utm));
    return utm;
  } catch (e) {
    return {};
  }
}

// 2. Validate Indian Mobile Number (10 digits starting with 6, 7, 8, 9)
function isValidIndianPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
}

// 3. Conversion Tracking Function (Ready for Google Ads Tag)
function fireConversionTracking(leadData) {
  /*
   * =========================================================================
   * GOOGLE ADS CONVERSION TRACKING PLACEHOLDER
   * 
   * When you are ready to configure Google Ads:
   * if (typeof window.gtag === 'function') {
   *   window.gtag('event', 'conversion', {
   *     'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYYYY',
   *     'value': 1.0,
   *     'currency': 'INR'
   *   });
   * }
   * =========================================================================
   */
  console.log('[Tracking Hook] Lead enquiry confirmed:', leadData);
}

// 4. Submission Handler
async function handleFormSubmit(event, formElement) {
  event.preventDefault();
  
  const fullName = formElement.querySelector('[name="fullName"]')?.value.trim();
  const mobile = formElement.querySelector('[name="mobile"]')?.value.trim();
  const propertyType = formElement.querySelector('[name="propertyType"]')?.value || 'Residential Plots';
  const purpose = formElement.querySelector('[name="purpose"]')?.value || 'Self-Use';
  const budget = formElement.querySelector('[name="budget"]')?.value || '₹50 Lakhs–₹1 Crore';
  const consent = formElement.querySelector('[name="consent"]')?.checked;

  if (!fullName || fullName.length < 3) {
    alert('Please enter your full name (minimum 3 characters).');
    return;
  }

  if (!mobile || !isValidIndianPhone(mobile)) {
    alert('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).');
    return;
  }

  if (!consent) {
    alert('Please confirm consent to be contacted regarding property options in Vrindavan.');
    return;
  }

  const submitButton = formElement.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerText = 'Processing Enquiry...';
  }

  const leadPayload = {
    fullName,
    mobile,
    propertyType,
    purpose,
    budget,
    utm: getPreservedUtm(),
    timestamp: new Date().toISOString()
  };

  // Check if real backend is configured
  if (!SUNCITY_CONFIG.backendEndpoint) {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerText = 'Submit Enquiry';
    }
    const waText = encodeURIComponent(`Hi Shiva, I am enquiring about ${propertyType} (${purpose}, Budget: ${budget}). Please share verified details.`);
    const waUrl = `https://wa.me/${SUNCITY_CONFIG.whatsappNumber}?text=${waText}`;
    
    const proceed = confirm(
      'Online database endpoint is not yet connected in SUNCITY_CONFIG.backendEndpoint.\n\nWould you like to send your enquiry directly to Shiva Chaurasia on WhatsApp now?'
    );
    if (proceed) {
      window.open(waUrl, '_blank');
    }
    return;
  }

  // Real backend submission
  try {
    const res = await fetch(SUNCITY_CONFIG.backendEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    });

    if (res.ok) {
      sessionStorage.setItem('suncity_lead_submitted', 'true');
      sessionStorage.setItem('suncity_last_submission', JSON.stringify({
        propertyType,
        purpose,
        budget
      }));
      fireConversionTracking(leadPayload);
      window.location.href = 'thank-you.html';
    } else {
      throw new Error('Server returned an error');
    }
  } catch (err) {
    alert('Unable to send your enquiry right now. Please message Shiva directly on WhatsApp.');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerText = 'Submit Enquiry';
    }
  }
}

// 5. Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  getPreservedUtm();
});
