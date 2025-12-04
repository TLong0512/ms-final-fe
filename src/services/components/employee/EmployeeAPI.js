import BaseAPI from "@/services/base/BaseAPI";
import api from "@/services/config/APIConfig";
class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/api/v1/Employees";
  }

  /**
   * Hàm search theo điều kiện
   * @param {*} payload
   * @returns
   */
  search(payload) {
    return api.get(`${this.controler}/filter`, { params: payload });
  }
  generateEmplCode() {
    return api.get(`${this.controler}/new-employee-code`);
  }
  getEmplById(id) {
    return api.get(`${this.controler}/${id}`);
  }
}

export default new EmployeeAPI();
