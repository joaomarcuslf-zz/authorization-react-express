'use strict';
let httpStatus = require('../constants/httpStatus');
let errorContants = require('../constants/error');
let tokenHelper = require('../helpers/tokenHelper');
let moment = require('moment');


module.exports = function (request, response, next) {
	let token = request.headers['x-access-token'];

	if (!token) {
		response
			.status(httpStatus.UNAUTHORIZED)
			.send({
					error: errorContants.NO_TOKEN,
					message: errorContants.NO_TOKEN_MESSAGE
			});
		return;
	}

	try {
		let decodedUser = tokenHelper.getTokenData(token);
		let isExpired = moment(decodedUser.expires).isBefore(new Date());

		if (isExpired) {
			response
				.status(httpStatus.UNAUTHORIZED)
				.send({
						error: errorContants.EXPIRED_TOKEN,
						message: errorContants.EXPIRED_TOKEN_MESSAGE
				});
			return;
		} else {
			next();
		}

	} catch (err) {
		response
			.status(httpStatus.UNAUTHORIZED)
			.send({
					error: errorContants.NO_TOKEN,
					message: errorContants.NO_TOKEN_MESSAGE
			});
	}
};