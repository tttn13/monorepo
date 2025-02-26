import { Context } from 'koa'
import { userDbService } from '../services/user.service'
import { minioClient } from '../lib/minio';
import crypto from 'crypto';
import type { User } from '../lib/types';
import 'dotenv/config'

export const userController = {
  async getPresignedUrl(ctx: Context) {
    try {
      const fileName = `uploads/${crypto.randomUUID()}.jpg`;
  
      const presignedUrl = await minioClient.presignedPutObject(
        "zucal-photos",
        fileName,
        24 * 60 * 60
      );
  
      ctx.body = {
        url: presignedUrl,
        publicUrl: `https://zucal-photos.${process.env.AWS_ENDPOINT}/${fileName}`,
        fileName,
      };
    } catch (error) {
      console.error("Error generating presigned URL:", error);
  
      ctx.status = 500;
      ctx.body = {
        error: error instanceof Error ? error.message : "Internal Server Error",
      };
    }
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
      const user = await user.db.service.createUser(data)
      ctx.body = user
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error instanceof Error ? error.message : 'Failed to create user' }
    }
  },

  async updateUser(ctx: Context) {
    try {
      const data = ctx.request.body as User
      const user = await user.db.service.updateUser(data)
      ctx.body = user
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error instanceof Error ? error.message : 'Failed to update user' }
    }
  },

  async verifyUser(ctx: Context) {
    const authId = (ctx.params.id);
    try {
      const users = await userDbService.db.service.verifyUser(authId)
      ctx.body = users
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to verifyUser' }
    }
  },

  async getUser(ctx: Context) {

    const userId = Number(ctx.params.id);
    try {
      const users = await userDbService.db.service.getUser(userId)
      ctx.body = users
    } catch (error) {
      ctx.status = 404
      ctx.body = { error: 'Failed to get user' }
    }
  },

  async getUsers(ctx: Context) {
    try {
      const users = await userDbService.db.service.getUsers()
      ctx.body = users
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get users' }
    }
  }
}