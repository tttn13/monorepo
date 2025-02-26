'use client'

import { useSearchParams } from 'next/navigation';
import { bookingApiService } from '../../services/api/bookingService'
import { timeService } from '../../services/utils/timeService'
import { userApiService } from '../../services/api/userService';
import CalendarView from '../components/calendar'
import BookingForm from '../components/booking-form'
import TimeSlotSelector from '../components/timeslot-selector'
import EventLength from '../components/event-length'
import { useEffect, useState } from 'react';
import { useBookingStore } from '../store/bookingStore'

export default function BookingPageWrapper() {
  const [hostName, setHostName] = useState<string>("Host Name")
  const [photo, setPhoto] = useState<string>("")
  const searchParams = useSearchParams();
  const setBookDetails = useBookingStore((state) => state.updateFormData);
  const setDuration = useBookingStore((state) => state.setDuration);
  const resetStore = useBookingStore((state) => state.resetStore);
  const setTimeSlot = useBookingStore((state) => state.setTimeSlot);
 

  useEffect(() => {
    const verifyBooking = async (token: string) => {

      resetStore();
      
      const response = await bookingApiService.verify(token);

      if (!response) {
        console.error('Verification failed: No response received');
        return;
      }

      const organizer = await userApiService.get(response.userId);
      if (!response) {
        console.error(' No organizer received');
        return;
      }
      setHostName(organizer.name);
      setPhoto(organizer.photo)
      setBookDetails({
        id: response.id,
        userId: response.userId,
        guestEmail: response?.guestEmail || "",
        endTime: response.endTime,
        startTime: response.startTime,
        guestName: response.guestName || "",
        guestNotes: response.guestNotes || "",
        timeZone: ""
      })

      if (response.startTime && response.endTime) {
        {
          const mins = timeService.getDurationInMins(response?.endTime, response?.startTime)
          setDuration(mins)
        }
        setTimeSlot(timeService.getTimeOnly(response?.startTime))
      }
      return (response)
    }

    const token = searchParams.get('token')?.split('!')[0];

    if (!token) {
      return
    }

    verifyBooking(token);

  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment (Demo)</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className='card card-compact bg-base-100 shadow-l mb-6 mt-0 rounded-lg'>
                <div className="card-body items-center text-center">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      {photo
                        ? <img src={photo} />
                        : <img src="https://picsum.photos/id/237/200/300" />
                      }
                    </div>
                  </div>
                  <h2 className="card-title py-6">Your Host - {hostName}</h2>
                </div>
              </div>
              <BookingForm 
              isOrganizer={false} 
              />
            </div>

            <div>
              <EventLength />
              <CalendarView />
              <TimeSlotSelector />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

