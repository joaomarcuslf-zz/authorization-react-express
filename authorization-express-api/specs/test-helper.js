const chai = require('chai');

const mongo = require('mongodb');

const connMongoDB = function(){
	let db = new mongo.Db(
		'authorization-react-express-tests',
		new mongo.Server('localhost', 27017, {}),
		{}
	);

	return db;
}

module.exports = {
  expect: chai.expect,
  should: chai.should,
  assert: chai.assert,
  connection: connMongoDB
};