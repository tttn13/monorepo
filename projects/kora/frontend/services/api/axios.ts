import axios from 'axios';
import { getAccessToken} from "@auth0/nextjs-auth0"

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.request.use(async (config) => {
    const token = await getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;  
    }
    return config;
});

export const publicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const llmServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LLM_API,
    headers: {
        'Content-Type': 'application/json',
    }
})