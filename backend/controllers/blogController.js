const blogModel = require('../models/PrismaBlogModel');

exports.loadBlog = async (req, res) => {
    //Get blog ID (blog_id)
    // get Blog data from the db using blog Id
    // send blogData
  try {
    //Query to retrieve blog Data
    const blogId = req.params.blog_id;

    const blogData = await blogModel.getBlog(blogId)

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