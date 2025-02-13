export interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  authId: string;
}

export interface Booking {
  id: string;
  userId: number;
  guestEmail?: string;
  guestName?: string;
  guestNotes?: string;
  startTime: Date;
  endTime: Date;
  timeZone?: string;
}