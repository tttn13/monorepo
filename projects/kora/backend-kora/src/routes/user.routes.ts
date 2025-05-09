import Router from '@koa/router'
import { userController } from '../controller/user.controller'
import { jwtCheck } from '../middleware/auth'

export const userRouter = new Router();
userRouter.get('/presign', jwtCheck, userController.getPresignedUrl);
userRouter.post('/complete', userController.complete);

userRouter.get('/:id', userController.getUser)
userRouter.get('/auth/:id', userController.verifyUser)

userRouter.post('/', jwtCheck, userController.createUser)
userRouter.put('/',jwtCheck, userController.updateUser)