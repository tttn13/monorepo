import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import type { Booking } from '../../types/shared-types';

export const dummyData = {
  persistLocalStorage(userId: number) {
    const bookings = this.generate(userId);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  },

  getBookingsFromLocalStorage(): Booking[] {
    const bookingsJson = localStorage.getItem('bookings');

    if (!bookingsJson) {
      return [];
    }

    const parsedBookings = JSON.parse(bookingsJson);

    return parsedBookings.map((booking: any): Booking => ({
      ...booking,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime)
    }));
  },

  generate(organizerId: number): Booking[] {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const twoWeeksFromTomorrow = new Date(tomorrow);
twoWeeksFromTomorrow.setDate(tomorrow.getDate() + 14);


    const durations = [15, 30, 45, 60, 120];

    const noteOptions = [
      "Phone call about new project",
      "Initial interview",
      "Follow-up interview",
      "Product demo",
      "Quarterly review",
      "Consultation",
      "Strategy meeting",
      "Technical discussion"
    ];

    const names = [
      "Jane Doe",
      "John Doe",
      "Emma Wilson",
      "Michael Brown",
      "Sarah Johnson",
      "David Lee",
      "Lisa Chen",
      "Robert Taylor"
    ];

    const bookings: Booking[] = [];

    for (let i = 0; i < 5; i++) {
      const randomDate = new Date(
        tomorrow.getTime() +
        Math.random() * (twoWeeksFromTomorrow.getTime() - tomorrow.getTime())
      );

      randomDate.setHours(Math.floor(Math.random() * 7) + 9, 0, 0, 0);

      const duration = durations[Math.floor(Math.random() * durations.length)];

      const endTime = new Date(randomDate.getTime() + duration * 60000);

      if (endTime.getHours() >= 17) {
        randomDate.setHours(17 - Math.ceil(duration / 60));
        randomDate.setMinutes((60 - duration % 60) % 60);

        endTime.setTime(randomDate.getTime() + duration * 60000);
      }

      const guestName = names[Math.floor(Math.random() * names.length)];

      const firstName = guestName.split(' ')[0].toLowerCase();
      const lastName = guestName.split(' ')[1].toLowerCase();
      const guestEmail = `${firstName}.${lastName}@example.com`;

      const guestNotes = noteOptions[Math.floor(Math.random() * noteOptions.length)];

      bookings.push({
        id: uuidv4(),
        userId: organizerId,
        guestEmail,
        guestName,
        guestNotes,
        startTime: randomDate,
        endTime: endTime,
        timeZone: "UTC"
      });
    }

    bookings.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return bookings;
  }
}