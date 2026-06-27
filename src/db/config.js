const { loadEnvFile } = require('node:process')
const {Pool} = require('pg')

if (process.env.NODE_ENV !== 'production') {
    loadEnvFile('.env')
}

const useDatabaseUrl = process.env.NODE_ENV === 'production' && process.env.DATABASE_URL

const poolConfig = useDatabaseUrl
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }

const pool = new Pool(poolConfig)

module.exports = pool
