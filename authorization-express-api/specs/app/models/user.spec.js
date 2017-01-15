const expect = require('../../test-helper').expect;
const connection = require('../../test-helper').connection;

const userRaw = require('../../../app/models/user');
const user = userRaw(connection);
let mockedUsers = [
	{ username: 'mock0',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock1',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock2',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock3',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock4',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock5',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock6',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock7',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock8',  password: 'mock', email: 'mock@mock.mock' },
	{ username: 'mock9',  password: 'mock', email: 'mock@mock.mock' }
];

describe('User', function () {
	before(function (done) {
		connection().open(function (err, mongoclient) {
			mongoclient.collection("users", function (err, collection) {
				collection.insert(mockedUsers);

				mongoclient.close();
				done();
			});
		});
	});

	after(function (done) {
		connection().open(function (err, mongoclient) {
			mongoclient.collection("users", function (err, collection) {
				collection.remove({});

				mongoclient.close();
				done();
			});
		});
	});

	describe('findUser', function () {
		it('should return an promise', function () {
			this.timeout(3000);
			let result = user.findUser({});

			expect(typeof result.then).to.be.equal('function');
		});

		it('should fetch the requested user(test 1)', function (done) {
			this.timeout(3000);
			let username = 'mock0';
			user
				.findUser({ username: username })
				.then(function (data) {
					expect(data.username).to.be.equal(username);
					done();
				});
		});

		it('should fetch the requested user(test 2)', function (done) {
			this.timeout(3000);
			let username = 'mock1';
			user
				.findUser({ username: username })
				.then(function (data) {
					expect(data.username).to.be.equal(username);
					done();
				});
		});

		it('should fetch the requested user(test 3)', function (done) {
			this.timeout(3000);
			let username = 'mock2';
			user
				.findUser({ username: username })
				.then(function (data) {
					expect(data.username).to.be.equal(username);
					done();
				});
		});

		it('should reject for not found user', function (done) {
			this.timeout(3000);
			let username = 'mock10';
			user
				.findUser({ username: username })
				.then(function (data) { })
				.catch(function (data) {
					expect(typeof data).to.be.equal('undefined');
					done();
				});
		});
	});

	describe('insert', function () {
		it('should return an promise', function () {
			this.timeout(3000);
			let result = user.insert({});

			expect(typeof result.then).to.be.equal('function');
		});

		it('should insert succesfully an document(test 1)', function (done) {
			this.timeout(3000);
			let username = 'mock11';

			user
				.insert({ username: username })
				.then(function (data) {
					user
						.findUser({ username: username })
						.then(function (data) {
							expect(data.username).to.be.equal(username);
							done();
						});
				});
		});

		it('should insert succesfully an document(test 2)', function (done) {
			this.timeout(3000);
			let username = 'mock12';
			let expectedResult = mockedUsers.length + 3;

			user
				.insert({ username: username })
				.then(function (data) {
					connection().open(function (err, mongoclient) {
						mongoclient.collection("users", function (err, collection) {
							collection.find({}).toArray(function (err, result) {
								expect(result.length).to.be.equal(expectedResult);
								done();
							});

							mongoclient.close();
						});
					});
				});
			});
		});
	});