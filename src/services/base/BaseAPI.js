import api from "../config/APIConfig";

const jsonType = {
  headers: { "Content-Type": "application/json" },
};
export default class BaseAPI {
  constructor() {
    this.controler = null;
  }
  /**
   * Phương thức lấy tất cả dữ liệu
   *
   */
  getAll() {
    return api.get(`${this.controler}`);
  }
  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   */
  paging(payload) {
    return api.get(`${this.controler}/paging`, {
      params: payload,
    });
  }
  /**
   * Hàm thêm dữ liệu
   * @param {*} body
   */
  post(body) {
    return api.post(`${this.controler}`, body, jsonType);
  }
  /**
   * Hàm cập nhật dữ liệu
   * @param {*} id
   * @param {*} body
   */
  update(id, body) {
    return api.put(`${this.controler}/${id}`, body, jsonType);
  }
  /**
   * Hàm xóa bản ghi
   * @param {*} id
   */
  delete(id) {
    return api.delete(`${this.controler}/${id}`);
  }
  /**
   *Hàm xóa mọt loạt bản ghi
   * @param {*} ids
   * @returns
   */
  deleteBatch(ids) {
    return api.delete(`${this.controler}/by-batch`, {
      data: ids,
      ...jsonType,
    });
  }

  /**
   * Hàm xuất dữ liệu
   * @param {*} ids : danh sách id cần xuất excel
   * @returns
   */
  exportListDataToExcel(ids = {}) {
    return api.get(`${this.controler}/export-excel`, {
      params: { ids },
      responseType: "blob",
    });
  }
  /**
   *
   * @returns
   */
  exportAllDataToExcel() {
    return api.get(`${this.controler}/export-excel`, {
      responseType: "blob",
    });
  }
}
