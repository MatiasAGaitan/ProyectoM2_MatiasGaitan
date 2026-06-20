const pool = require('../db/config')

const getServicePosts = async () => {
    const result = await pool.query('SELECT * FROM posts')
    return result.rows
}

module.exports = {
    getServicePosts
}