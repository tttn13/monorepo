'use client'
import React, { useState, useEffect } from 'react';
import type { Booking } from '../../types/shared-types';
import { bookingApiService } from '../../services/api/bookingService';
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    CalendarEventExternal
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { timeService } from '../../services/utils/timeService'
import { format} from 'date-fns';
import { useUserStore } from '../store/userStore';
import { dummyData } from '../../services/utils/dummyData';

function MainContent() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const { organizer} = useUserStore();
    const [isMounted, setIsMounted] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState<CalendarEventExternal[]>([])

    var calendar = useNextCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        defaultView: 'month-grid',
        selectedDate: format(new Date(), 'yyyy-MM-dd')
    }, [eventsService]);

    const getEvents = async (userId: number) => {
        dummyData.persistLocalStorage(userId)
        const bookings = await bookingApiService.getAll(userId);
        const dummyBookings = dummyData.getBookingsFromLocalStorage();
        const mergedBookings = dummyBookings.concat(bookings);
        console.log(JSON.stringify(mergedBookings))
        const calendarEvents = mergedBookings.map((booking: Booking) => ({
            id: booking.id,
            title: `Booking with ${booking.guestEmail}`,
            start: new Date(booking.startTime).toISOString(),
            end: new Date(booking.endTime).toISOString(),
        }));

        eventsService.set(calendarEvents)

        var evs = eventsService.getAll();

        const upcomingEvents = evs.filter(event => {
            const eventDate = new Date(event.start);
            return eventDate > new Date() && eventDate <= timeService.daysFromNow(30);
        });

        setUpcomingEvents(upcomingEvents.slice(0, 5));
        return calendarEvents;
    }
``
    useEffect(() => {
        setIsMounted(true);
       
        if (organizer.id != -1) {
            getEvents(organizer.id);
        }
    }, [organizer]);

    if (!isMounted) {
        return <span className="loading loading-ring loading-lg"></span>;
    }

    return (
        <div className="col-span-2 grid grid-rows-2 gap-4">
            <div className='p-8 bg-white rounded-lg shadow'>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
            <div className='p-8 bg-white rounded-lg shadow'>
                <h1 className='text-xl font-bold p-8 overflow-auto'>Upcoming Appointments</h1>
                <ul className='col-span-2 menu'>
                    {upcomingEvents && upcomingEvents.map((event, idx) => (
                        <li key={idx} className="bg-base-200 rounded-box p-4 mb-4" >
                            {format(event.start, 'yyyy-MM-dd')} : {event.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MainContent