import axios from "axios";
import { guestAPI } from "../constants/API";


const userAxios = axios.create({
    baseURL: guestAPI,
    withCredentials: true,
});


userAxios.interceptors.request.use(
    (config) => {

        const tokens = localStorage.getItem('usertoken');
        if (tokens) {
            config.headers.Authorization = `Bearer ${tokens}`;
        }
        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);


userAxios.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {

        return Promise.reject(error);
    }
);

export default userAxios;