const { getPostsService, getPostByIdService, createNewPostService, updatePostService, deletePostService, getPostsByAuthorIdService } = require("../services/posts.service")

// GET all posts
const getPostsController = async (req, res, next) => {
 try {
    const posts = await getPostsService()
       res.status(200).json({
       message: posts.length ? 'Posts retrieved successfully' : 'No Posts found',
      data: posts   
    })
  } catch (error) {
      next(error)
  }

}

//GET post by Id
const getPostByIdController = async (req, res, next) => {
  try {
      const { id } = req.params
      const post = await getPostByIdService(id)
        if (post.length === 0) {
        return res.status(404).json({
          message: `Post with id ${id} not found`,
          data: []
        })
      }
      res.status(200).json({
        message: 'Post retrieved successfully',
        data: post[0]
      })
    } catch (error) {
        next(error)
    }

}

//POST create new post
const createNewPostController = async (req, res, next) => {
 try {
    const newPost = await createNewPostService(req.body);
    return res.status(201).json({
      status: 201,
      message: 'Post created successfully.',
      data: newPost
    });
  } catch (error) {
    next(error);
  }
};

//PUT Update post
const updatePostController = async (req, res, next) => {
 try {
    const id = Number(req.params.id ?? req.body?.id);
    const updatedPost = await updatePostService(id, req.body);
    return res.status(200).json({
      status: 200,
      message: 'The post was updated successfully.',
      data: updatedPost
    });
  } catch (error) {
    next(error);
  }
}

// DELETE
const deletePostsController = async (req, res, next) => {
  try {  
      const postId = Number(req.params.id);        
        const deletedPost = await deletePostService(postId);              
        if (deletedPost) {
            res.status(200).json({ 
              status: 200, 
              message: 'Post deleted successfully.'
            });
        } 
        else {
            res.status(404).json({ 
              status: 404, 
              message: `Post not found.`
            });
        }
    } catch (error) {
        next(error)     
    }
};

const getPostsByAuthorIdController = async (req, res, next) => {
  try {
    const authorId = Number(req.params.authorId);
    const authorWithPosts = await getPostsByAuthorIdService(authorId);
    if (!authorWithPosts) {
      return res.status(404).json({ 
        status: 404, 
        message: 'No posts were found for this author.' 
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Author posts retrieved successfully.',
      data: authorWithPosts
    });
  } catch (error) {
      next(error)
  }
};





module.exports = {
 getPostsController,
 getPostByIdController,
 createNewPostController,
 updatePostController,
 deletePostsController,
 getPostsByAuthorIdController
}