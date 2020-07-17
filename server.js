// Dependencies
const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()

// Configuration
const app = express()
const PORT = 5000 || process.env.PORT

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(session({
  secret:process.env.SECRET,
  resave: true,
  saveUninitialized: false
}))

// Controllers
const deskController = require('./controllers/desk_controller.js')
app.use('/desks', deskController)

const usersController = require('./controllers/users_controller.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)


app.listen(PORT, () => {
  console.log(`server has started on ${PORT}!`);
})
