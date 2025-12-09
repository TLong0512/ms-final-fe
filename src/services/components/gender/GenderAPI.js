import BaseAPI from "@/services/base/BaseAPI";

/**
 * Lớp GenderAPI kế thừa từ BaseAPI
 * Xử lý tất cả các API request liên quan đến Genders (Giới tính)
 * createdby: Nguyễn Thanh Long - 09.12.2025
 */
class GenderAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/api/v1/Genders";
  }
}

export default new GenderAPI();
