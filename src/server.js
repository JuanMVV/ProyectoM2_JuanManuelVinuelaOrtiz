const express = require("express")
const { router } = require("./routes")
const { requestLogger, errorHandler } = require("./middleware")
const { swaggerUi, swaggerSpec } = require("./config/swagger")

const server = express()

server.use(express.json())
server.use(requestLogger)

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

server.use(router)

server.use(errorHandler)

module.exports = {
  server
}