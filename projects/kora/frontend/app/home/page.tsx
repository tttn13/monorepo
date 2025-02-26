'use client'
import Loader from '../components/loader'
import MainContent from '../components/main'
import Menu from '../components/menu'
import Topbar from '../components/topbar'
import { withRegistrationCheck } from '../components/withRegistrationCheck'
import { useUserStore } from '../store/userStore'
import { useBookingStore } from '../store/bookingStore'
import React, { useState, useEffect } from 'react';
import { bookingApiService } from '../../services/api/bookingService'
import { useRouter } from 'next/navigation'
import { timeService } from '../../services/utils/timeService'

function HomePage() {
    const { organizer } = useUserStore();
    const [isMounted, setIsMounted] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [promptInput, setPromptInput] = useState(false);
    const setBookDetails = useBookingStore((state) => state.updateFormData);
    const setDuration = useBookingStore((state) => state.setDuration);
    const setTimeSlot = useBookingStore((state) => state.setTimeSlot);
    const { resetStore: resetBookState } = useBookingStore();

    const router = useRouter();

    const handleAddEvent = async () => {

        resetBookState();

        setIsLoading(true)

        const today = timeService.getTodayDate();
        const timezone = timeService.getLocalTimezoneName();
        
        const userInput = ` ${input},today is ${today.toString()}, timezone is ${timezone}`;
       
        const parsedEvent = await bookingApiService.parse(userInput, organizer.id);

        if (!parsedEvent) {
            setInput("");
            setIsLoading(false)
            window.alert("Unable to reach the LLM server currently");
            return;
            
        } else {

            setBookDetails({
                id: parsedEvent.id,
                userId: organizer.id,
                guestEmail: parsedEvent.guestEmail || "",
                endTime: parsedEvent.endTime,
                startTime: parsedEvent.startTime,
                guestName: parsedEvent.guestName || "",
                guestNotes: parsedEvent.guestNotes || "",
                timeZone: parsedEvent.timeZone
            })
            
            if (parsedEvent.startTime && parsedEvent.endTime) {
                const mins = timeService.getDurationInMins(parsedEvent?.endTime, parsedEvent?.startTime)
                setDuration(mins)
            }
            
            const timeSlot = timeService.getTimeOnly(parsedEvent.startTime)

            setTimeSlot(timeSlot)
        }

        setInput("");

        router.push('/schedule?aigenerated=true');

        setIsLoading(false)
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className='flex justify-center items-center h-screen'><Loader /></div>;
    }

    return (
        <div className="bg-gray-100">
            <Topbar pageName='zucal' toggleIsVisible={false} avatar={organizer.photo} />
            <main>
                <div className='mt-4 flex justify-center items-center flex-col'>
                    <div className="tooltip ml-7 " data-tip="Enter your event creation request">
                        <button className="btn btn-ghost" onClick={() => setPromptInput(!promptInput)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                            </svg>
                            Try our new AI feature</button>
                    </div>

                    {promptInput && (
                        <>
                            <input
                                className="input input-bordered input-secondary w-full max-w-xs m-4"
                                type="text"
                                placeholder="Meeting with Khloe on 2025-05-05 at 2pm for 45 minutes"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <button onClick={handleAddEvent} className="btn btn-sm  btn-ghost ">
                                {isLoading ?
                                    <span className="loading loading-ring loading-md"></span>
                                    : "Submit"
                                }
                            </button>
                        </>
                    )}
                </div>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow ">
                            <Menu isDrawer={false} />
                        </div>
                        <MainContent />
                    </div>
                </div>
            </main>
        </div>
    )
}
export default withRegistrationCheck(HomePage);
