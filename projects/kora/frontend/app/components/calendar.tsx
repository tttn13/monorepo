'use client'

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useBookingStore } from '../store/bookingStore'
import { timeService } from '@/services/utils/timeService'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarView() {
  const [isMounted, setIsMounted] = useState(false);
  
  const bookDetails = useBookingStore((state) => state.formData);

  const updateFormData = useBookingStore((state) => state.updateFormData);

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {

    if (value instanceof Date) {
      if (timeService.isDateBeforeToCurrent(value)) {
        showAlert();
        return;
      }
        
      updateFormData({...bookDetails, startTime: value})
    }
  };

  const showAlert = (): void => {
    window.alert("Pick a later date!");
  };


  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow">
      {!isMounted ? (
        <div className='justify-self-center'>
          <span className="loading loading-infinity loading-lg "></span>
        </div>
      ) : (
        <div>
            {bookDetails.startTime == null ?
              <h2>Select a Date</h2> :
              <h2>Selected: {timeService.displayDate(bookDetails.startTime)} </h2>}
          <Calendar
            onChange={handleDateChange}
            value={bookDetails.startTime}
          />
        </div>
      )}
    </div>
  );
}