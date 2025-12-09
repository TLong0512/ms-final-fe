import BaseAPI from "@/services/base/BaseAPI";
import api from "@/services/config/APIConfig";

/**
 * Lớp EmployeeAPI kế thừa từ BaseAPI
 * Xử lý tất cả các API request liên quan đến Employees (Nhân viên)
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/api/v1/Employees";
  }

  // #region Extended Read Operations
  /**
   * Hàm tìm kiếm nhân viên theo điều kiện lọc
   * @param {Object} payload - Dữ liệu lọc (data, page, pageSize, ...)
   * @returns {Promise} Promise chứa danh sách nhân viên tìm được
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  search(payload) {
    return api.get(`${this.controler}/filter`, { params: payload });
  }

  /**
   * Hàm lấy thông tin chi tiết nhân viên theo ID
   * @param {string|number} id - ID của nhân viên
   * @returns {Promise} Promise chứa thông tin nhân viên
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  getEmplById(id) {
    return api.get(`${this.controler}/${id}`);
  }
  // #endregion Extended Read Operations

  // #region Code Generation
  /**
   * Hàm lấy mã nhân viên mới (tự động tạo)
   * @returns {Promise} Promise chứa mã nhân viên mới được tạo
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  generateEmplCode() {
    return api.get(`${this.controler}/new-employee-code`);
  }
  // #endregion Code Generation
}

export default new EmployeeAPI();
