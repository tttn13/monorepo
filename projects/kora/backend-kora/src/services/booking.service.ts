import { prisma } from '../lib/prigma'
import type { Booking } from '.././lib/types';

export const bookingDbService = {
    async getBooking(bookingid: string) {
        return prisma.booking.findUnique({
            where: { id: bookingid },
        })
    },

    async getBookings(id: number) {
        return prisma.booking.findMany({
            where: { userId: id }
        })
    },

    async createBooking(data: Booking) {
        const { id, startTime, endTime, guestEmail, ...bookingData } = data;

        return prisma.booking.create({
            data: {
                ...bookingData,
                guestEmail: guestEmail,
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(endTime).toISOString(),
            }
        })
    },

    async updateBooking(data: Booking) {
        const { id, ...updateData } = data;

        return prisma.booking.update({
            where: { id },
            data: {
                guestName: data.guestName ? data.guestName : "",
                guestEmail: data.guestEmail,
                guestNotes: data.guestNotes,
                startTime: data.startTime,
                endTime: data.endTime,
                timeZone: data.timeZone == "" ? "" : data.timeZone
            }
        });
    },

    async deleteBooking(id: string) {
        return prisma.booking.delete({
            where: { id }
        })
    }
}