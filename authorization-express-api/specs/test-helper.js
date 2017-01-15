const chai = require('chai');
const request = require('supertest')

const connMongoDB = require('../configs/dbConnection.test');

module.exports = {
  expect: chai.expect,
  should: chai.should,
  assert: chai.assert,
	connection: connMongoDB,
	request: request
};