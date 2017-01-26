'use strict';

const mongoose = require('mongoose');

const connMongoDB = function(){
  return mongoose.createConnection('mongodb://localhost:27017/authorization-react-express-tests');
}
module.exports = connMongoDB;
