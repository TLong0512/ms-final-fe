export const isRequired = (value) => {
  return value !== null && value !== undefined && value !== "";
};

export const isValidEmail = (email) => {
  if (!email) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isMinLength = (value, minLength) => {
  if (!value) return true;
  return value.length >= minLength;
};

export const isValidPhone = (phone) => {
  if (!phone) return true;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};
