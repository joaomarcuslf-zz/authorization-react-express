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
	getUser(request, response) {
		response.status(200).send('');
	}
}

module.exports = new UserController();
