'use client'

import { FormEvent, useEffect, useState } from 'react';
import { useBookingStore } from '../store/bookingStore'

const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', 'Other'
]

export default function TimeSlotSelector() {

    const [custom, setCustom] = useState(false);
    const [customValue, setCustomValue] = useState("");
    const timeSlot = useBookingStore((state) => state.timeSlot);

    const setTimeSlot = useBookingStore((state) => state.setTimeSlot);
    
    function handleSlotSelected(timeSlot: string) {
        if (timeSlot == "Other") {
            setCustom(!custom)
        } else {
            setTimeSlot(timeSlot)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setTimeSlot(customValue)
    }
    
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            {timeSlot == null ? <h2>Select a Time</h2> : <h2>Selected : {timeSlot}</h2>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                    <button className={`btn ${timeSlot === slot ? 'bg-blue-500' : 'bg-gray-200'}`}
                        key={slot} onClick={() => handleSlotSelected(slot)}>{slot}</button>
                ))}
                {custom && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="customTime" className="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
                                id="customTime"
                                value={customValue}
                                onChange={(e) => setCustomValue(e.target.value)}
                                placeholder="Enter time slot"
                            />
                        </label>
                    </form>
                )}
            </div>
        </div>
    )
}
