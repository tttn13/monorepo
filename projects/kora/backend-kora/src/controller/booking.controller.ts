import { Context } from 'koa'
import { bookingService } from '../services/booking.service'
import { userService } from '../services/user.service';
import { emailService } from '../services/email.service';
import type { Booking } from '.././lib/types';

export const bookingController = {
  async verify(ctx: Context) {
    try {
      const token = ctx.query.token as string;
      if (!token) {
        ctx.status = 400;
        ctx.body = { error: 'No token provided' };
        return;
      }

      const bookingData = emailService.verifyBookingToken(token) as Booking;

      const booking = await bookingService.getBooking(bookingData.id);
      if (!booking) {

        ctx.status = 404;
        ctx.body = { error: 'Booking not found' };
        return;
      }
      ctx.body = booking;

    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        error: error instanceof Error
          ? error.message
          : 'Invalid or expired token'
      };
    }
  },

  async create(ctx: Context) {
    try {
      const data = ctx.request.body as Booking
      const organizer = await userService.getUser(data.userId);

      if (!organizer) {
        throw new Error('Organizer not found');
      }

      const bookingData = {
        ...data,
        userId: organizer.id
      };

      const booking = await bookingService.createBooking(bookingData)

      const bookLink = emailService.createBookingLink(booking);

      const content = 'Appoinment created ! Click link to update'

      await emailService.send(organizer?.email, bookLink, content);

      if (booking.guestEmail) {
        await emailService.send(booking?.guestEmail, bookLink, content);
      }

      ctx.body = booking
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error instanceof Error ? error.message : 'Failed to create booking' }
    }
  },

  async update(ctx: Context) {
    try {
      const data = ctx.request.body as Booking
      const booking = await bookingService.updateBooking(data)
      const bookLink = emailService.createBookingLink(booking);
      const organizer = await userService.getUser(booking.userId);

      if (!organizer) {
        throw new Error('Organizer not found');
      }

      const content = 'Appoinment updated ! Click link for details'
      await emailService.send(organizer?.email, bookLink, content);

      if (booking.guestEmail) {
        await emailService.send(booking?.guestEmail, bookLink, content);
      }
      ctx.body = booking
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error instanceof Error ? error.message : 'Failed to update booking' }
    }
  },

  async get(ctx: Context) {
    try {
      const id = String(ctx.params.id);
      const booking = await bookingService.getBooking(id)
      ctx.body = booking
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get bookings' }
    }
  },

  async getAll(ctx: Context) {
    try {
      const userId = Number(ctx.params.userId);
      const bookings = await bookingService.getBookings(userId)
      ctx.body = bookings
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get bookings' }
    }
  },

  async delete(ctx: Context) {
    try {
      const id = String(ctx.params.id);
      const booking = await bookingService.deleteBooking(id)
      ctx.body = booking
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get bookings' }
    }
  }
}