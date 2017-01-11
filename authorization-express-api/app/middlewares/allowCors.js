module.exports = function () {
	'use strict';

	return function (request, response, next) {
		// Allow CORS middleware
		response.header("Access-Control-Allow-Origin", "*");
		response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

		next();
	}
};