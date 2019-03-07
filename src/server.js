const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const config = require('./config')
const connection = require('./connection')

const registerClientHandlers = require('./handlers/client')
const registerSignInHandlers = require('./handlers/signIn')
const registerStatusHandlers = require('./handlers/status')

connection.connect()

const app = express()

app.use(cors())
app.use(cookieParser())

registerSignInHandlers(app)
registerStatusHandlers(app)
registerClientHandlers(app)	// Register wildcard client route last

app.listen(config.port, () => {
	console.log(`Server listening on port ${config.port}`)
})
