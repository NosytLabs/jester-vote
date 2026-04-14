import React from 'react';

export const ScrollIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M8 21h12a2 2 0 002-2v-2H8v2a2 2 0 002 2z" />
    <path d="M6 19V3a2 2 0 012-2h12a2 2 0 012 2v14" />
    <path d="M10 6h6" />
    <path d="M10 10h6" />
    <path d="M10 14h6" />
  </svg>
);
