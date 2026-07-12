const { pool } = require("../config/dbConnect")

// GET all Authors
const getAuthorsService = async () => {
    const { rows } = await pool.query(`SELECT * FROM authors`)
    return rows
} 

// GET author by Id
const getAuthorByIdService = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM authors WHERE id = $1`, [id])
    if(rows.length === 0){
        const miError = new Error(`No author found with id ${id}`)
        miError.status = 400
        throw miError
    }
    return rows
}

module.exports = {
    getAuthorsService,
    getAuthorByIdService
}