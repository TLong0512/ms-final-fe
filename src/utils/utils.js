import dayjs from "dayjs";

// #region Date Conversion Utilities
/**
 * Hàm chuyển đổi ngày từ định dạng date picker thành chuỗi "YYYY-MM-DD" cho API
 * @param {Date|string} dateString - Giá trị ngày từ date picker
 * @returns {string} Chuỗi ngày theo định dạng "YYYY-MM-DD" hoặc chuỗi rỗng nếu không hợp lệ
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
export function convertToLocalDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return `${y}-${m}-${d}`;
}

/**
 * Hàm chuyển đổi chuỗi ngày "YYYY-MM-DD" thành dayjs object cho date picker
 * @param {string} dateStr - Chuỗi ngày theo định dạng "YYYY-MM-DD" (ví dụ: "2025-05-02")
 * @returns {dayjs.Dayjs|null} Đối tượng dayjs hoặc null nếu không hợp lệ
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
export function parseDateForDatePicker(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;

  const d = dayjs(dateStr, "YYYY-MM-DD", true); // strict parsing
  return d.isValid() ? d : null;
}
// #endregion Date Conversion Utilities
