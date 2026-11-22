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

 
export function formatShortDueDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return 'No date';
  }

  const trimmed = dateStr.trim();
  if (!trimmed) {
    return 'No date';
  }

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (!isoMatch) {
    return 'No date';
  }

  const year = Number(isoMatch[1]);
  const monthIndex = Number(isoMatch[2]) - 1;
  const day = Number(isoMatch[3]);

  const checkDate = new Date(Date.UTC(year, monthIndex, day));
  const isRealCalendarDate =
    checkDate.getUTCFullYear() === year &&
    checkDate.getUTCMonth() === monthIndex &&
    checkDate.getUTCDate() === day;

  if (!isRealCalendarDate) {
    return 'No date';
  }

  return `${SHORT_MONTHS[monthIndex]} ${day}`;
}
