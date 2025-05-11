import axios from 'axios';

import { clearAuthToken, getAuthToken } from '@/utils/helpers';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
    (config) => {
        // Authorization header
        const token = getAuthToken();

        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        // 處理請求錯誤
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 捕捉 401 錯誤
        if (error.response && error.response.status === 401) {
            clearAuthToken();
            window.location.href = '/#/login';
            return Promise.reject(error);
        }
        // 其他錯誤
        return Promise.reject(error);
    }
);