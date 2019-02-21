
const config = {
	port: 7777,
	database: {
		host: 'localhost',
		user: 'root',
		password: 'xyzzyy',
		database: 'cats_work'
	},
	google: {
		clientId: '1053854177742-e4vl19j6llb1um1c3587p2g53g12cg9s.apps.googleusercontent.com',
		clientSecret: '4Qsy55wMCS5ldFFE3vu7fw-N',
		redirectUri: 'http://localhost:7777/auth',
		scope: 'email profile'
	}
}

module.exports = config
