const express = require("express")
const { router } = require("./routes")
const { requestLogger } = require("./middleware")

const server = express()

server.use(express.json())
server.use(requestLogger)


server.use(router)

module.exports = {
  server
}