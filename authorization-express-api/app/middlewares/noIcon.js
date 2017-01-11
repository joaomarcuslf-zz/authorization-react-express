module.exports = function () {
	'use strict';

	return function (request, response, next) {
		if (request.url === '/favicon.ico') {
			// No favicon middleware
			response.writeHead(
				200,
				{ 'Content-Type': 'image/x-icon' }
			);

			response.end('');
		} else {
			next();
		}
	}
}