let httpStatus = require('../constants/httpStatus');
let errorContants = require('../constants/error');

module.exports = function (request, response, next) {
	if (request.url.includes('login')) {
		next();
	} else {
		let hasToken = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['x-access-token'];

		if (hasToken) {
			next();
		} else {
			response.status(httpStatus.UNAUTHORIZED)
				.send({
						error: errorContants.NO_TOKEN,
						message: errorContants.NO_TOKEN_MESSAGE
				});
		}
	}
};