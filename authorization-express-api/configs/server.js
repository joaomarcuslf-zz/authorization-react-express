'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('../app/middlewares/allowCors');
const noIcon = require('../app/middlewares/noIcon');
const errorsConstants = require('../app/constants/error');
const httpStatus = require('../app/constants/httpStatus');

const application = express();

if (process.env.NODE_ENV !== 'test') {
  application.use(morgan('dev'));
}

application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

application.use(cors());
application.use(noIcon());

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
