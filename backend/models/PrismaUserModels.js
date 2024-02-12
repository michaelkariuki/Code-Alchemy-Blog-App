const { PrismaClient } = require("@prisma/client");
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
    const profile = await prisma.profile.create({
      data: profileData,
    });

    return profile;
  },
  getLoginData: async (key, data) => {
    // Create a new user in the User model
    const user = await prisma.user.findUnique({
      where: {
        [key]: data,
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
  getUser: async (data) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          ...data
        ]
      },
      select: {
        username: true,
        email: true,
      },
    });
    return user;
  },
};
