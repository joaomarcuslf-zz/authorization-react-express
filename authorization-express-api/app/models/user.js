'use strict';

class User {
	constructor(connection) {
		this.connection = connection();

		this.insert = this.insert.bind(this);
		this.findUser = this.findUser.bind(this);
	}

	findUser(user) {
		let User = this;
		return new Promise(function (resolve, reject) {
			User.connection.open(function (err, mongoclient) {
				mongoclient.collection("users", function (err, collection) {
					collection.find(user).toArray(function (err, result) {
						if (result) {
							let data = result[0];

							if (data && typeof data === "object") {
								resolve(data);
								return;
							}
						}
						reject();
					});

					mongoclient.close();
				});
			});
		});
	}

	findUsers() {
		let User = this;
		return new Promise(function (resolve, reject) {
			User.connection.open(function (err, mongoclient) {
				mongoclient.collection("users", function (err, collection) {
					collection.find({}).toArray(function (err, result) {
						if (result) {
							resolve(result);
							return;
						}
						reject(err);
					});

					mongoclient.close();
				});
			});
		});
	}

	update(query, user) {
		let User = this;

		return new Promise(function (resolve, reject) {
			User.connection.open(function (err, mongoclient) {
				mongoclient.collection("users", function (err, collection) {
					collection.update(query, user, function (err, data) {
						if (err) {
							reject();
							return;
						}

						resolve(data);
					});

					mongoclient.close();
				});
			});
		});
	}

	delete(query) {
		let User = this;

		return new Promise(function (resolve, reject) {
			User.connection.open(function (err, mongoclient) {
				mongoclient.collection("users", function (err, collection) {
					collection.remove(query, {
						justOne: true
					}, function (err, data) {
						if (err) {
							reject();
							return;
						}

						resolve(data);
					});

					mongoclient.close();
				});
			});
		});
	}

	insert(user) {
		let User = this;

		return new Promise(function (resolve, reject) {
			User.connection.open(function (err, mongoclient) {
				mongoclient.collection("users", function (err, collection) {
					if (err) {
						reject();
						return;
					}
					collection.insert(user);
					resolve(user);

					mongoclient.close();
				});
			});
		});
	}
}

module.exports = function (dbConnection) {
	return new User(dbConnection);
};
