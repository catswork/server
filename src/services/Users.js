const connection = require('../connection')

class Users {

	static getUserById(id) {
		return connection.querySingleRow('select * from users where id=?', [id])
	}

	static getUserByEmail(email) {
		return connection.querySingleRow('select * from users where email=?', [email])
	}

	static getUserIdByEmail(email) {
		return connection.querySingleRow('select id from users where email=?', [email]).then(row => row.id)
	}

	static createUser(email, accessToken, refreshToken) {
		return connection.query('insert into users (email, access_token, refresh_token) values (?, ?, ?)', [email, accessToken, refreshToken]).then(rows => rows.insertId)
	}

	static updateUserTokens(id, accessToken, refreshToken = undefined) {
		let query = 'update users set access_token=?'
		let values = [accessToken]
		if (refreshToken) {
			query += ', refresh_token=?'
			values.push(refreshToken)
		}
		query += ' where id=?'
		values.push(id)

		return connection.query(query, values)
	}

}

module.exports = Users
