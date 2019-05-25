const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.redirect('/messages'))

app.use(bodyParser.json())

app.post('/messages', (req, res) => {
  if (req.body.text) {
    console.log(req.body.text)
    res.json(req.body.text)
  } else {
    res.status(400).json({
     message: 'Bad Request'
    })
  }
})


app.listen(port, () => console.log(`Listening on port ${port}`))
