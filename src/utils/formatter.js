// #region Format Functions
/**
 * Hàm định dạng số theo tiêu chuẩn địa phương
 * @param {number} value - Giá trị số cần định dạng
 * @returns {string} Chuỗi số đã được định dạng hoặc chuỗi rỗng nếu null/undefined
 * createdby: pdthien - 15.10.2025
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat().format(value);
};

/**
 * Hàm định dạng ngày tháng theo tiêu chuẩn địa phương
 * @param {string|Date} value - Giá trị ngày cần định dạng
 * @returns {string} Chuỗi ngày đã được định dạng hoặc chuỗi rỗng nếu không hợp lệ
 * createdby: pdthien - 15.10.2025
 */
export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat().format(date);
};

/**
 * Hàm định dạng chuỗi ký tự
 * @param {any} value - Giá trị cần chuyển thành chuỗi
 * @returns {string} Chuỗi ký tự hoặc chuỗi rỗng nếu null/undefined
 * createdby: pdthien - 15.10.2025
 */
export const formatText = (value) => {
  if (value === null || value === undefined) return "";
  return String(value);
};
// #endregion Format Functions

// #region Main Format Handler
/**
 * Hàm chung để xử lý định dạng dữ liệu theo loại được chỉ định
 * @param {any} value - Giá trị cần định dạng
 * @param {string} type - Loại định dạng: 'number', 'date', 'text'
 * @returns {string} Dữ liệu đã được định dạng
 * createdby: pdthien - 15.10.2025
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
// #endregion Main Format Handler
