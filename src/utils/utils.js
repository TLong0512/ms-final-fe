import dayjs from "dayjs";

/**
 * Hàm convert dữ liệu từ date picker về cho api
 * @param {} dateString
 * @returns
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
 * Chuyển chuỗi "YYYY-MM-DD" thành dayjs object dùng cho a-date-picker
 * @param {string} dateStr - ví dụ "2025-05-02"
 * @returns {dayjs.Dayjs|null} dayjs object hoặc null nếu không hợp lệ
 */
export function parseDateForDatePicker(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;

  const d = dayjs(dateStr, "YYYY-MM-DD", true); // strict parsing
  return d.isValid() ? d : null;
}
