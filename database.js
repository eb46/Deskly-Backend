const Pool = require('pg')

const pool = process.env.DATABASE_URL || new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DBNAME
})

module.exports = pool
