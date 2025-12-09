import api from "../config/APIConfig";

// #region Configuration
const jsonType = {
  headers: { "Content-Type": "application/json" },
};
// #endregion Configuration

export default class BaseAPI {
  constructor() {
    this.controler = null;
  }

  // #region CRUD Operations - Read
  /**
   * Phương thức lấy tất cả dữ liệu từ API
   * @returns {Promise} Promise chứa dữ liệu trả về từ API
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  getAll() {
    return api.get(`${this.controler}`);
  }

  /**
   * Hàm lấy dữ liệu với phân trang từ API
   * @param {Object} payload - Dữ liệu phân trang (page, pageSize, ...)
   * @returns {Promise} Promise chứa dữ liệu phân trang trả về từ API
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  paging(payload) {
    return api.get(`${this.controler}/paging`, {
      params: payload,
    });
  }
  // #endregion CRUD Operations - Read

  // #region CRUD Operations - Create
  /**
   * Hàm thêm mới dữ liệu vào API
   * @param {Object} body - Dữ liệu cần thêm mới
   * @returns {Promise} Promise chứa response từ API
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  post(body) {
    return api.post(`${this.controler}`, body, jsonType);
  }
  // #endregion CRUD Operations - Create

  // #region CRUD Operations - Update
  /**
   * Hàm cập nhật dữ liệu trên API
   * @param {string|number} id - ID của bản ghi cần cập nhật
   * @param {Object} body - Dữ liệu cập nhật
   * @returns {Promise} Promise chứa response từ API
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  update(id, body) {
    return api.put(`${this.controler}/${id}`, body, jsonType);
  }
  // #endregion CRUD Operations - Update

  // #region CRUD Operations - Delete
  /**
   * Hàm xóa một bản ghi từ API
   * @param {string|number} id - ID của bản ghi cần xóa
   * @returns {Promise} Promise chứa response từ API
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  delete(id) {
    return api.delete(`${this.controler}/${id}`)
  }

  /**
   * Hàm xóa nhiều bản ghi cùng lúc từ API (xóa hàng loạt)
   * @param {Array} ids - Mảng ID của các bản ghi cần xóa
   * @returns {Promise} Promise chứa response từ API
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  deleteBatch(ids) {
    return api.delete(`${this.controler}/by-batch`, {
      data: ids,
      ...jsonType,
    });
  }
  // #endregion CRUD Operations - Delete

  // #region Export Operations
  /**
   * Hàm xuất dữ liệu ra file Excel
   * @param {Array} columns - Danh sách các cột cần xuất
   * @returns {Promise} Promise chứa dữ liệu file Excel (arraybuffer)
   * createdby: Nguyễn Thanh Long - 09.12.2025
   */
  exportData(columns) {
    return api.post(
      `${this.controler}/export-excel`,
      { columns },
      { responseType: "arraybuffer" }
    );
  }
  // #endregion Export Operations
}
