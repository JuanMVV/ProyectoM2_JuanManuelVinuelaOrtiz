const { pool } = require("../config/dbConnect")

// GET all Posts
const getPostsService = async () => {
    const { rows } = await pool.query(`SELECT * FROM posts`)
    return rows
} 

// GET Post by Id
const getPostByIdService = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id])
    return rows
}


const createNewPostService = async (authorId, title, content, published) => {
    const { rows } = await pool.query(
    'SELECT * FROM fn_create_post($1, $2, $3, $4)',
    [authorId, title, content, published]
  );
  return rows[0];
}


module.exports = {
    getPostsService,
    getPostByIdService,
    createNewPostService
}