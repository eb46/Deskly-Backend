// Dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const session = express.Router()
const user_pool = require('../database.js')

session.post('/', async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body
    const foundUser = await user_pool.query("SELECT * FROM users WHERE user_email = $1", [user_email])

    // console.log(foundUser.rows[0].user_password);

    if(foundUser === null){
      res.json({
        message: 'Whoops! User not found.'
      })
    } else {
      const passwordMatch = await bcrypt.compareSync(user_password, foundUser.rows[0].user_password)

      // console.log(user_password);
      // console.log(foundUser.rows[0].user_password);
      // console.log(passwordMatch);
      // console.log(req.session);

      if(passwordMatch){
        req.session.user = foundUser
        res.json(req.session)
        console.log('+++++++++');
        console.log(req.session);
      } else {
        res.json({
          message: 'Blehh user not found'
        })
      }
    }
  } catch (err) {
    console.log(err);
  }
})

session.get('/', (req, res) => {
  res.json(req.session.user)
  console.log('----hi----');
})

session.delete('/', (req, res) => {
  console.log('---bye---');
  req.session.destroy(() => {
    res.json({
      destroyed: true,
    })
  })
})

module.exports = session
