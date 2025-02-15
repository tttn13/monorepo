import Router from '@koa/router'
import { bookingController } from '../controller/booking.controller'
import { jwtCheck } from '../middleware/auth'

export const bookingRouter = new Router()
bookingRouter.post('/', jwtCheck, bookingController.create)
bookingRouter.put('/:id', bookingController.update)
bookingRouter.get('/verify', bookingController.verify);
bookingRouter.get('/auth', bookingController.verify);

bookingRouter.get('/:id', jwtCheck, bookingController.get)
bookingRouter.get('/user/:userId',jwtCheck, bookingController.getAll)
bookingRouter.delete('/:id', jwtCheck, bookingController.delete)
