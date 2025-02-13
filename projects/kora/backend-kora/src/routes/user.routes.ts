import Router from '@koa/router'
import { userController } from '../controller/user.controller'
import { jwtCheck } from '../middleware/auth'

export const userRouter = new Router();
userRouter.get('/presign', jwtCheck, userController.getPresignedUrl);
userRouter.post('/complete', userController.complete);

userRouter.get('/:id', jwtCheck, userController.getUser)
userRouter.get('/auth/:id', userController.verifyUser)
// userRouter.get('/all', jwtCheck, userController.getUsers)

userRouter.post('/', jwtCheck, userController.createUser)
userRouter.put('/',jwtCheck, userController.updateUser)