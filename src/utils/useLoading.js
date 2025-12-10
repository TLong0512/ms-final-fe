import { ref } from "vue";

/**
 * Global loading state store
 * Sử dụng ref để lưu trữ trạng thái loading toàn cục
 * createdby: Nguyễn Thanh Long - 10.12.2025
 */
const isLoading = ref(false);

/**
 * Composable hook để quản lý trạng thái loading
 * @returns {Object} Object chứa isLoading state và các hàm điều khiển
 * createdby: Nguyễn Thanh Long - 10.12.2025
 */
export const useLoading = () => {
  /**
   * Bật loading spinner
   */
  const startLoading = () => {
    isLoading.value = true;
  };

  /**
   * Tắt loading spinner
   */
  const stopLoading = () => {
    isLoading.value = false;
  };

  /**
   * Thực hiện một async task với loading
   * @param {Function} asyncTask - Hàm async cần thực hiện
   * @returns {Promise} Promise từ asyncTask
   * createdby: Nguyễn Thanh Long - 10.12.2025
   */
  const withLoading = async (asyncTask) => {
    try {
      startLoading();
      const result = await asyncTask();
      return result;
    } finally {
      stopLoading();
    }
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
};
