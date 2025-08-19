import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // базовый URL твоего API
  timeout: 10000, // время ожидания (мс)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Перехватчик запросов (например, добавить токен авторизации)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // или из Redux / Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик ответов (например, обработка ошибок)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // обработка неавторизованного
      console.error('Неавторизован! Надо перелогиниться.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;