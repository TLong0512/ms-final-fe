export const notFutureDate = (message) => ({
  validator(_, value) {
    if (!value) return Promise.resolve();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = value.toDate ? value.toDate() : new Date(value);

    if (selectedDate > today) {
      return Promise.reject(new Error(message));
    }

    return Promise.resolve();
  },
});

/**
 * Hàm trả về mô tả lỗi từ backend khi xác thực input của user
 * @param {*} error
 * @returns
 */
export function extractValidationError(error) {
  const response = error?.response;

  if (!response || response.status !== 400) return null;

  const errors = response.data?.errors;
  if (!errors || typeof errors !== "object") return null;

  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return null;

  const messages = errors[firstKey];
  if (!Array.isArray(messages) || messages.length === 0) return null;

  return messages[0];
}
