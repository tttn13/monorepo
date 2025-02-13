import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { userService } from '../../services/api/userService';
import type { User } from '@kora/shared-types';

interface UserState {
    organizer: User;
    isLoading: boolean;
    error: string | null;
    isRegistered: boolean;
    updateRegistered: (registered: boolean) => void;
    setOrganizer: (newUser: User) => void;
    resetStore: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set, get) => ({
            organizer: {
                id: -1,
                name: "",
                email: "",
                photo: "",
                authId: "",
            },
            isLoading: false,
            error: null,
            isRegistered: false,

            updateRegistered: (registered: boolean) => {
                set({ isRegistered: registered })
            },

            setOrganizer: (newUser: User) => {
                set({
                    organizer: {
                        id: newUser.id != -1 ? newUser.id : -1,
                        authId: newUser.authId,
                        email: newUser.email,
                        name: newUser.name,
                        photo: newUser.photo
                    }
                })
            },

            resetStore: () => {
                set({
                    organizer: {
                        id: -1,
                        name: "",
                        email: "",
                        photo: "",
                        authId: "",
                    },
                    isLoading: false,
                    error: null,
                    isRegistered: false,
                });
                localStorage.removeItem('user-storage');
            },
        }),
        { name: 'user-storage' }
    )
);