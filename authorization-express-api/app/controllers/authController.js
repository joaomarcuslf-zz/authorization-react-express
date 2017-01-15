'use strict';
const errorsConstants = require('../constants/error');
const httpStatus = require('../constants/httpStatus');
const tokenHelper = require('../helpers/tokenHelper');
const cryptHelper = require('../helpers/cryptoHelper');
const validationHelper = require('../helpers/validationHelper');

// Choosing the enviroment DB
let dbConnection;

switch (process.env.NODE_ENV) {
	case 'test':
		dbConnection = require('../../configs/dbConnection.test');
		break;
	case 'prod':
		dbConnection = require('../../configs/dbConnection.prod');
		break;
	default:
		dbConnection = require('../../configs/dbConnection.dev');
		break;
}

const userModel = require('../models/user')(dbConnection);
const moment = require('moment');

class AuthController {
	login(request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			@body:
				username
				password

			should validate se request body values then
			check if the user exists on the db
			if it exists and is valid, should generate the user token and save on server cache
			if it does not, it should notify with unauthorized
		*/

		let hasErrors = validationHelper.validateFields(
			request.body,
			[
				{ field: 'username', message: 'Username can\'t be empty' },
				{ field: 'password', message: 'Password can\'t be empty' }
			]
		);


		if (hasErrors) {
			response.status(httpStatus.BAD_REQUEST).send(hasErrors);
			return;
		}

		let login = {
			username: request.body.username,
			password: cryptHelper.generatePasswordHash(request.body.password)
		};

		function genToken(user) {
			let loggedUser = {
				username: user.username,
				expires: moment().add(7, 'days').valueOf()
			}

			let token = tokenHelper.generateToken(loggedUser);

			return {
				token: token,
				user: loggedUser
			};
		}

		function authorizeSucess(data) {
			response.status(httpStatus.SUCCESS)
				.send(genToken(data));
		}

		function authorizeError(err) {
			response.status(httpStatus.UNAUTHORIZED)
				.send({
					error: errorsConstants.UNAUTHORIZED,
					message: errorsConstants.UNAUTHORIZED_MESSAGE
				});
			return;
		}

		userModel
			.findUser(login)
			.then(authorizeSucess)
			.catch(authorizeError);
	}

	signup(request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			@body:
				username
				password
				email

			should validate se request body values then
			check if the user exists on the db
			if it exists should notify conflict user
			if it does not, should create the user
		*/

		let hasErrors = validationHelper.validateFields(
			request.body,
			[
				{ field: 'username', message: 'Username can\'t be empty' },
				{ field: 'password', message: 'Password can\'t be empty' },
				{ field: 'email', message: 'E-mail can\'t be empty' },
			]
		);


		if (hasErrors) {
			response.status(httpStatus.BAD_REQUEST).send(hasErrors);
			return;
		}

		let user = {
			'username': request.body.username,
			'password': cryptHelper.generatePasswordHash(request.body.password),
			'email': request.body.email,
			'createdDate': new Date()
		};

		function insertSuccess(data) {
			response.status(httpStatus.SUCCESS)
				.send(data);
		}

		function insertError() {
			response.status(httpStatus.CONFLICT)
				.send({
					error: errorsConstants.CONFLICT,
					message: errorsConstants.CONFLICT_MESSAGE
				});
			return;
		}

		userModel
			.findUser({ username: user.username })
			.then(insertError)
			.catch(function () {
				userModel
					.insert(user)
					.then(insertSuccess);
			});
	}
}

module.exports = new AuthController();
