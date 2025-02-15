import { Resend } from 'resend';
import { sign, verify, decode, JsonWebTokenError } from 'jsonwebtoken';
import type { Booking } from '.././lib/types';

const resend = new Resend(process.env.RESEND_API);

export const emailService = {
    createBookingLink(booking: Booking): string {
        const token = createToken(booking);
        return `${process.env.FRONT_END}/book?token=${token}`;
    },

    verifyBookingToken(token: string): Booking {
        var verified: Booking = {
            id: '',
            userId: 0,
            startTime: new Date(),
            endTime: new Date(),
            guestEmail: null,
            guestName: null,
            guestNotes: null,
            timeZone: null
        }
        
        try {            
            verified = verify(token, process.env.JWT_SECRET!) as Booking;

        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                console.error('JWT Error:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            } else {
                console.error('Unknown error:', error);
            }
        }

        const booking: Booking = {
            ...verified,
            startTime: new Date(verified.startTime),
            endTime: new Date(verified.endTime)
        };
        return booking;
    },

    async send(email: string, bookLink: string, content: string) {
        resend.emails.send({
            from: 'Zucal <info@zulon.org>',
            to: email,
            subject: 'Read Me',
            html: `<p>${content} ${bookLink}!</p>`
        });
    }
}

function createToken(booking: Booking): string {
    const payload = {
        id: booking.id,
        userId: booking.userId,
        guestEmail: booking.guestEmail,
        startTime: booking.startTime instanceof Date
            ? booking.startTime.toISOString()
            : booking.startTime,
        endTime: booking.endTime instanceof Date
            ? booking.endTime.toISOString()
            : booking.endTime,
        timeZone: booking.timeZone
    };
    const token = sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return token;
}

