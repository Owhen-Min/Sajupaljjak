import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://i12a408.p.ssafy.io/',
  timeout: 5000,
});

export const get = (url) => apiClient.get(url);
export const post = (url, data) => apiClient.post(url, data);
export const put = (url, data) => apiClient.put(url, data);
export const del = (url) => apiClient.delete(url);