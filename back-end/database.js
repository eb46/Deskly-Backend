const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: process.env.DBNAME
})

module.exports = pool
