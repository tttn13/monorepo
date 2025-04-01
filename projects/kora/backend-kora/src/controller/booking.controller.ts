import { Context } from 'koa'
import { bookingDbService } from '../services/booking.service'
import { userDbService} from '../services/user.service';
import { emailService } from '../services/email.service';
import { auth0Service } from '../services/auth0.service';

import type { Booking } from '.././lib/types';
import axios from 'axios';

const aiApi = axios.create({
  baseURL: process.env.AI_API_URL,
  headers: {
      'Content-Type': 'application/json',
  }
})

export const bookingController = {
  async parseInput(ctx: Context) {
    try {
      const { input, organizer } = ctx.request.body as { input?: string; organizer?: number };
      const response = await aiApi.post('/parse-input', { input: input, organizer: organizer });    
      ctx.status = response.status;
      ctx.body = response.data;
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        error: error instanceof Error
          ? error.message
          : 'Unable to parse'
      };
    }
  },
 
  async verify(ctx: Context) {
    try {
      const token = ctx.query.token as string;
      if (!token) {
        ctx.status = 400;
        ctx.body = { error: 'No token provided' };
        return;
      }

      const bookingData = emailService.verifyBookingToken(token) as Booking;

      const booking = await bookingDbService.getBooking(bookingData.id);

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
      const organizer = await userDbService.getUser(data.userId);

      if (!organizer) {
        throw new Error('Organizer not found');
      }

      const bookingData = {
        ...data,
        userId: organizer.id,
      };

      const booking = await bookingDbService.createBooking(bookingData)

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
      const booking = await bookingDbService.updateBooking(data)
      const bookLink = emailService.createBookingLink(booking);
      const organizer = await userDbService.getUser(booking.userId);

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
      const booking = await bookingDbService.getBooking(id)
      ctx.body = booking
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get bookings' }
    }
  },

  async getGoogleToken(ctx: Context) {
    try {
      const id = Number(ctx.params.userId);
      console.log(`id in getGoogleToken is ${id}`)
      const token = await auth0Service.getGoogleTokenFromAuth0(id)
      ctx.body = token
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get Google Token' }
    }
  },

  async getAll(ctx: Context) {
    try {
      const userId = Number(ctx.params.userId);
      const bookings = await bookingDbService.getBookings(userId)
      ctx.body = bookings
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get bookings' }
    }
  },

  async delete(ctx: Context) {
    try {
      const id = String(ctx.params.id);
      const booking = await bookingDbService.deleteBooking(id)
      ctx.body = booking
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get bookings' }
    }
  }
}

