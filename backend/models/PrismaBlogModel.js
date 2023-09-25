const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getBlog: async (blogId) => {
    return await prisma.blog.findUnique({
      where: { blog_id: blogId },
      select: {
        title: true,
        body: true,
        views: true,
        status: true,
        publication_date: true,
        Category: {
          select: {
            name: true,
          },
        },
        Comment: {
          select: {
            comment_id: true,
            parent_comment_id: true,
            content: true,
            created_at: true,
            User: {
              select: {
                username: true,
                first_name: true,
                last_name: true,
              },
            },
            ChildComments: {
              select: {
                comment_id: true,
                parent_comment_id: true,
                content: true,
                created_at: true,
                User: {
                  select: {
                    username: true,
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
          },
        },
        User: {
          select: {
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  },
};
