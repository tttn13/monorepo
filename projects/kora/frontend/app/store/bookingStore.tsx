import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Booking } from '@kora/shared-types';
import { bookingService } from '../../services/api/bookingService';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingState {
  formData: Booking
  isLoading: boolean;
  duration: number;
  timeSlot: string;
  setTimeSlot: (time: string) => void;
  setDuration: (length: number ) => void;  
  updateFormData: (data: Partial<Booking>) => void
  resetStore: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        duration: -1,
        timeSlot: "",
        formData: {
          id: '',
          userId: -1,
          guestName: "",
          guestEmail: '',
          startTime: new Date(),
          endTime: new Date() || null,
          guestNotes: '',
          timeZone: null
        },
        isLoading: false,

        // Actions
        updateFormData: (data) =>
          set(
            (state) => ({
              formData: { ...state.formData, ...data },
            }),
            false,
            'updateFormData'
          ),
        
        setDuration: (length) => set(
          (state) => ({
            duration: length,
          }),
          false,
          'setDuration'
        ),

        setTimeSlot: (time) => set( 
          (state) => ({
            timeSlot: time,  
          }),
          false,
          'setTimeSlot'
        ),

        resetStore: () => {
          // Reset the in-memory state
          set({
            duration: -1,
            timeSlot: "",
            formData: {
              id: '',
              userId: -1,
              guestName: "",
              guestEmail: '',
              startTime: new Date(),
              endTime: new Date(),
              guestNotes: '',
              timeZone: null
            },
            isLoading: false
          });
          
          localStorage.removeItem('booking-storage');
        },
      }),
      {
        name: 'booking-storage', 
        partialize: (state) => ({
          formData: state.formData,
          duration: state.duration,
          timeSlot: state.timeSlot
        })
      }
    )
  )
)
