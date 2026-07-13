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



// POST: create new Author
const createNewAuthorService = async (name, email, bio) => {
    return await pool.query('CALL sp_new_author($1, $2, $3)', [name, email, bio]);   
}


// POST: update Author
const updateAuthorService = async (id, name, email, bio) => {
    const { rows } = await pool.query('SELECT * FROM fn_update_author($1, $2, $3, $4)', [id, name, email, bio]);  
    return rows;
}



module.exports = {
    getAuthorsService,
    getAuthorByIdService,
    createNewAuthorService,
    updateAuthorService
}