import axios from 'axios';
import { getCookie } from '../../internals/Cookies/getCookie';

const axiosFormInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true, 
});


axiosFormInstance.interceptors.request.use(
  (config) => {
    const token =getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosFormInstance;