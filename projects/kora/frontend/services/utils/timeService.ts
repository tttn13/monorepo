import { differenceInMinutes, parseISO, endOfDay, isSameMinute, addDays, startOfDay, format, add, parse, set, isAfter, formatDuration } from 'date-fns';

export const timeService = {
    convertToUtcDate: (localDate: Date): string => {
        return localDate.toISOString()
    },
    getDateOnly: (eventDate: Date): string => {
        return format(eventDate, 'MMM d, yyyy');
    },

    getTimeOnly: (eventDate: Date): string => {
        const date = new Date(eventDate)
        return format(date, 'h:mm a');
    },

    getLocalTimezoneName: () => {
        const timeZoneAbbr = new Date().toLocaleString('en-US', { timeZoneName: 'short' }).split(' ').pop();
        return timeZoneAbbr;
    },

    getTodayDate: () => {
        return format(new Date(), 'yyyy-MM-dd');
    },

    convertMinsToHrsAndMins(minutesString: number): string {
        if ((minutesString == 0)) return "Other";

        if (minutesString < 60) {
            return formatDuration({ minutes: minutesString }, {
                format: ['minutes'],
                zero: false
            });
        }

        return formatDuration({
            hours: Math.floor(minutesString / 60),
            minutes: minutesString % 60
        }, {
            format: ['hours', 'minutes'],
            delimiter: ' and ',
            zero: false
        });
    },

    createStartTime(date: Date, timeStr: string): Date {
        const timeDate = parse(timeStr, 'h:mm aa', new Date());

        return set(date, {
            hours: timeDate.getHours(),
            minutes: timeDate.getMinutes(),
            seconds: 0,
            milliseconds: 0
        });
    },

    calculateEndTime(startTime: Date, duration: number) {
        return add(startTime, { minutes: duration })
    },

    isDateBeforeToCurrent(date: Date) {
        return isAfter(new Date(), date)
    },

    displayDate(eventDate: Date): string {
        return format(eventDate, 'yyyy-MMMM-dd')
    },
    displayHrsAndMins(eventDate: Date): string {
        return format(eventDate, 'h:mm a');
    },

    hasNoTime(eventDate: Date): boolean {
        console.log(`date is ${eventDate}`)
        console.log(`startOfDay(eventDate) is ${isSameMinute(eventDate, startOfDay(eventDate))}`)
        return isSameMinute(eventDate, startOfDay(eventDate));
    },

    daysFromNow(days: number): Date {
        const now = new Date();
        return endOfDay(addDays(now, days))
    },

    getDurationInMins(endTime: Date, startTime: Date): number {
        return differenceInMinutes(endTime, startTime);
    }
}

