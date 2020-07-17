// Dependencies
const express = require('express')
const cors = require('cors')
const desk_pool = require('../database.js')

// Configuration
const app = express()
const desk = express.Router()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


// Routes

// CREATE
desk.post('/desks', async (req, res) => {
  try {
    const { username, image } = req.body
    const newDesk = await desk_pool.query("INSERT INTO desks (username, image) VALUES($1, $2) RETURNING *",
    [username, image])
    res.json(newDesk.rows)
  } catch (err) {
    console.log(err)
  }
})

// READ
desk.get('/desks', async (req, res) => {
  try {
    const allDesks = await desk_pool.query("SELECT * FROM desks")
    res.json(allDesks.rows)
  } catch (err) {
    console.log(err)
  }
})

desk.get('/desks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const desk = await desk_pool.query("SELECT * FROM desks WHERE id = $1", [id])
    res.json(desk.rows[0])
  } catch (err) {
    console.log(err)
  }
})

// UPDATE
desk.put('/desks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { username, image } = req.body
    const updateDesk = await desk_pool.query(
      "UPDATE desks SET username = $1, image = $2 WHERE id = $3 RETURNING *",
      [username, image, id]
    )
    console.log(desk.rows)
    res.json(updateDesk.rows)
  } catch (err) {
    console.log(err)
  }
})

// DELETE
desk.delete('/desks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteDesk = await desk_pool.query("DELETE FROM desks WHERE id = $1 RETURNING *", [id])
    // res.json(deleteDesk.rows)
  } catch (err) {
    console.log(err)
  }
})


module.exports = desk
