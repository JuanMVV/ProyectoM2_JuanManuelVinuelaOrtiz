const { pool } = require("../config/dbConnect")

// GET: all Posts
const getPostsService = async () => {
    const { rows } = await pool.query(`SELECT * FROM posts`)
    return rows
} 

// GET: Post by Id
const getPostByIdService = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id])
    return rows
}

// POST: create new post
const createNewPostService = async (id, postData = {}) => {
    const checkAuthorId = await pool.query('SELECT id FROM authors WHERE id = $1', [id]);
    if (checkAuthorId.rows.length === 0) {
        const error = new Error('Author not found.');
        error.statusCode = 404;
        throw error;
    }      
    const { rows } = await pool.query(
    'SELECT * FROM fn_create_post($1, $2, $3, $4)',
    [id, postData.title, postData.content, postData.published]
  );
  return rows;
}


module.exports = {
    getPostsService,
    getPostByIdService,
    createNewPostService
}