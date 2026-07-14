const express = require("express")
const { router } = require("./routes")
const { requestLogger, errorHandler } = require("./middleware")

const server = express()

server.use(express.json())
server.use(requestLogger)


server.use(router)

server.use(errorHandler)

module.exports = {
  server
}