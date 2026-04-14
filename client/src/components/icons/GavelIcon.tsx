import React from 'react';

export const GavelIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M14 13l8-8-4-4-8 8" />
    <path d="M16 16l6-6" />
    <path d="M8 8l-6 6 4 4 6-6" />
    <path d="M2 22l4-4" />
  </svg>
);
