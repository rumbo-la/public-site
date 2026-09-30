export const rgxAlphaNum = (value: string): boolean => {
  const alphaNumRegex = /^[a-zA-Z0-9]*$/;
  return alphaNumRegex.test(value);
};

export const rgxMaxLength = (max: number) => {
  return (value: string): boolean => value.length <= max;
};

export const rgxMinLength = (min: number) => {
  return (value: string): boolean => value.length >= min;
};

export const rgxNumeric = (value: string): boolean => {
  const numericRegex = /^[0-9]*$/;
  return numericRegex.test(value);
};

export const rgxRequired = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0;
};

export const rgxEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const rgxPassword = (value: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return passwordRegex.test(value);
};

export const rgxLinkedin = (value: string): boolean => {
  const linkedinRegex = /^((www\.)?linkedin\.com\/(in|pub|profile|company)\/[a-zA-Z0-9_-]+\/?)$/;
  return linkedinRegex.test(value);
}