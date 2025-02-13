'use client'
import { useBookingStore } from '../store/bookingStore'
import { FormEvent, useEffect, useState } from 'react';
import { timeService } from '@/services/utils/timeService'

const lengths: number[] = [
    15, 30, 45, 60, 120, 0
]

export default function EventLength() {
    const [custom, setCustom] = useState(false);
    const [customValue, setCustomValue] = useState(0);
    const duration = useBookingStore((state) => state.duration);
    const setDuration = useBookingStore((state) => state.setDuration);

    function handleDurationClicked(minutesString: number) {
        if (minutesString == 0) {
            setCustom(!custom)
        } else {
            setDuration(minutesString)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setDuration(Number(customValue))
    }

    useEffect(() => {
        if (!lengths.includes(duration) && duration != -1) {
            setCustom(true)
            setCustomValue(duration)
        }

    }, [duration]);
    return (
        <div className="p-6 mb-6 bg-white rounded-lg shadow">
            {duration == -1 ? <h2>Select a Duration</h2> : <h2>Selected : {timeService.convertMinsToHrsAndMins(duration)}</h2>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lengths.map((length) => (
                    <button className={`btn ${duration === length ? 'bg-blue-500' : 'bg-gray-200'}`}
                        key={length}
                        onClick={() => handleDurationClicked(length)}
                    >{timeService.convertMinsToHrsAndMins(length)}</button>
                ))}
                {custom &&  (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="customDuration" className="input input-bordered flex items-center gap-2">
                            <input className='w-full'
                                type="number"
                                id="customDuration"
                                max="280"
                                min="1"
                                value={customValue}
                                onChange={(e) => setCustomValue(Number(e.target.value))}
                                placeholder="Enter minutes"
                            />
                            mins
                        </label>
                    </form>
                )}
            </div>
        </div>
    )
}
