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
						let data = result[0];

						if (data && typeof data === "object") {
							resolve(data);
							return;
						}
						reject();
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
