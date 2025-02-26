import { api,publicApi } from './axios'
import type { User } from '../../types/shared-types';
import axios from 'axios';

export const userApiService = {
    verify: async (authId: string): Promise<User> => {
        const response = await publicApi.get<User>(`/user/auth/${authId}`);
        return response.data
    },

    get: async (id: number): Promise<User> => {
        const response = await publicApi.get<User>(`/user/${id}`);
        return response.data
    },
    update: async (userData: Omit<User, 'id'>): Promise<User> => {
        const response = await api.put<User>(`/user/`, userData);
        return response.data
    },
    create: async (userData: User): Promise<User> => {
        const response = await api.post<User>(`/user/`, userData);
        return response.data
    },

    upload: async (file: File, presignedUrl: string): Promise<void> => {
        const response = await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });
        return response.data;
    },

    getPresignedUrl: async (): Promise<PresignedUrlResponse> => {
        try {
            const response = await api.get<PresignedUrlResponse>('/user/presign');
            return response.data;
        } catch (error) {
            console.error('Error getting presigned URL:', error);
            throw error;
        }
    },
}

interface PresignedUrlResponse {
    url: string;
    publicUrl: string;
    fileName: string;
}