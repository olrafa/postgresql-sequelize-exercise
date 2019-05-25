const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

app.use(bodyParser.json())

// model
const Movies = sequelize.define(
  'movies', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    field: 'year_of_release'
  },
  synopsis: {
    type: Sequelize.STRING
  }
})

// read all movies (the entire collections resource)
app.get('/movies', function (req, res, next) {
  const limit = req.query.limit || 20
  const offset = req.query.offset || 0

  Movies.findAll({ limit, offset })
  .then(res.json('Complete list of movies'))
  .catch(error => next(error))
})

// read a single movie resource
app.get('/movies/:id', function (req, res, next) {
  const id = req.params.id
  res.json(`Movie ${id}`)

})

// update a single movie resource
app.put('/movies/:id', function (req, res) {
  const id = req.params.id
  res.json({ message: `Update movie ${id}` })
})

// delete a single movie resource
app.delete('/movies/:id', function (req, res) {
  const id = req.params.id
  res.json({ message: `Delete movie ${id}` })
})

// create a new movie resource
app.post('/movies', (req, res, next) => {
  const movie = {
    title: req.body.title,
    yearOfRelease: req.body.yearOfRelease,
    synopsis: req.body.synopsis
  }
  Movies
    .create(movie)
    .then(movie => res.status(201).json(movie))
    .catch(error => next(error))
})


app.listen(5432, () => {
  console.log('Web server listening on port 5432')
})