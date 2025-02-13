import Router from '@koa/router'
import { bookingController } from '../controller/booking.controller'
export const bookingRouter = new Router()
bookingRouter.post('/', bookingController.create)
bookingRouter.put('/:id', bookingController.update)
bookingRouter.get('/verify', bookingController.verify);
bookingRouter.get('/:id', bookingController.get)
bookingRouter.get('/user/:userId', bookingController.getAll)
bookingRouter.delete('/:id', bookingController.delete)
