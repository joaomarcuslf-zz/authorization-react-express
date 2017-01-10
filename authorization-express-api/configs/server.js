"use strict"
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const application = express();

application.use(express.static('./assets'));
application.use(express.static('./build'));
application.use(express.static('./'));

application.use(morgan('dev'));

application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

let errorsConstants = require('../app/constants/error');
let httpStatus = require('../app/constants/httpStatus');

application.use(function (request, response, next) {
  // Allow CORS middleware
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

application.use(function (request, response, next) {
  if (request.url === '/favicon.ico') {
    // No favicon middleware
    response.writeHead(
      httpStatus.SUCCESS,
      { 'Content-Type': 'image/x-icon' }
    );

    response.end('');
  } else {
    next();
  }
});

require('../app/routes/auth')(
  'api',
  'v1',
  application
);

application.use((request, response) => {
  let notFoundResource = {
    status: httpStatus.NOT_FOUND,
    error: errorsConstants.NOT_FOUND_RESOURCE,
    message: errorsConstants.NOT_FOUND_MESSAGE
  };

  response
    .status(notFoundResource.status)
    .send(notFoundResource);
});

module.exports = application;
