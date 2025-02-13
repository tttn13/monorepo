import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-body';
// import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'  
import { userRouter } from './routes/user.routes'
import { bookingRouter } from './routes/booking.routes'
import { prisma } from './lib/prigma'
import 'dotenv/config'
import { jwtCheck } from './middleware/auth'
import { checkBucketPolicy, checkMinIO, setBucketPublicPolicy } from './lib/minio';

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

const app = new Koa()
// app.use(cors({
//   origin: '*',
//   credentials: true,
// }));

// app.use(authDebug); 

// app.use(bodyParser())
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser({ multipart: true }));

const router = new Router()

router.use('/api/user', userRouter.routes())
router.use('/api/booking', jwtCheck, bookingRouter.routes())

app.use(router.routes())
app.use(router.allowedMethods())



testConnection().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001')
  })
  checkMinIO()
  setBucketPublicPolicy();
  checkBucketPolicy();
})
