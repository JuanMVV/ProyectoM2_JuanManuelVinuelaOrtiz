const { getPostsService, getPostByIdService, createNewPostService } = require("../services/posts.service")

// GET all posts
const getPostsController = async (req, res, next) => {
 try {
    const posts = await getPostsService()
    res.status(200).json({
      message: 'Posts found',
      data: posts
    })
  } catch (error) {
      next(error)
  }

}

//GET post by Id
const getPostByIdController = async (req, res, next) => {
  try {
      const post = await getPostByIdService()
      res.status(200).json({
        message: 'Posts found',
        data: post
      })
    } catch (error) {
        next(error)
    }

}

//POST create new post
const createNewPostController = async (req, res, next) => {
  try {
    const { author_id } = req.params;
    const { title, content, published = false } = req.body || {};
    const resp = await createNewPostService(Number(author_id), title, content, published);
    res.status(201).json({
      message: 'Post created successful',
      data: resp
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
 getPostsController,
 getPostByIdController,
 createNewPostController
}