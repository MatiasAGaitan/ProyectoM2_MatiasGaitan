const pool = require('../db/config')

const getServiceComments = async () => {
    const result = await pool.query('SELECT * FROM comments')
    return result.rows}

const getServiceCommentsId = async (id) => {
    const result = await pool.query('SELECT * FROM comments WHERE id = $1',[id])
    return result.rows[0]
}

const postServiceComments = async (comment_content,author_id,post_id) => {
    const result = await pool.query(`INSERT INTO comments (comment_content, author_id, post_id) VALUES ($1,$2,$3) RETURNING *`,[comment_content,author_id,post_id])
    return result.rows[0]
}

const putServiceComments = async (comment_content,author_id,post_id,id) => {
    const result = await pool.query(`UPDATE comments
                                            SET
                                                comment_content = COALESCE($1, comment_content),
                                                author_id = COALESCE($2, author_id),
                                                post_id = COALESCE($3, post_id)
                                            WHERE id = $4
                                            RETURNING *`,[comment_content,author_id,post_id,id])
    return result.rows[0]
}
const deleteServiceComments = async (id) => {
    const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *',[id])
    return result.rows[0]
}
module.exports = {
    getServiceComments,
    getServiceCommentsId,
    postServiceComments,
    putServiceComments,
    deleteServiceComments
}