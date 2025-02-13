import { prisma } from '../lib/prigma'
import formidable from 'formidable';
import { Context } from 'koa'

export const userService = {

  async verifyUser(authKey: string) {
    return await prisma.user.findFirst({
      where: {
        authId: authKey
      },
    })
  },
  
  async getUser(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        bookings: true
      }
    })
  },

  async getUsers() {
    return prisma.user.findMany()
  },

  async createUser(data: { id: number, authId: string, name: string, email: string, photo: string }) {
    const existed = await this.verifyUser(data.authId);
    if (existed) {
      return existed;
    }
    const { id, ...updateData } = data;
    
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        photo: data.photo,
        authId: data.authId
      }
    })
  },

  async updateUser(data: { id: number, name: string, email: string, photo: string }) {
    const { id, ...updateData } = data;
    return prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        photo: data.photo
      }
    });
  },

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id }
    })
  }
}