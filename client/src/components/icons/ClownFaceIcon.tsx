import React from 'react';

export const ClownFaceIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M8 9h.01" />
    <path d="M16 9h.01" />
    <path d="M12 13a3 3 0 00-3-3" />
    <path d="M12 13a3 3 0 013-3" />
    <path d="M9 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
    <path d="M12 17v2" />
    <path d="M8 7l-1-2" />
    <path d="M16 7l1-2" />
  </svg>
);
