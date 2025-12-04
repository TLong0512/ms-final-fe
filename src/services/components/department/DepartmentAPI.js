import BaseAPI from "@/services/base/BaseAPI";
class DepartmentAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "api/v1/Departments";
  }
}
export default new DepartmentAPI();
