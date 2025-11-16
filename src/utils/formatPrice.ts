/**
 * Format price from kobo to Naira format
 * @param kobo - Price in kobo (e.g., 10000000 = ₦100,000.00)
 * @returns Formatted price string (e.g., "₦100,000.00")
 */
export const formatPrice = (kobo: number): string => {
  const naira = kobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(naira);
};

/**
 * Convert Naira to kobo
 * @param naira - Price in Naira
 * @returns Price in kobo
 */
export const toKobo = (naira: number): number => {
  return Math.round(naira * 100);
};

