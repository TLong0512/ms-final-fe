import { ref } from "vue";

/**
 * Lưu lại state của modal employee khi bật
 */
export const openEmployeeModal = ref(false);

/**
 * Modal hiển thị xác nhận xóa bảng ghi
 */
export const openConfirmDeleteModal = ref(false);
/**
 * Modal hiển thị xác nhật thoát 1 form làm việc
 */
export const openConfirmQuitModal = ref(false);
/**
 * Modal hiển thị lỗi
 */
export const openErrorModal = ref(false);
/**
 * Modal hiển thị xác nhận xuất file
 */
export const openConfirmExportExcelFile = ref(false);
