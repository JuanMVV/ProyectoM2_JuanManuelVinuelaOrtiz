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
    const authorId = Number(req.body.authorId);
    if (!Number.isInteger(authorId)) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid author ID.'
      });
    }
    const newPost = await createNewPostService(authorId, req.body);
    return res.status(201).json({
      status: 201,
      message: 'Post created successfully.',
      data: newPost
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