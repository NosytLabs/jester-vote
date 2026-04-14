import React from 'react';

export const JesterHatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3L2 12h20L12 3z" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M6 14v4" />
    <path d="M18 14v4" />
    <path d="M12 21v-9" />
    <circle cx="12" cy="9" r="1" />
  </svg>
);
