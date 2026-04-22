export const normalizeDigits = (value: string, maxLength = 10) => value.replace(/\D/g, '').slice(0, maxLength);

export const normalizePhone = (value: string) => normalizeDigits(value, 10);

export const normalizeText = (value: string) =>
  value
    .replace(/\s+/g, ' ')
    .replace(/^\s+/, '');
