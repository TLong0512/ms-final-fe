import axios from 'axios';

const baseURL = 'https://localhost:8000';

let api = axios.create({
  baseURL: baseURL,
});

// Xử lý call API gặp lỗi 401 hoặc 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && [401, 403].includes(error.response.status)) {
      // handle error
    }
    return Promise.reject(error);
  },
);

export default api;
