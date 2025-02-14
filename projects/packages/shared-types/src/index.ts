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
  guestEmail: string | null;  
  guestName: string | null;  
  guestNotes: string | null; 
  startTime: Date;
  endTime: Date;
  timeZone: string | null;    
}