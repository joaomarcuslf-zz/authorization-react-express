process.env.NODE_ENV = 'test';

const expect = require('../../test-helper').expect;
const request = require('../../test-helper').request;
const connection = require('../../test-helper').connection;
const CryptoHelper = require('../../../app/helpers/cryptoHelper');

let userMocked = {
	username: 'mock0',
	password: CryptoHelper.generatePasswordHash('mock0'),
	email: 'mock@mock.mock'
};

const app = require('../../../configs/server');

describe('user routes', function () {
	describe('ALL /api/v1/user*', function () {
		let url = '/api/v1/user';
		describe('with no token', function () {
			it('should have content type json', function (done) {
				request(app)
					.get(url)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 401 for UNAUTHORIZED user', function (done) {
				request(app)
					.get(url)
					.expect(401)
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send error body', function (done) {
				request(app)
					.get(url)
					.expect({
						"error": "ERROR: NO TOKEN FOUND",
						"message": "User client has no token"
					})
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});
		});

		describe('with expired token', function () {
			let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwaXJlcyI6MTQ4MzgwNDEzNjY3MX0.iDdIKpaTnb9Z27uv5mw1LFu9gsBtV2oLlfFHb805arw';
			it('should have content type json', function (done) {
				request(app)
					.get(url)
					.set('x-access-token', token)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 401 for UNAUTHORIZED user', function (done) {
				request(app)
					.get(url)
					.set('x-access-token', token)
					.expect(401)
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send error body', function (done) {
				request(app)
					.get(url)
					.set('x-access-token', token)
					.expect({
						"error": "ERROR: TOKEN EXPIRED",
						"message": "The token has expired"
					})
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});
		});
	});
});