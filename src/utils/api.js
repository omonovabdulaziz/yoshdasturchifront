import axios from 'axios';

export const BASE_URL = "https://api.yoshdasturchi.uz/api/v1/"

const api = axios.create({
    baseURL: 'https://api.yoshdasturchi.uz/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getCookie = (key) => {
    const cookieValue = document.cookie.match(
        `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
};

api.interceptors.request.use(
    (config) => {
        const token = getCookie("token");;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;

export const  API = {
    ////////////////////  POST
    login: (data) => api.post("/",data)

    ////////////////////  GET

    ////////////////////  PUT


    ////////////////////  DELETE
}



