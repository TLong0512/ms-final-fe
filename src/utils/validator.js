// #region Validation Rules
/**
 * Hàm tạo rule kiểm tra ngày không được sau ngày hôm nay
 * Sử dụng cho form validation (ví dụ: ngày sinh, ngày cấp CMND)
 * @param {string} message - Thông báo lỗi hiển thị khi xác thực thất bại
 * @returns {Object} Đối tượng rule cho validator
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
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
// #endregion Validation Rules

// #region Error Extraction Utilities
/**
 * Hàm trích xuất thông báo lỗi xác thực từ response backend (HTTP 400)
 * Lấy thông báo lỗi đầu tiên từ object errors trả về từ API
 * @param {Error} error - Đối tượng error từ API request
 * @returns {string|null} Thông báo lỗi đầu tiên hoặc null nếu không có lỗi
 * createdby: Nguyễn Thanh Long - 09.12.2025
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
// #endregion Error Extraction Utilities
