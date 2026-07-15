const { pool } = require("./src/config/dbConnect")
const { initializeDatabase } = require("./src/config/initDb")
const { PORT } = require("./src/config/envs")
const { server } = require("./src/server")

const startServer = async () => {

    await pool.query('SELECT 1')
    await initializeDatabase()
    console.log('DB connection successful')

    server.listen(PORT, () => {
    console.log('server started and listening on port 3000 ' + PORT)
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

