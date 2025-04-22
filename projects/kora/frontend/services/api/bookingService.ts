import { api, publicApi, llmServer } from './axios'
import type { Booking } from '../../types/shared-types';

export const bookingApiService = {

    verify: async (token: string): Promise<Booking> => {
        const response = await publicApi.get<Booking>(`/booking/auth?token=${token}`);
        return response.data
    },
    parse: async (input: string, organizer: number): Promise<Booking | null> => {
        try {
            const response = await publicApi.post(`/booking/parse-input`, { input, organizer });
            return response.data;

        } catch (error) {
            console.error;
            return null;
        }
    },
    createGoogleCalendarEvent: async (event: Booking): Promise<Booking | null> => {
        try {
            const response = await api.get(`/booking/google_token/${event.userId}`);
            // const response = await llmServer.post(`/confirm`, { event });
            console.log(`response for ggle is ${response.data}`)
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
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error(`Failed to fetch bookings: ${response.status} - ${response.statusText}`);
            return [];
        }
    },
    update: async (event: Booking): Promise<Booking> => {
        const response = await publicApi.put<Booking>(`/booking/}`, event);
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