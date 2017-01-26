'use strict';

class User {
	constructor(connection) {
    this.connection = connection();
    this.model = this.connection.model('user', {username: String,  password: String, email: String});

		this.insert = this.insert.bind(this);
		this.findUser = this.findUser.bind(this);
	}

	findUser(user) {
		let User = this;
		return new Promise(function (resolve, reject) {
			User.model.findOne(user, 'username email', function (err, result) {
				if (result && typeof result === "object") {
					resolve(result);
					return;
				}
				reject();
			});
		});
	}

	findUsers() {
		let User = this;
		return new Promise(function (resolve, reject) {
			User.model
				.find({})
				.exec(function (err, result) {
					if (result) {
						resolve(result);
						return;
					}
					reject(err);
				});
		});
	}

	update(query, user) {
		let User = this;

		return new Promise(function (resolve, reject) {
			User.model.update(query, user, function (err, data) {
				if (err) {
					reject();
					return;
				}

				resolve(data);
			});
		});
	}

	delete(query) {
		let User = this;

		return new Promise(function (resolve, reject) {
			User.model.remove(query, function (err, data) {
				if (err) {
					reject();
					return;
				}

				resolve(data);
			});
		});
	}

	insert(user) {
		let User = this;

		return new Promise(function (resolve, reject) {
			let userToSave = new User.model(user);

			userToSave.save(function (err) {
				if (err) {
					reject();
					return;
				}

				resolve(userToSave);
			});
		});
	}
}

module.exports = function (dbConnection) {
	return new User(dbConnection);
};
