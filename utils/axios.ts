import axios, { AxiosRequestConfig } from 'axios'
import setupInterceptorsTo from './axios-interceptor'
interface ConfigType {
    ApiUrl: string
}

const config: ConfigType = {
    ApiUrl: process.env.API_SERVER || 'https://6u26pb8q2e.execute-api.us-east-1.amazonaws.com',
}

const instance = axios.create({
    baseURL: config.ApiUrl,
    headers: {
        'Content-type': 'application/json',
    },
});

export const removeAuthorization = () => {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
        if (config.headers) {
            config.headers['Authorization'] = null;
        }
        return config;
    });
}

export const setAuthorization = () => {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
        if (typeof window !== 'undefined' && config.headers) {
            const token = localStorage.getItem('auth-token-pettik');
            if (token) {
                config.headers['Authorization'] = token;
            }
        }
        return config;
    });

}

// Set the AUTH token for any request
setAuthorization();

export default setupInterceptorsTo(instance)