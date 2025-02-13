import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://i12a408.p.ssafy.io/',
  // baseURL: 'http://localhost:8080/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    const memberId = localStorage.getItem("memberId");
    if (memberId) {
      config.params = config.params || {};
      config.params.memberId = memberId;
    }
    return config ;
  },
  
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
