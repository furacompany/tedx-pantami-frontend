import { format, parseISO } from 'date-fns';

/**
 * Format ISO date string to readable format
 * @param dateString - ISO 8601 date string
 * @param formatStr - Format string (default: "PPP" - e.g., "January 1, 2025")
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, formatStr: string = 'PPP'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    return dateString;
  }
};

/**
 * Format date and time
 * @param dateString - ISO 8601 date string
 * @returns Formatted date and time string
 */
export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, 'PPP p');
};

/**
 * Format date for display in cards
 * @param dateString - ISO 8601 date string
 * @returns Formatted date string (e.g., "Jan 15, 2025")
 */
export const formatCardDate = (dateString: string): string => {
  return formatDate(dateString, 'MMM d, yyyy');
};

