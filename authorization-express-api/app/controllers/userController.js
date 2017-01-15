'use strict';
const errorsConstants = require('../constants/error');
const httpStatus = require('../constants/httpStatus');
const cryptHelper = require('../helpers/cryptoHelper');

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

class UserController {
	getUsers(request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			@body:

			should get all users
		*/

		function fetchSuccess(data) {
			// Remove password
			let filteredData = data.map(function (elm) {
				return {
					_id: elm._id,
					username: elm.username,
					email: elm.email,
					createdDate: elm.createdDate
				};
			});

			response.status(httpStatus.SUCCESS)
				.send(filteredData);
		}

		function fetchError() {
			response.status(httpStatus.NOT_FOUND)
				.send({
					error: errorsConstants.NOT_FOUND_RESOURCE,
					message: errorsConstants.NOT_FOUND_MESSAGE
				});
			return;
		}

		userModel
			.findUsers()
			.then(fetchSuccess)
			.catch(fetchError);
	}

	getUserByUsername(request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			@URL:
				username: string
			@body:

			should get the user based on username
		*/

		function fetchSuccess(data) {
			// Remove password
			let filteredData = {
				_id: data._id,
				username: data.username,
				email: data.email,
				createdDate: data.createdDate
			};

			response.status(httpStatus.SUCCESS)
				.send(filteredData);
		}

		function fetchError() {
			response.status(httpStatus.NOT_FOUND)
				.send({
					error: errorsConstants.NOT_FOUND_RESOURCE,
					message: errorsConstants.NOT_FOUND_MESSAGE
				});
			return;
		}

		let username = request.params.username;

		userModel
			.findUser({ username: username })
			.then(fetchSuccess)
			.catch(fetchError);
	}

	updateUserByUsername(request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			@URL:
				username: string
			@body:

			should update the user based on username
		*/

		let username = request.params.username;

		if (request.user.username !== username) {
			response.status(httpStatus.UNAUTHORIZED)
				.send({
					error: errorsConstants.UNAUTHORIZED,
					message: errorsConstants.UNAUTHORIZED_MESSAGE
				});
			return;
		}

		function updateSuccess(data) {
			// Remove password
			let filteredData = {
				_id: data._id,
				username: data.username,
				email: data.email,
				createdDate: data.createdDate
			};

			response.status(httpStatus.SUCCESS)
				.send(filteredData);
		}

		function updateError() {
			response.status(httpStatus.NOT_FOUND)
				.send({
					error: errorsConstants.NOT_FOUND_RESOURCE,
					message: errorsConstants.NOT_FOUND_MESSAGE
				});
			return;
		}

		userModel
			.findUser({ username: username })
			.then(function (user) {
				let query = { username: username };
				let updatedUser = {
					username: username,
					password: (request.body.password) ? cryptHelper.generatePasswordHash(request.body.password) : user.username,
					createdDate: user.createdDate,
					email: (request.body.email) ? request.body.email : user.email,
				}

				userModel
					.update(query, updatedUser)
					.then(updateSuccess)
					.catch(updateError);
			})
			.catch(updateError);
	}

	deleteUserByUsername(request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			@URL:
				username: string
			@body:

			should delete the user based on username
		*/

		let username = request.params.username;

		if (request.user.username !== username) {
			response.status(httpStatus.UNAUTHORIZED)
				.send({
					error: errorsConstants.UNAUTHORIZED,
					message: errorsConstants.UNAUTHORIZED_MESSAGE
				});
			return;
		}

		function deleteSuccess(data) {
			response.status(httpStatus.SUCCESS)
				.send({});
		}

		function deleteError() {
			response.status(httpStatus.NOT_FOUND)
				.send({
					error: errorsConstants.NOT_FOUND_RESOURCE,
					message: errorsConstants.NOT_FOUND_MESSAGE
				});
			return;
		}

		userModel
			.findUser({ username: username })
			.then(function (user) {
				let query = { username: username };
				userModel
					.delete(query)
					.then(deleteSuccess)
					.catch(deleteError);
			})
			.catch(deleteError);
	}
}

module.exports = new UserController();
