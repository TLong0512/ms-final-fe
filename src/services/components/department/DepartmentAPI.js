import BaseAPI from "@/services/base/BaseAPI";

/**
 * Lớp DepartmentAPI kế thừa từ BaseAPI
 * Xử lý tất cả các API request liên quan đến Departments (Đơn vị)
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
class DepartmentAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "api/v1/Departments";
  }
}

export default new DepartmentAPI();
