import BaseAPI from "@/services/base/BaseAPI";
class GenderAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/api/v1/Genders";
  }
}

export default new GenderAPI();
