/**
 * The entry file to start up the server
 */

const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
// The port on which the application is exposed / the API is accessible
const port = process.env.PORT || 3000

// Mise en place du swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const options = require("./swagger_options");
const specs = swaggerJsdoc(options.options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

const db = require('./dbClient')
// Log redis database errors
db.on("error", (err) => {
  console.error(err)
})

// Parse incoming HTTP requests to a usable request object
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// define the 'Home' route
app.get('/', (req, res) => res.send('Hello World!'))
// define the user router
app.use('/user', userRouter)

// Tell the server to listen to inbound requests from the configured port
const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server
