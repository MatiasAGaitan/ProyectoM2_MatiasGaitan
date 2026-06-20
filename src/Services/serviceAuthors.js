const pool = require('../db/config')

const getServiceAuthors = async () => {
    const result = await pool.query('SELECT * FROM authors')
    return result.rows
}

const getServiceAuthorId = async (id) => {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1',[id])
    return result.rows[0]
}

const postServiceAuthor = async(name,email,bio) => {
    const result = await pool.query(`INSERT INTO authors (name, email, bio) VALUES($1,$2,$3) RETURNING * `,[name, email, bio])
    return result.rows[0]
}

const putServiceAuthor = async(id,name,email,bio) => {
    const result = await pool.query(`
        UPDATE authors
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            bio = COALESCE($3, bio)
        WHERE id = $4
        RETURNING *`,[name,email,bio,id])

    return result.rows[0]
}

const deleteServiceAuthor = async(id) => {
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING * ',[id])
    return result.rows[0]
}

module.exports = {
    getServiceAuthors,
    getServiceAuthorId,
    postServiceAuthor,
    putServiceAuthor,
    deleteServiceAuthor
}

