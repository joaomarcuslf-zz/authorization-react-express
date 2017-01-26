'use strict';

const mongoose = require('mongoose');

const connMongoDB = function(){
	return mongoose.createConnection('mongodb://admin:admin@ds133358.mlab.com:33358/authorization-react-express');
}

module.exports = connMongoDB;