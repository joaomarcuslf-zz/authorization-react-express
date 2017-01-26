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

describe('auth routes', function () {
	describe('POST /api/v1/login', function() {
		describe('with invalid body request', function () {
			it('should have content type json', function(done) {
				request(app)
					.post('/api/v1/login')
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 400 for no body', function(done) {
				request(app)
					.post('/api/v1/login')
					.expect('Content-Type', /json/)
					.expect(400)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 1)', function(done) {
				request(app)
					.post('/api/v1/login')
					.expect([
						{
							"field": "username",
							"message": "Username can't be empty"
						},
						{
							"field": "password",
							"message": "Password can't be empty"
						}
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 2)', function(done) {
				request(app)
					.post('/api/v1/login')
					.send({ "username": "mock0" })
					.expect([
						{
							"field": "password",
							"message": "Password can't be empty"
						}
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 3)', function(done) {
				request(app)
					.post('/api/v1/login')
					.send({ "password": "mock0" })
					.expect([
						{
							"field": "username",
							"message": "Username can't be empty"
						}
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});
		});

		describe('with valid body but not registered', function () {
			it('should have content type json', function(done) {
				request(app)
					.post('/api/v1/login')
					.send({ "username": "mock0", "password": "mock0" })
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 401 UNAUTHORIZED user', function(done) {
				request(app)
					.post('/api/v1/login')
					.send({ "username": "mock0", "password": "mock0" })
					.expect('Content-Type', /json/)
					.expect(401)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});
		});

		describe('with valid body and registered', function () {
			beforeEach(function (done) {
				let conn = connection();
				let User = conn.model('user', {username: String,  password: String, email: String});
				let userToSave = new User(userMocked);

				userToSave.save(done);
			});

			afterEach(function (done) {
				let conn = connection();
				conn.model('user', {username: String,  password: String, email: String}).remove(userMocked, done);
			});

			it('should have content type json', function(done) {
				request(app)
					.post('/api/v1/login')
					.send({ "username": "mock0", "password": "mock0" })
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 200 if user is valid', function(done) {
				request(app)
					.post('/api/v1/login')
					.send({ "username": "mock0", "password": "mock0" })
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function (err, res) {
						if (err) return done(err);
						done();
					});
			});
		});
	});

	describe('POST /api/v1/signup', function () {
		describe('with invalid body request', function () {
			it('should have content type json', function(done) {
				request(app)
					.post('/api/v1/signup')
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 400 for no body', function(done) {
				request(app)
					.post('/api/v1/signup')
					.expect('Content-Type', /json/)
					.expect(400)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 1)', function(done) {
				request(app)
					.post('/api/v1/signup')
					.expect([
						{ "field": "username", "message": "Username can't be empty" },
						{ "field": "password", "message": "Password can't be empty" },
						{ field: 'email', message: 'E-mail can\'t be empty' }
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 2)', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ "username": "mock0" })
					.expect([
						{ "field": "password", "message": "Password can't be empty" },
						{ field: 'email', message: 'E-mail can\'t be empty' }
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 3)', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ "password": "mock0" })
					.expect([
						{ "field": "username", "message": "Username can't be empty" },
						{ field: 'email', message: 'E-mail can\'t be empty' }
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send and body describing the empty field(test 4)', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ "email": "mock0" })
					.expect([
						{ "field": "username", "message": "Username can't be empty" },
						{ "field": "password", "message": "Password can't be empty" }
					])
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});
		});

		describe('valid body but conflict user', function () {
			beforeEach(function (done) {
				let conn = connection();
				let User = conn.model('user', {username: String,  password: String, email: String});
				let userToSave = new User(userMocked);

				userToSave.save(done);
			});

			afterEach(function (done) {
				let conn = connection();
				conn.model('user', {username: String,  password: String, email: String}).remove(userMocked, done);
			});

			it('should have content type json', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ username: 'mock0', password: 'mock0', email: 'mock@mock.mock' })
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 409 for CONFLICT user', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ username: 'mock0', password: 'mock0', email: 'mock@mock.mock' })
					.expect('Content-Type', /json/)
					.expect(409)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});
		});

		describe('valid body and new user', function () {
			beforeEach(function (done) {
				let conn = connection();
				conn.model('user', {username: String,  password: String, email: String}).remove(userMocked, done);
			});

			it('should have content type json', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ username: 'mock0', password: 'mock0', email: 'mock@mock.mock' })
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});

			it('should send status 200 for SUCCESS user', function(done) {
				request(app)
					.post('/api/v1/signup')
					.send({ username: 'mock0', password: 'mock0', email: 'mock@mock.mock' })
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {
						if (err) return done(err);
						done();
					});
			});
		});
	});
});