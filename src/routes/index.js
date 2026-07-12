
const { Router } = require("express")
const { getWelcomeController, getAuthorsController, getAuthorByIdController } = require("../controllers/authors.controller")
const router = Router()

router.get("/", getWelcomeController)

// GET /authors - list authors
router.get("/authors", getAuthorsController);

// GET /authors/:id - author details
router.get("/authors/:id", getAuthorByIdController);

// •	POST /authors - crear usuario
// •	PUT /authors/:id - actualizar usuario
// •	DELETE /authors/:id - eliminar usuario

// •	GET /posts - listar posts

// •	GET /posts/:id - detalle post
// •	GET /posts/author/:authorId - posts con detalle de su author
// •	POST /posts - crear post
// •	PUT /posts/:id - actualizar post
// •	DELETE /posts/:id - eliminar post

module.exports = {
  router
}