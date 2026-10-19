import React from 'react';

interface SuncityLogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'white' | 'dark';
  height?: number | string;
}

/** Uses the exact Suncity Projects logo image supplied by the user. */
export const SuncityLogo: React.FC<SuncityLogoProps> = ({
  className = '',
  height = 44
}) => (
  <img
    src="/suncity-logo.png"
    alt="Suncity Projects"
    className={`inline-block object-contain select-none ${className}`}
    style={{ height, width: 'auto', maxWidth: 'min(58vw, 360px)' }}
    draggable={false}
  />
);
