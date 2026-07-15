import { describe, it, expect, beforeEach, vi } from "vitest"
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const {
  validateAuthorBody,
  validatePostCreateBody,
  validatePostUpdateBody
} = require("../middleware/validatorBody.js")

const createResponse = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis()
})

const createNext = () => vi.fn()

describe("validatorBody middleware", () => {
  let req
  let res
  let next

  beforeEach(() => {
    res = createResponse()
    next = createNext()
  })

  describe("validateAuthorBody", () => {
    it("calls next() for a valid author body", async () => {
      req = { body: { name: "Ana", email: "ana@example.com", bio: "Author bio text" } }

      await validateAuthorBody(req, res, next)

      expect(next).toHaveBeenCalledTimes(1)
      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
    })

    it("returns 400 when name is missing", async () => {
      req = { body: { email: "ana@example.com", bio: "Bio text" } }

      await validateAuthorBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The author's name is required and cannot be empty."
      })
      expect(next).not.toHaveBeenCalled()
    })

    it("returns 400 when email is invalid", async () => {
      req = { body: { name: "Ana", email: "invalid-email", bio: "Bio text" } }

      await validateAuthorBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Author email is required or is not valid'
      })
      expect(next).not.toHaveBeenCalled()
    })

    it("returns 400 when bio is empty", async () => {
      req = { body: { name: "Ana", email: "ana@example.com", bio: "" } }

      await validateAuthorBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Author bio must be text and cannot be empty.'
      })
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe("validatePostCreateBody", () => {
    it("calls next() for a valid post body and converts author_id to number", async () => {
      req = { body: { title: "Post title", content: "Post content", author_id: "3", published: true } }

      await validatePostCreateBody(req, res, next)

      expect(req.body.author_id).toBe(3)
      expect(next).toHaveBeenCalledTimes(1)
      expect(res.status).not.toHaveBeenCalled()
    })

    it("returns 400 when title is empty", async () => {
      req = { body: { title: "", content: "Content", author_id: 1 } }

      await validatePostCreateBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'The post title is required and cannot be empty.'
      })
      expect(next).not.toHaveBeenCalled()
    })

    it("returns 400 when author_id is invalid", async () => {
      req = { body: { title: "Title", content: "Content", author_id: "abc" } }

      await validatePostCreateBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'The post author_id must be a valid positive integer.'
      })
      expect(next).not.toHaveBeenCalled()
    })

    it("returns 400 when published is not boolean", async () => {
      req = { body: { title: "Title", content: "Content", author_id: 1, published: "yes" } }

      await validatePostCreateBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'The published field must be a boolean.'
      })
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe("validatePostUpdateBody", () => {
    it("calls next() when no invalid fields are present", async () => {
      req = { body: { title: "Updated title", content: "Updated content", published: false } }

      await validatePostUpdateBody(req, res, next)

      expect(next).toHaveBeenCalledTimes(1)
      expect(res.status).not.toHaveBeenCalled()
    })

    it("returns 400 when title is empty", async () => {
      req = { body: { title: "" } }

      await validatePostUpdateBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'The post title cannot be empty.'
      })
      expect(next).not.toHaveBeenCalled()
    })

    it("returns 400 when published is not boolean", async () => {
      req = { body: { published: "true" } }

      await validatePostUpdateBody(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'The published field must be a boolean.'
      })
      expect(next).not.toHaveBeenCalled()
    })
  })
})
