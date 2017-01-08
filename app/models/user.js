class User {
	constructor(connection) {
		this.connection = connection();

		this.authorize = this.authorize.bind(this);
		this.insert = this.insert.bind(this);
		this.findUser = this.findUser.bind(this);
	}

	findUser(user, successCallback, errorCallback) {
		this.connection.open(function (err, mongoclient) {
			mongoclient.collection("users", function (err, collection) {
				collection.find(user).toArray(function (err, result) {
					let data = result[0];

					if (data && typeof data === "object") {
						successCallback(data);
						return;
					}
					errorCallback();
				});

				mongoclient.close();
			});
		});
	}

	insert(user, callback) {
		this.connection.open(function (err, mongoclient) {
			mongoclient.collection("users", function (err, collection) {
				collection.insert(user);
				callback(user);

				mongoclient.close();
			});
		});
	}

	authorize(user, successCallback, errorCallback) {
		this.findUser(
			user,
			(data) => successCallback(data),
			errorCallback
		);
	}
}

module.exports = function (dbConnection) {
	return new User(dbConnection);
};

