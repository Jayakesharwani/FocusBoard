export function BrandLogoIcon({ className = '' }) {
  return (
    <svg
      className={className}
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      aria-hidden="true"
    >
      <rect width="38" height="38" rx="11" fill="url(#focusboard-logo-grad)" />
      <rect x="9.5" y="9.5" width="7.5" height="7.5" rx="2.4" fill="#FFFFFF" />
      <rect x="21" y="9.5" width="7.5" height="7.5" rx="2.4" fill="#FFFFFF" fillOpacity="0.92" />
      <rect x="9.5" y="21" width="7.5" height="7.5" rx="2.4" fill="#FFFFFF" fillOpacity="0.92" />
      <rect x="21" y="21" width="7.5" height="7.5" rx="2.4" fill="#FFFFFF" />
      <defs>
        <linearGradient id="focusboard-logo-grad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D61FA" />
          <stop offset="1" stopColor="#5649E5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function OverviewGridIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.75" y="2.75" width="5.75" height="5.75" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11.5" y="2.75" width="5.75" height="5.75" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="2.75" y="11.5" width="5.75" height="5.75" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11.5" y="11.5" width="5.75" height="5.75" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function TasksListIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="3.75" cy="5.25" r="1.15" fill="currentColor" />
      <circle cx="3.75" cy="10" r="1.15" fill="currentColor" />
      <circle cx="3.75" cy="14.75" r="1.15" fill="currentColor" />
      <path
        d="M7.25 5.25H16.75M7.25 10H16.75M7.25 14.75H16.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4.25" width="14" height="12.75" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 2.75V5.25M13.5 2.75V5.25M3 8.25H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsTargetIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="6.75" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.25 6.25L8 10L11.75 6.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3.75L5.75 8L10 12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3.75L10.25 8L6 12.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.65" />
      <path d="M10 6.25V10L12.6 11.5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 9.25L7.4 12.65L14 5.75" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8.25" cy="8.25" r="5.5" stroke="currentColor" strokeWidth="1.65" />
      <path d="M12.5 12.5L15.75 15.75" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

export function DotsHorizontalIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5" cy="10" r="1.4" fill="currentColor" />
      <circle cx="10" cy="10" r="1.4" fill="currentColor" />
      <circle cx="15" cy="10" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.25 4.25L11.75 11.75M11.75 4.25L4.25 11.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function EditIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.333 2.667a1.57 1.57 0 0 1 2.222 2.222l-7.5 7.5-2.888.667.666-2.889 7.5-7.5Z" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.667 4.333h10.666M6 4.333V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.333m1.667 0-.556 8.334a1.333 1.333 0 0 1-1.33 1.245H6.219a1.333 1.333 0 0 1-1.33-1.245l-.556-8.334" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4.5V15.5M4.5 10H15.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}
