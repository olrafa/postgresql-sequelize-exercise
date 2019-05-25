const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {define: { timestamps: false }})

app.use(bodyParser.json())

// model
const Movies = sequelize.define('movies', {
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

Movies.sync()

// read all movies (the entire collections resource)
app.get('/movies', (req, res, next) => {
  const limit = req.query.limit || 10
  const offset = req.query.offset || 0

  Movies.findAll({ limit, offset })
  .then(movies => {
    res.json({ movies: movies })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err
    })
  })
})

// read a single movie resource
app.get('/movies/:id', (req, res, next) => {
  const id = req.params.id
  Movies.findByPk(id)
  .then(movie => {
    res.json({ movie: movie })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err
    })
  })
})

// update a single movie resource
app.put('/movies/:id', (req, res) => {
  const id = req.params.id
  res.json({ message: `Update movie ${id}` })
})

// delete a single movie resource
app.delete('/movies/:id', (req, res) => {
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


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})