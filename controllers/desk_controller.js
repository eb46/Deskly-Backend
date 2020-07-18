// Dependencies
const express = require('express')
const desk_pool = require('../database.js')

// Configuration
const desk = express.Router()

// CREATE
desk.post('/', async (req, res) => {
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
desk.get('/', async (req, res) => {
  try {
    console.log(req);
    console.log(res);
    const allDesks = await desk_pool.query("SELECT * FROM desks")
    res.json(allDesks.rows)
  } catch (err) {
    console.log(err)
  }
})

desk.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const desk = await desk_pool.query("SELECT * FROM desks WHERE id = $1", [id])
    res.json(desk.rows[0])
  } catch (err) {
    console.log(err)
  }
})

// UPDATE
desk.put('/:id', async (req, res) => {
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
desk.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteDesk = await desk_pool.query("DELETE FROM desks WHERE id = $1 RETURNING *", [id])
    // res.json(deleteDesk.rows)
  } catch (err) {
    console.log(err)
  }
})


module.exports = desk
