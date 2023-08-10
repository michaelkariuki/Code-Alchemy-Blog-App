import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

exports.loadBlog = async (req, res) => {
    //Get blog ID (blog_id)
    // get Blog data from the db using blog Id
    // send blogData
  try {
    //Query to retrieve blog Data
    const blogId = req.params.blog_id;

    const blogData = await prisma.blog.findUnique({
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

    //Check if data has been retrieved from db
    if (!blogData){
        return res.status(404).json({
            message: "Data not found"
        });
    }
    //Send data to the via end point
    res.status(200).json(blogData)

  } catch (error) {
    console.error("Error loading blog", error);
    res.status(500).json({
      error: "An error occurred loading the blog",
    });
  }
};