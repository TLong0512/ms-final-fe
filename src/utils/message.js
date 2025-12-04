import {
  openMessage,
  messageType,
  messageContent,
} from "@/common/constant/message";
/**
 * Hàm handle show error message
 */
export const showDefaultErrorMessage = () => {
  openMessage.value = true;
  messageContent.title = "Thông báo";
  messageContent.description = "Đã xảy ra lỗi khi đọc dữ liệu";
  messageType.value = "error";
};
/**
 * Hàm handle show success message
 */
export const showDefaultSuccessMessage = () => {
  openMessage.value = true;
  messageContent.title = "Thông báo";
  messageContent.description = "Quá trình hoàn tất";
  messageType.value = "success";
};
