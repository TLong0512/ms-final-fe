import axios from "axios";

// #region Configuration
/**
 * Base URL của API server
 */
const baseURL = "https://localhost:8000";

/**
 * Tạo instance axios với cấu hình base URL
 */
let api = axios.create({
  baseURL: baseURL,
});
// #endregion Configuration

// #region Interceptors
/**
 * Cấu hình response interceptor
 * Xử lý lỗi 401 (Unauthorized) và 403 (Forbidden)
 * - 401: Token hết hạn hoặc không hợp lệ
 * - 403: Không có quyền truy cập tài nguyên
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && [401, 403].includes(error.response.status)) {
      // TODO: Handle authentication/authorization errors
      // Có thể redirect đến trang login hoặc refresh token
    }
    return Promise.reject(error);
  }
);
// #endregion Interceptors

export default api;
