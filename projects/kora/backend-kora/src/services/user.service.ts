import { prisma } from '../lib/prigma'

export const userDbService= {

  async verifyUser(authKey: string) {
    return await prisma.user.findFirst({
      where: {
        authId: authKey
      },
    })
  },
  
  async getUser(id: number) {
    const user = prisma.user.findUnique({
      where: { id },
      include: {
        bookings: true
      }
    })
    
    return user;
  },

  async getUsers() {
    return prisma.user.findMany()
  },

  async createUser(data: { id: number, authId: string, name: string, email: string, photo: string }) {
    const existed = await this.verifyUser(data.authId);
    if (existed) {
      return existed;
    }
    const { id, ...userData } = data;
    
    return prisma.user.create({
      data: userData
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