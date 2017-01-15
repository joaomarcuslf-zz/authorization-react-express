'use strict';
const errorsConstants = require('../constants/error');
const httpStatus = require('../constants/httpStatus');

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
}

module.exports = new UserController();
