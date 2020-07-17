const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DBNAME
})

module.exports = pool
