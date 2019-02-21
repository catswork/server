const express = require('express')

const config = require('./config')
const connection = require('./connection')

const registerSignInHandlers = require('./handlers/signIn')

connection.connect()

const app = express()

registerSignInHandlers(app)

app.listen(config.port, () => {
	console.log(`Server listening on port ${config.port}`)
})
