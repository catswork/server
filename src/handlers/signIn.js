const config = require('../config')
const Google = require('../Google')
const Error = require('../Error')
const Users = require('../services/Users')

const AUTHORIZATION_URL = Google.getAuthorizationUrl(config.google.clientId, config.google.redirectUri, config.google.scope, true)

function registerSignInHandlers(app) {
	app.get('/sign-in', (_, response) => {
		response.redirect(AUTHORIZATION_URL)
	})

	app.get('/auth', (request, response) => {
		if (request.query.error || !request.query.code) {
			response.redirect('/error')
		}
		else {
			let accessToken, refreshToken, email
			Google.exchangeCode(request.query.code, config.google.clientId, config.google.clientSecret, config.google.redirectUri)
				.then((data) => {
					accessToken = data.access_token
					refreshToken = data.refresh_token

					return Google.getUserInfo(accessToken)
				})
				.then((data) => {
					email = data.email

					return Users.getUserIdByEmail(data.email)
						.then((id) => {
							return Users.updateUserTokens(id, accessToken, refreshToken).then(() => id)
						})
						.catch((error) => {
							if (error === Error.CONNECTION_NO_RESULT) {
								return Users.createUser(email, accessToken, refreshToken).then((id) => id)
							}
							else {
								throw error
							}
						})
				})
				.then((id) => {
					console.log(id, email)

					response.redirect('/')
				})
				.catch((error) => {
					console.log(error)

					response.redirect('/error')
				})
		}
	})
}

module.exports = registerSignInHandlers
