import React from 'react';

export const ScalesIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 2v20" />
    <path d="M2 22h20" />
    <path d="M5 2l-3 9h6L5 2z" />
    <path d="M19 2l-3 9h6L19 2z" />
  </svg>
);
