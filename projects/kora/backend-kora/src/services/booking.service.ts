import { prisma } from '../lib/prigma'
import type { Booking } from '@kora/shared-types';

export const bookingService = {
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
            where: { id: id },
            data: updateData
        });
    },

    async deleteBooking(id: string) {
        return prisma.booking.delete({
            where: { id }
        })
    }
}