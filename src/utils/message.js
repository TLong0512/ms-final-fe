import {
  openMessage,
  messageType,
  messageContent,
} from "@/common/constant/message";

// #region Message Display Functions
/**
 * Hàm hiển thị thông báo lỗi mặc định
 * Thông báo sẽ có tiêu đề "Thông báo" và mô tả "Đã xảy ra lỗi khi đọc dữ liệu"
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
export const showDefaultErrorMessage = () => {
  openMessage.value = true;
  messageContent.title = "Thông báo";
  messageContent.description = "Đã xảy ra lỗi khi đọc dữ liệu";
  messageType.value = "error";
};

/**
 * Hàm hiển thị thông báo thành công mặc định
 * Thông báo sẽ có tiêu đề "Thông báo" và mô tả "Quá trình hoàn tất"
 * @returns {void}
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
export const showDefaultSuccessMessage = () => {
  openMessage.value = true;
  messageContent.title = "Thông báo";
  messageContent.description = "Quá trình hoàn tất";
  messageType.value = "success";
};
// #endregion Message Display Functions
