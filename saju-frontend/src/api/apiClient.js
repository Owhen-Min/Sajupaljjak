import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://i12a408.p.ssafy.io/',
  // baseURL: 'http://localhost:8080/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('CORS 또는 네트워크 에러:', error);
      alert('서버 연결에 실패했습니다. 네트워크 설정을 확인해주세요.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
