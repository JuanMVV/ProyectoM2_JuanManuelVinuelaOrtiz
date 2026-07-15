const { Router } = require("express")
const { welcomeController } = require("../controllers/welcome.controller")
const { getAuthorsController, getAuthorByIdController, createNewAuthorController, updateAuthorController, deleteAuthorsController } = require("../controllers/authors.controller")
const { getPostsController, getPostByIdController, createNewPostController, updatePostController, deletePostsController, getPostsByAuthorIdController} = require("../controllers/posts.controller")
const { validateAuthorBody, validatePostCreateBody, validatePostUpdateBody } = require("../middleware/validatorBody")
 
const router = Router()

// GETs
router.get("/", welcomeController);
router.get("/authors", getAuthorsController);
router.get("/authors/:id", getAuthorByIdController);
router.get("/posts", getPostsController);
router.get("/posts/:id", getPostByIdController);
router.get("/posts/author/:authorId", getPostsByAuthorIdController);

// POSTs
router.post("/authors", validateAuthorBody, createNewAuthorController);
router.post("/posts", validatePostCreateBody, createNewPostController);

// PUTs
router.put("/authors/:id", validateAuthorBody, updateAuthorController);
router.put("/posts/:id", validatePostUpdateBody, updatePostController);

//DELETEs
router.delete("/authors/:id", deleteAuthorsController);
router.delete("/posts/:id", deletePostsController)

module.exports = {
  router
}