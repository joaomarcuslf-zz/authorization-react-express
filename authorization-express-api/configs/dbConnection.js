'use strict'

const mongo = require('mongodb');

const connMongoDB = function(){
	let db = new mongo.Db(
		'authorization-react-express',
		new mongo.Server('localhost', 27017, {}),
		{}
	);

	return db;
}

module.exports = connMongoDB;