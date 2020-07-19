// Dependencies
const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()

// Configuration
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin:['https://deskly.herokuapp.com/'],
  methods:['GET', 'POST', 'DELETE', 'PUT']
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(session({
  secret:process.env.SECRET,
  resave: true,
  saveUninitialized: false
}))


app.get('/', (req, res) => {
  res.send('cool desk app' + PORT)
})

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

const routes = [];
app._router.stack.forEach(middleware => {
  if (middleware.route) {
    routes.push(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
  }
});
console.log(JSON.stringify(routes, null, 2));
