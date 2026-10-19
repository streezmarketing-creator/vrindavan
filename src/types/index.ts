export interface Project {
  id: string;
  name: string;
  category: 'Township' | 'Villas' | 'Service Apartments' | 'Residential Plots';
  categoryLabel: string;
  location: string;
  shortDescription: string;
  overview: string;
  propertyOptions: string[];
  verifiedAmenities: string[];
  statusNote: string;
  reraStatus: string;
  image: string;
  gallery: string[];
  features: string[];
  isFeatured?: boolean;
}

export interface EnquiryFormData {
  fullName: string;
  mobile: string;
  propertyType: string;
  purpose: string;
  budget: string;
  consent: boolean;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    landingUrl?: string;
  };
  submittedAt?: string;
}

export type PropertyCategory = 
  | 'Residential Plots'
  | 'Apartments / Flats'
  | 'Luxury Projects'
  | 'Investment Properties'
  | 'Villas / Independent Houses'
  | 'Other';

export type BudgetRange = 
  | 'Below ₹25 Lakhs'
  | '₹25–50 Lakhs'
  | '₹50 Lakhs–₹1 Crore'
  | '₹1–2 Crore'
  | 'Above ₹2 Crore'
  | 'Not Decided Yet';

export type PurposeType = 
  | 'Self-Use'
  | 'Investment'
  | 'Second Home'
  | 'Exploring Options';
