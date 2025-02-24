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
        const response = await otherApi.get<Booking>(`/booking/auth?token=${token}`);
        return response.data
    },
    parse: async (input: string): Promise<ParsedEvent | null> => {
        
        const aiApi = axios.create({
            baseURL: "http://127.0.0.1:3004/api",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        try {
            const response = await aiApi.get<ParsedEvent>(`/booking/ai?input=${encodeURIComponent(input)}`);
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

interface ParsedEvent {
    title: string;
    date: Date;
    guest: string;
}