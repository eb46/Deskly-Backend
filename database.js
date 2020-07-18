const Pool = require('pg').Pool
const { Client } = require('pg');

let pool = ''

if (process.env.DATABASE_URL) {
  console.log('database');
    pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  pool.connect()

} else {
  console.log('posting locally');
  pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.DBNAME
  })

//   pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })
}

// console.log(pool);
module.exports = pool
