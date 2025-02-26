import { api, otherApi, llmServer } from './axios'
import type { Booking } from '../../types/shared-types';
import axios from 'axios';

// const otherApi = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// })

// const llmServer = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_LLM_API,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// })

export const bookingApiService = {

    verify: async (token: string): Promise<Booking> => {
        const response = await otherApi.get<Booking>(`/booking/auth?token=${token}`);
        return response.data
    },
    parse: async (input: string, organizer: number): Promise<Booking | null> => {
        try {
            const response = await otherApi.post(`/booking/input`, { input, organizer });
            return response.data;

        } catch (error) {
            console.error;
            return null;
        }
    },
    createGoogleCalendarEvent: async (event: Booking): Promise<Booking | null> => {
        try {
            const response = await llmServer.post(`/confirm`, { event });
            return response.data;
        } catch (error) {
            console.error;
            return null;
        }
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