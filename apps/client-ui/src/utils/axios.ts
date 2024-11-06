import Axios, { AxiosResponse } from 'axios';
import { notifications } from '@mantine/notifications';
import { ErrorResponseT } from '@/types/common';

// import customNotification from '@/notification';

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
    } else {
      delete axios.defaults.headers.Authorization;
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
      window.location.href = '/auth/login';
    }
    return response;
  },
  (error: {
    response: {
      data: ErrorResponseT;
      status: number;
    };
  }) => {
    console.log(error.response);
    notifications.show({
      message: error.response.data.message,
      color: 'red',
      title: 'Error',
    });
    if (error.response.status === 401) {
      window.location.href = '/auth/login';
    }
    // if (error.response.status === 500) {
    //   window.location.href = '/auth/login';
    // }
    // customNotification('error', {
    //   title: 'Error',
    //   message: error.response.data.error_message || '',
    // });
    return Promise.reject(error);
  }
);

export default axios;
