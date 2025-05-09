import { create } from 'zustand'
import type { User } from '../../types/shared-types';
import { devtools, persist } from 'zustand/middleware'

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
        persist(
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
                localStorage.setItem('isRegistered', JSON.stringify(registered)); 
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
                localStorage.setItem('organizer', JSON.stringify(newUser));
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
                localStorage.removeItem('isRegistered'); 
                localStorage.removeItem('organizer'); // Clear organizer from localStorage
            },
        }),
            {
                name: 'user-storage',
                partialize: (state) => ({
                    organizer: state.organizer,
                    isRegistered: state.isRegistered
                })
            }
    ))
);