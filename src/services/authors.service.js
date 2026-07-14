const { pool } = require("../config/dbConnect")

// GET: all Authors
const getAuthorsService = async () => {
    const { rows } = await pool.query(`SELECT * FROM authors`)
    return rows
} 

// GET: author by Id
const getAuthorByIdService = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM authors WHERE id = $1`, [id])    
    return rows
}

// POST: New Author
const createNewAuthorService = async (authorData) => {
    const checkEmail = await pool.query('SELECT id FROM authors WHERE email = $1', [authorData.email]);
    if (checkEmail.rows.length > 0) {
        const error = new Error('This email is already registered.');
        error.statusCode = 409;
        throw error;
    }       
    return await pool.query('CALL sp_new_author($1, $2, $3)', [authorData.name, authorData.email, authorData.bio]);   
}

// PUT: Update Author
const updateAuthorService = async (id, authorData = {}) => {
    const authorId = Number(id ?? authorData?.id);
    if (!Number.isInteger(authorId)) {
        const error = new Error('Invalid author ID.');
        error.statusCode = 400;
        throw error;
    }  
    const checkAuthorId = await pool.query('SELECT id FROM authors WHERE id = $1', [authorId]);
    if (checkAuthorId.rows.length === 0) {
        const error = new Error('Author not found.');
        error.statusCode = 404;
        throw error;
    }  
    const checkEmail = await pool.query('SELECT id FROM authors WHERE email = $1', [authorData.email]);
    if (checkEmail.rows.length > 0) {
         const error = new Error('This email is already registered.');
        error.statusCode = 409;
        throw error;
    }   
    const { rows } = await pool.query('SELECT * FROM fn_update_author($1, $2, $3, $4)', [id, authorData.name, authorData.email, authorData.bio]);  
    return rows;
}

// DELETE: Delete Author
const deleteAuthorService = async (id) => {    
    const { rowCount } = await pool.query('DELETE FROM authors WHERE id = $1', [id]);
    return rowCount > 0;
};


module.exports = {
    getAuthorsService,
    getAuthorByIdService,
    createNewAuthorService,
    updateAuthorService,
    deleteAuthorService
}