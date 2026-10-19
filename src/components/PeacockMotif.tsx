import React from 'react';

interface PeacockMotifProps {
  className?: string;
  size?: number;
}

/**
 * Elegant subtle Peacock Feather inspired vector motif for sacred Vrindavan touch.
 * Incorporates subtle peacock green/teal (#18534F), royal deep blue (#0E3B43), and champagne gold (#C5A880).
 */
export const PeacockMotif: React.FC<PeacockMotifProps> = ({ className = '', size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="peacockEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B3B4B" />
          <stop offset="45%" stopColor="#0F4C47" />
          <stop offset="75%" stopColor="#C5A880" />
          <stop offset="100%" stopColor="#766144" />
        </radialGradient>
        <linearGradient id="stemGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A880" />
          <stop offset="100%" stopColor="#766144" />
        </linearGradient>
      </defs>

      {/* Outer Feather Curves */}
      <path
        d="M50 12 C32 28 26 50 36 74 C42 88 50 94 50 94 C50 94 58 88 64 74 C74 50 68 28 50 12 Z"
        stroke="url(#stemGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Internal Feather Eye */}
      <ellipse
        cx="50"
        cy="48"
        rx="14"
        ry="18"
        fill="url(#peacockEye)"
        stroke="#C5A880"
        strokeWidth="1.2"
      />

      {/* Deep Center Jewel Pupil */}
      <circle cx="50" cy="50" r="6" fill="#0C2530" />
      <circle cx="51.5" cy="48.5" r="1.8" fill="#58C5B4" opacity="0.9" />

      {/* Central spine line */}
      <path
        d="M50 30 L50 96"
        stroke="url(#stemGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
};
