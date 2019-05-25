const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'
const client = new Client(connectionString)
const name = "James"

// Kept receiving authentication errors when using Pool. Decided to continue with Client and try to fix if time allows.

client.connect()
    .then(() => {
        console.log("Connection to Postgres established")
    })
   // .then(() => client.query('DROP TABLE person')) // remove this before final push
    .then(() => client.query('CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))'))
   .then(() => client.query('INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)', ['James', 'Smith', 'brown']))
   .then(() => client.query('INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)', ['Frank', 'Jones', 'brown']))
   .then(() => client.query('INSERT INTO person (first_name, last_name, eye_color) VALUES ($1, $2, $3)', ['Rebecca', 'Andrews', 'brown']))
   .then(() => client.query('UPDATE person SET eye_color = \'blue\''))
   .then(() => client.query('SELECT * FROM person WHERE first_name = ($1)', [name]))
   .then(res => {
      console.log(res.rows)
      return client.end()
    })
    .then(() => {
        console.log("Connection closed")
    })
    .catch(err => console.error(err))