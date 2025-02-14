'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import { useBookingStore } from '../store/bookingStore'
import { useRouter } from 'next/navigation'
import { bookingService } from '../../services/api/bookingService';
import { timeService } from '@/services/utils/timeService'
import { useUserStore } from '../store/userStore'

export default function BookingForm({ isOrganizer }: { isOrganizer: boolean }) {
  const { organizer } = useUserStore();
  const bookDetails = useBookingStore((state) => state.formData);
  const timeSlot = useBookingStore((state) => state.timeSlot);
  const duration = useBookingStore((state) => state.duration);
  const updateFormData = useBookingStore((state) => state.updateFormData);
  const resetStore = useBookingStore((state) => state.resetStore);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name == "name") {
      updateFormData({ ...bookDetails, guestName: value })
    } else if (name == "email") {
      updateFormData({ ...bookDetails, guestEmail: value })
    } else {
      updateFormData({ ...bookDetails, guestNotes: value })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    bookDetails.startTime = timeService.createStartTime(bookDetails.startTime, timeSlot);

    bookDetails.endTime = timeService.calculateEndTime(bookDetails.startTime, duration);
    
    if (organizer) {
      bookDetails.userId = organizer.id
    }
   
    if (isOrganizer) {
      var createdBook = await bookingService.create(bookDetails);
      updateFormData(createdBook)
    } else {
      var updated = await bookingService.update(bookDetails);
      updateFormData(updated)
    }
    setSubmitting(false)
    router.push('/confirmation');
  }

  useEffect(() => {
    resetStore()
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Enter {isOrganizer ? "Guest" : "Your"} Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" className="grow" placeholder="Daisy"
              id="name"
              name="name"
              value={bookDetails.guestName ?? ''}
              onChange={handleChange}
              required />
          </label>
        </div>
        <div>
          <label htmlFor="email" className="input input-bordered flex items-center gap-2">
            Email
            <input
              className="grow" placeholder="daisy@site.com" type="email"
              id="email"
              name="email"
              value={bookDetails.guestEmail ?? ''}
              onChange={handleChange}
              required />
          </label>
        </div>
        <div>
          <textarea className="textarea textarea-bordered min-w-full"
            id="notes"
            name="notes"
            value={bookDetails.guestNotes ?? ''}
            onChange={handleChange}
            placeholder="Additional Notes"></textarea>
        </div>
        {submitting
          ? <button type="submit" disabled className="btn btn-primary min-w-full">Submitting</button>
          : <button type="submit" className="btn btn-primary min-w-full">{isOrganizer ? "Schedule" : "Update"} Event</button>
      }
      </div>
    </form>
  )
}

