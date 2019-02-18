const express = require('express')

const config = require('./config')
const connection = require('./connection')

const app = express()

connection.connect()

app.listen(config.port, () => {
	console.log(`Server listening on port ${config.port}`)
})
