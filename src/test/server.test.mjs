import request from "supertest"
import { describe, it, expect } from "vitest"
const { server } = await import("../server.js")

describe("Server connection", () => {
  it("should respond to GET / with 200 and a running message", async () => {
    const response = await request(server).get("/")

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: 200,
      message: "Server is running ok"
    })
  })
})
