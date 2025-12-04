/**
 * Hàm chung handle format
 * @param value giá trị cần format
 * @param type loại áp dụng
 */
export const handleFormat = (value, type) => {
  switch (type) {
    case "number":
      return formatNumber(value);
    case "date":
      return formatDate(value);
    case "text":
      return formatText(value);
    default:
      return formatText(value);
  }
};
/**
 * Hàm định dạng số
 * @param {*} value
 * @returns
 * createdby: pdthien - 15.10.2025
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat().format(value);
};

/**
 * Hàm định dạng ngày tháng
 * @param {*} value
 * @returns
 * createdby: pdthien - 15.10.2025
 */
export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat().format(date);
};

/**
 * Hàm định dạng chuỗi
 * @param {*} value
 * @returns
 * createdby: pdthien - 15.10.2025
 */
export const formatText = (value) => {
  if (value === null || value === undefined) return "";
  return String(value);
};
