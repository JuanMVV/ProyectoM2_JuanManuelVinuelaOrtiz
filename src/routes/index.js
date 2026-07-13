const { Router } = require("express")
const {  welcomeController, } = require("../controllers/welcome.controller")
const { getAuthorsController, getAuthorByIdController, createNewAuthorController, updateAuthorController } = require("../controllers/authors.controller")
const { getPostsController, getPostByIdController, createNewPostController } = require("../controllers/posts.controller")
const { validateAuthorBody } = require("../middleware/validatorBody")
 
const router = Router()

// GETs
router.get("/", welcomeController);
router.get("/authors", getAuthorsController);
router.get("/authors/:id", getAuthorByIdController);
router.get("/posts", getPostsController);
router.get("/posts/:id", getPostByIdController);
// GET /posts/author/:authorId - posts con detalle de su author


// POSTs
router.post("/authors", validateAuthorBody, createNewAuthorController);
router.post("/posts/:author_id", createNewPostController);


// PUTs
router.put("/authors/:id",validateAuthorBody, updateAuthorController);
//PUT /posts/:id - actualizar post


//DELETEs
//DELETE /authors/:id - eliminar usuario



//DELETE /posts/:id - eliminar post

module.exports = {
  router
}