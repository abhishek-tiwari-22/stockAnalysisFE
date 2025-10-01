import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://ec2-13-204-203-144.ap-south-1.compute.amazonaws.com:8081/api'
  : 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            alert('Session expired. Please login again.');
        } else if (error.response?.status >= 500) {
            alert('Server error. Please try again later.');
        }
        return Promise.reject(error);
    }
);

export default api;