'use client'

import { useEffect, useState } from 'react';
import ConfirmationForm from '../components/confirmed-form';
import { useBookingStore } from '../store/bookingStore'
import { useUserStore } from '../store/userStore'
import { useRouter } from 'next/navigation';

function Confirmation() {
    const [isMounted, setIsMounted] = useState(false);
    const { organizer } = useUserStore();
    const bookDetails = useBookingStore((state) => state.formData);
    const duration = useBookingStore((state) => state.duration);
    const eventDate = useBookingStore((state) => state.timeSlot);
    const router = useRouter();

    useEffect(() => {
        if (bookDetails.userId != 0) {
            setIsMounted(true);
        } else {
            router.push('/schedule');
        }
      
    }, [bookDetails]);

    if (!isMounted) {
        return <div className='justify-self-center'><span className="loading loading-bars loading-lg "></span></div>;
    }

    if (eventDate == null) {
        return (
            <div className='justify-self-center'>
                <span className="loading loading-ring loading-lg"></span>
                <p>Loading booking details...</p>
            </div>)
    } else {
        return (
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">Confirmation</h1>
                    </div>
                </header>
                <main>
                    <div className="p-6 rounded-lg">
                        <ConfirmationForm
                            eventDate={bookDetails.startTime}
                            organizer={organizer}
                            duration={duration}
                            email={bookDetails.guestEmail}
                            name={bookDetails.guestName} />
                    </div></main>
            </div>
        )
    }
}
export default (Confirmation);
