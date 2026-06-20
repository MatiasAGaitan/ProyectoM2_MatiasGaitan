const pool = require('../db/config')

const getServicePosts = async () => {
    const result = await pool.query('SELECT * FROM posts')
    return result.rows
}
const getServicePostId = async (id) => {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1',[id])
    return result.rows[0]
}
const getServicePostAuthorId = async (id) => {
    const result = await pool.query('SELECT * FROM posts WHERE author_id = $1',[id])
    return result.rows
}

module.exports = {
    getServicePosts,
    getServicePostId,
    getServicePostAuthorId
}