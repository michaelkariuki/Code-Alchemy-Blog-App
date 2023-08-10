import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

module.exports = {
  createUser: async (userData) => {
    // Create a new user in the User model
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  },
  createProfile: async (profileData) => {
    // Create a new Profile for the user model User model
    await prisma.user.create({
      data: profileData,
    });
  },
  getLoginData: async (uniqueField) => {
    // Create a new user in the User model
    const user = await prisma.user.findUnique({
      where: {
        uniqueField,
      },
      include: {
        Profile: {
          select: {
            profile_id: true,
            picture: true,
          },
        },
      },
    });

    return user;
  },
};
