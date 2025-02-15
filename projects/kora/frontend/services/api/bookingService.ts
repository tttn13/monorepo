import { api } from './axios'
import type { Booking } from '../../types/shared-types';
import axios from 'axios';

const otherApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const bookingService = {
    verify: async (token: string): Promise<Booking> => {
        console.log(`verifying, api url is ${process.env.NEXT_PUBLIC_API_URL}`)
        const response = await otherApi.get<Booking>(`/booking/auth?token=${token}`);
        // const response = await publicApi.get<Booking>(`/booking/verify?token=${token}`);
        return response.data
    },
    get: async (id: string): Promise<Booking> => { 
        const response = await api.get<Booking>(`/booking/${id}`);
        return response.data
    },
    getAll: async (userId: number): Promise<Booking[]> => {
        const response = await api.get<Booking[]>(`/booking/user/${userId}`);
        return response.data
    },
    update: async (event: Booking): Promise<Booking> => {
        const response = await otherApi.put<Booking>(`/booking/}`, event);
        return response.data
    },
    create: async (event: Omit<Booking, 'id'>): Promise<Booking> => {
        const response = await api.post<Booking>(`/booking/`, event);
        return response.data
    },
    delete: async (id: string): Promise<Booking> => {
        const response = await api.delete<Booking>(`/booking/${id}}`);
        return response.data
    },
}