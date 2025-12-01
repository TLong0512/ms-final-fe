import api from '@/services/config/APIConfig';
import BaseAPI from '@/services/base/BaseAPI';

class UserAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = '/api/Candidate';
  }
}

export default new UserAPI();
