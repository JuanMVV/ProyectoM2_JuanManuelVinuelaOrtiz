const { Router } = require("express")
const {  welcomeController, } = require("../controllers/welcome.controller")
const { getAuthorsController, getAuthorByIdController, createNewAuthorController, updateAuthorController } = require("../controllers/authors.controller")
const { getPostsController, getPostByIdController, createNewPostController } = require("../controllers/posts.controller")
const router = Router()

// GET welcome
router.get("/", welcomeController);


// GET /authors - list authors
router.get("/authors", getAuthorsController);
// GET /authors/:id - author details
router.get("/authors/:id", getAuthorByIdController);
// GET /posts - listar posts
router.get("/posts", getPostsController);
// GET /posts/:id - detalle post
router.get("/posts/:id", getPostByIdController);
// GET /posts/author/:authorId - posts con detalle de su author




// POST /authors - crear usuario
router.post("/authors", createNewAuthorController);
//POST /posts - crear post
router.post("/posts/:author_id", createNewPostController);


// PUT /authors/:id - actualizar usuario
router.put("/authors/:id", updateAuthorController);
//PUT /posts/:id - actualizar post


//DELETE /authors/:id - eliminar usuario
//DELETE /posts/:id - eliminar post

module.exports = {
  router
}