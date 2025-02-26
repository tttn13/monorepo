'use client'
import CalendarView from '../components/calendar'
import BookingForm from '../components/booking-form'
import TimeSlotSelector from '../components/timeslot-selector'
import EventLength from '../components/event-length'
import { useUserStore } from '../store/userStore'
import MenuDrawer from '../components/menu-drawer'
import Topbar from '../components/topbar'
import { withRegistrationCheck } from '../components/withRegistrationCheck';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function SchedulePage() {
    const { organizer } = useUserStore();
    const searchParams = useSearchParams();
    const isAiGenerated = searchParams.get('aigenerated');
    
    useEffect(() => {
        if (isAiGenerated === 'true') {
            window.alert("Our LLM is not perfect, please check and confirm details");
        }

    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Topbar pageName='Schedule an Appointment' toggleIsVisible={true} avatar={organizer.photo} />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className=''>
                            <div className='card card-compact bg-base-100 shadow-l mb-6 mt-0 rounded-lg'>
                                <div className="card-body items-center text-center">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={organizer.photo || 'https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg'} />
                                        </div>
                                    </div>
                                    <h2 className="card-title py-6">{organizer?.name} - Host</h2>
                                </div>
                            </div>
                            <BookingForm
                                isOrganizer={true}
                            />
                        </div>

                        <div className=''>
                            <EventLength />
                            <CalendarView />
                            <TimeSlotSelector />
                        </div>
                    </div>
                    <MenuDrawer isDrawer={true} />
                </div>
            </main>
        </div>
    )
}
export default withRegistrationCheck(SchedulePage);
