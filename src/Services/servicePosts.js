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
    const result = await pool.query(
        `SELECT
            posts.id AS post_id,
            posts.title,
            posts.content,
            posts.published,
            posts.created_at AS post_created_at,
            authors.id AS author_id,
            authors.name AS author_name,
            authors.email AS author_email,
            authors.bio AS author_bio
        FROM posts
        JOIN authors ON posts.author_id = authors.id
        WHERE posts.author_id = $1
        `,[id])
    return result.rows
}

module.exports = {
    getServicePosts,
    getServicePostId,
    getServicePostAuthorId
}