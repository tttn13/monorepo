import axios from 'axios';
import { getAccessToken} from "@auth0/nextjs-auth0"
import { auth0 } from "@/lib/auth0"
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from '../../app/store/userStore'; 

export const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.request.use(async (config) => {
    const token = await getAccessToken()
    config.headers.Authorization = `Bearer ${token}`;  
    return config;
});