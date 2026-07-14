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
const createNewPostService = async (postData = {}) => {
    const checkAuthorId = await pool.query('SELECT id FROM authors WHERE id = $1', [postData.author_id]);
    if (checkAuthorId.rows.length === 0) {
        const error = new Error('Author not found.');
        error.statusCode = 404;
        throw error;
    }      
    const { rows } = await pool.query(
    'SELECT * FROM fn_create_post($1, $2, $3, $4)',
    [postData.author_id, postData.title, postData.content, postData.published]
  );
  return rows;
}


//PUT: update post
const updatePostService = async (id, postData = {}) => {    
    const checkPostId = await pool.query('SELECT id FROM posts WHERE id = $1', [id]);
    if (checkPostId.rows.length === 0) {
        const error = new Error('Post not found.');
        error.statusCode = 404;
        throw error;
    }       
    const { rows } = await pool.query('SELECT * FROM fn_update_post($1, $2, $3, $4)',[id, postData.title, postData.content, postData.published]);  
    return rows;
}

module.exports = {
    getPostsService,
    getPostByIdService,
    createNewPostService,
    updatePostService
}