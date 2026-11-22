const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Formats an ISO calendar date string ('YYYY-MM-DD') as 'Nov 22'
 * without timezone offset drift.
 */
export function formatShortDueDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return 'No date';
  }

  const trimmed = dateStr.trim();
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const monthIndex = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    if (monthIndex >= 0 && monthIndex < 12 && day >= 1 && day <= 31) {
      return `${SHORT_MONTHS[monthIndex]} ${day}`;
    }
  }

  return trimmed;
}
