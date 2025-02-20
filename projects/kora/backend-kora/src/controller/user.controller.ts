import { Context } from 'koa'
import { userService } from '../services/user.service'
import { User, Booking } from '@prisma/client'
import { minioClient } from '../lib/minio';
import 'dotenv/config'

export const userController = {
  async getPresignedUrl(ctx: Context) {
    try {
      const fileName = `uploads/${crypto.randomUUID()}.jpg`;

      const presignedUrl = await minioClient.presignedPutObject(
        'zucal-photos',
        fileName,
        24 * 60 * 60 // 24 hours expiry
      );

      ctx.body = {
        url: presignedUrl,
        publicUrl: `https://${process.env.AWS_ENDPOINT}/zucal-photos/${fileName}`,
        fileName: fileName
      };

    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to generate presigned URL' };
    }
  },

  getMinioUrl(fileName: string) {
    return `http://100.118.120.108:80/zucal-photos/${fileName}`;
  },

  async complete(ctx: Context) {
    ctx.body = { success: true };
  },

  async createUser(ctx: Context) {
    try {
      const data = ctx.request.body as {
        id: number;
        authId: string;
        name: string;
        email: string;
        photo: string
      }
      console.log('creating user')
      const user = await userService.createUser(data)
      console.log(`user id is ${user.id}`)
      ctx.body = user
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error instanceof Error ? error.message : 'Failed to create user' }
    }
  },

  async updateUser(ctx: Context) {
    try {
      const data = ctx.request.body as User
      const user = await userService.updateUser(data)
      ctx.body = user
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error instanceof Error ? error.message : 'Failed to update user' }
    }
  },

  async verifyUser(ctx: Context) {
    const authId = (ctx.params.id);
    try {
      const users = await userService.verifyUser(authId)
      ctx.body = users
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to verifyUser' }
    }
  },

  async getUser(ctx: Context) {
   
    const userId = Number(ctx.params.id);
    try {
      const users = await userService.getUser(userId)
      ctx.body = users
    } catch (error) {
      ctx.status = 404
      ctx.body = { error: 'Failed to get user' }
    }
  },

  async getUsers(ctx: Context) {
    try {
      const users = await userService.getUsers()
      ctx.body = users
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get users' }
    }
  }
}