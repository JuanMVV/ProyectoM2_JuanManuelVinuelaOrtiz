const { pool } = require("./src/config/dbConnect")
const { initializateDatabase } = require("./src/config/initDb")
const { server } = require("./src/server")
const { loadEnvFile } = require("node:process")
loadEnvFile('.env')

const startServer = async () => {
    await pool.query('SELECT 1')    
    await initializateDatabase()
    console.log("DB connection successful")
    server.listen(process.env.PORT, function () {
      console.log("server started and listening on port 3000")
    })
}

startServer()

process.on("SIGINT", async () => {
  await pool.end()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await pool.end()
  process.exit(0)
})

