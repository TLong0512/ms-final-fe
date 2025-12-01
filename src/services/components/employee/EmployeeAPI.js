import BaseAPI from "@/services/base/BaseAPI";
import api from "@/services/config/APIConfig";
class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/api/v1/Employees";
  }
}

export default new EmployeeAPI();
