// Custom SVG Icons for TopJester - Static versions for SSR compatibility

export const CrownIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crownGradientIcon" x1="2" y1="17" x2="22" y2="5">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    <path
      d="M2 17L4 7L8 11L12 4L16 11L20 7L22 17H2Z"
      fill="url(#crownGradientIcon)"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="4" r="2" fill="#7c3aed" />
    <circle cx="4" cy="7" r="1.5" fill="#dc2626" />
    <circle cx="20" cy="7" r="1.5" fill="#16a34a" />
  </svg>
);

export const JesterHatIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4C12 4 8 8 8 12C8 14 9 16 12 16C15 16 16 14 16 12C16 8 12 4 12 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="6" cy="14" r="2" fill="currentColor" />
    <circle cx="18" cy="14" r="2" fill="currentColor" />
    <path d="M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="12" cy="20" rx="4" ry="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const TheaterIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 20V12C6 8 8 6 12 6C16 6 18 8 18 12V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M2 12C2 12 4 8 12 8C20 8 22 12 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="4" r="2" fill="currentColor" />
  </svg>
);

export const CourtIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
    <path d="M7 10V7C7 5 8 4 10 4H14C16 4 17 5 17 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="15" r="2" fill="currentColor" />
    <path d="M8 20L8 17M16 20L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ScrollIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4H18C19 4 20 5 20 6V18C20 19 19 20 18 20H6C5 20 4 19 4 18V6C4 5 5 4 6 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 8H16M8 12H16M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 4V2M6 4V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9H4V5H6M18 9H20V5H18M6 9C6 13 8 16 12 16C16 16 18 13 18 9M6 9H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MaskIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="10" rx="8" ry="6" stroke="currentColor" strokeWidth="2" />
    <path d="M8 10C8 10 9 12 12 12C15 12 16 10 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="9" r="1" fill="currentColor" />
    <circle cx="16" cy="9" r="1" fill="currentColor" />
    <path d="M4 10C4 10 2 12 4 14C6 16 8 14 8 14M20 10C20 10 22 12 20 14C18 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Additional Icons
export const FireIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.5 14.5C8.5 14.5 9 13 10 12C11 11 11.5 9.5 11.5 8.5C11.5 7.5 11 6 11 6C11 6 13 7 14 9C15 11 14.5 13 14.5 13C14.5 13 16 12 17 10C18 8 17.5 6 17.5 6C17.5 6 20 8 20 12C20 16 17 19 12 19C7 19 4 16 4 12C4 8 6 6 6 6C6 6 6.5 9 7.5 10.5C8.5 12 8.5 14.5 8.5 14.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

export const LaughIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 13C8 13 9 15 12 15C15 15 16 13 16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    <circle cx="15" cy="9" r="1.5" fill="currentColor" />
    <path d="M7 17C7 17 9 19 12 19C15 19 17 17 17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TargetIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 17V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 17V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 17V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UsersIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Animated Logo Component - Static version
export const AnimatedLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <svg
      className={sizes[size]}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown base */}
      <path
        d="M2 17L5 8L9 12L12 5L15 12L19 8L22 17H2Z"
        fill="url(#crownGradient)"
        stroke="#fbbf24"
        strokeWidth="1.5"
      />
      {/* Jester bells */}
      <circle cx="5" cy="8" r="2" fill="#dc2626" />
      <circle cx="19" cy="8" r="2" fill="#16a34a" />
      <circle cx="12" cy="5" r="2" fill="#6b21a8" />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="crownGradient" x1="2" y1="17" x2="22" y2="5">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  );
};
