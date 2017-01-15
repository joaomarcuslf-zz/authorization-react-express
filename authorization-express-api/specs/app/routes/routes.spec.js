process.env.NODE_ENV = 'test';

const expect = require('../../test-helper').expect;
const request = require('../../test-helper').request;

const app = require('../../../configs/server');

describe('routes middlewares', function () {
	describe('CORS Headers', function () {
		it('should have the cors headers', function (done) {
			request(app)
				.get('/api/v1/')
				.expect('Content-Type', /json/)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
				.expect('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});
	});

	describe('No favicon for API', function () {
		it('should send empty content but with success', function (done) {
			request(app)
				.get('/favicon.ico')
				.expect('Content-Type', 'image/x-icon')
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Not found resource', function () {
		it('should send empty content but with success', function (done) {
			request(app)
				.get('/api/v1/')
				.expect(404)
				.end(function (err, res) {
					if (err) return done(err);
					done();
				});
		});
	});
});