import axios from 'axios';
import { getCookie } from '../../internals/Cookies/getCookie';
import { isTokenExpired } from '../../internals/Cookies/isTokenExpired';
import { refreshAccessToken } from '../authService';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(

  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {

      const accessToken = getCookie('accessToken');

      if (accessToken && !isTokenExpired(accessToken))
        return true;

      else if (accessToken && isTokenExpired(accessToken)) {
        const response = await refreshAccessToken();
        if (response.success)
          return true;
        else
          window.location.href = '/login';

      } 
      
      else
        return false;
      
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;

