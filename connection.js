const mysql = require('mysql')

const config = require('./config')

class Connection {

	constructor() {
		this._connection = null
	}

	connect() {
		this._connection = mysql.createConnection({
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.database
		})
	}

}

module.exports = new Connection()
