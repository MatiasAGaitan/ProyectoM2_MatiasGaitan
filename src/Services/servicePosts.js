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

const postServicePost = async (title,content,author_id,published) => {
    const result = await pool.query(`
        INSERT INTO posts (title, content, author_id, published) VALUES ($1,$2,$3,$4) RETURNING *`,[title,content,author_id,published])
    return result.rows[0]
}

const putServicePost = async(title,content,author_id,published,id) => {
    const result = await pool.query(`
        UPDATE posts
        SET
            title = COALESCE($1, title),
            content = COALESCE($2, content),
            author_id = COALESCE($3, author_id),
            published = COALESCE($4, published)
        WHERE id = $5
        RETURNING *
        `,[title,content,author_id,published,id])
    return result.rows[0]
}

const deleteServicePost = async(id) =>{
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *',[id])
    return result.rows[0]
}

module.exports = {
    getServicePosts,
    getServicePostId,
    getServicePostAuthorId,
    postServicePost,
    putServicePost,
    deleteServicePost
}