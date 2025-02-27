import Axios, { AxiosResponse } from 'axios';
import customNotification from '@/shared/notifications';

const baseURL = `${import.meta.env.VITE_BASE_URL}`;

const axios = Axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
axios.interceptors.request.use(
  (config) => {
    // Read token for anywhere, in this case directly from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.table([response.data, response.request.responseURL]);
    /// do some notifications
    if (response.status === 401) {
      // window.location.href = '/auth/login';
    }
    return response;
  },
  (error: {
    response: {
      status: number;
      data: { error: string; message: string; statusCode: number };
    };
  }) => {
    if (error.response.status === 401) {
      // window.location.href = '/auth/login';
    }
    if (error.response.status === 500) {
      // window.location.href = '/auth/login';
    }
    customNotification('error', {
      title: 'Error',
      message: error.response.data.message || '',
    });
    // console.log(error.response.data);
    // toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default axios;
