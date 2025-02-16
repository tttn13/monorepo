'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/userStore'
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from "@auth0/nextjs-auth0"
import Loader from './loader';

export function withRegistrationCheck<P extends object>(
    Component: React.ComponentType<P>
): React.FC<P> {

    return function ProtectedComponent(props: P) {
        const { user, isLoading } = useUser();
        const [loading, setLoading] = useState<Boolean>(false)
        const { isRegistered, setOrganizer, organizer, updateRegistered } = useUserStore();
        const router = useRouter();

        async function getParsedToken(): Promise<DecodedToken | null> {
            try {
                const token = await getAccessToken();
                if (!token) return null;
                return jwtDecode<DecodedToken>(token);
            } catch (error) {
                console.error('Error parsing token:', error);
                return null;
            }
        }

        useEffect(() => {
            async function handleAuth() {
                try {
                    const parsed = await getParsedToken();

                    if (!parsed) {
                        router.push('/login');
                        return;
                    }

                    const register = Boolean(parsed?.registered);
                    const userId = Number(parsed?.organizerId)

                    updateRegistered(register)

                    setOrganizer({
                        name: parsed.organizerName,
                        email: parsed.organizerEmail,
                        photo: parsed.organizerPhoto,
                        authId: parsed.sub,
                        id: userId
                    });

                    if (!register) {
                        router.push("/profile?registered=false");
                        return;
                    }

                } catch (error) {
                    console.error('Error in auth flow:', error);
                    router.push('/login');
                }
            }
            console.log(`register in withAuthcheck is ${isRegistered}`)

            if (isRegistered && organizer?.email) {
                return;
            }

            setLoading(true)
            handleAuth();
            setLoading(false)

        }, [isRegistered, user])

        if (isLoading || loading) {
            return <div className='flex justify-center items-center h-screen'><Loader /></div>;
        }
        return <Component {...props} />;
    };
}

interface DecodedToken {
    registered: boolean;
    sub: string;
    name: string;
    email?: string;
    picture?: string;
    organizerId: Number;
    organizerName: string;
    organizerEmail: string;
    organizerPhoto: string;
}