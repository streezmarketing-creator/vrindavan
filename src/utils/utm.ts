export interface UtmParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  landingUrl?: string;
}

const STORAGE_KEY = 'suncity_utm_tracking';

export function getAndPreserveUtmParams(): UtmParameters {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingStored = sessionStorage.getItem(STORAGE_KEY);
    const stored: UtmParameters = existingStored ? JSON.parse(existingStored) : {};

    const utmSource = urlParams.get('utm_source') || stored.source || '';
    const utmMedium = urlParams.get('utm_medium') || stored.medium || '';
    const utmCampaign = urlParams.get('utm_campaign') || stored.campaign || '';
    const utmTerm = urlParams.get('utm_term') || stored.term || '';
    const utmContent = urlParams.get('utm_content') || stored.content || '';
    const landingUrl = stored.landingUrl || window.location.href;

    const result: UtmParameters = {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      term: utmTerm,
      content: utmContent,
      landingUrl
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    return result;
  } catch {
    return {};
  }
}
