import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Booking } from '../../types/shared-types';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingState {
  formData: Booking
  isLoading: boolean;
  duration: number;
  timeSlot: string;
  setTimeSlot: (time: string) => void;
  setDuration: (length: number ) => void;  
  updateFormData: (data: Booking) => void
  resetStore: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        
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

        duration: -1,
        timeSlot: "",
        isLoading: false,

        // Actions
        updateFormData: (data) => {
          set({ 
            formData: {
              id: data.id,
              userId: data.userId,
              guestName: data.guestName,
              guestEmail: data.guestEmail,
              startTime: data.startTime,
              endTime: data.endTime,
              guestNotes: data.guestNotes ,
              timeZone: data.timeZone || "UTC"
            }
          })
        },
          
        setDuration: (length) => {
          set({ duration : length })
        },

        setTimeSlot: (time) => {
          set({ timeSlot : time })
        },

        resetStore: () => {
          set({
            
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
            
            duration: -1,
            timeSlot: "",
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
