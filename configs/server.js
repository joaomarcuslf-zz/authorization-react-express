const express = require('express');
const morgan = require('morgan');
const consign = require('consign');
const bodyParser = require('body-parser');

const application = express();

application.use(express.static('./assets'));
application.use(express.static('./build'));
application.use(express.static('./'));

application.use(morgan('dev'));

application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

consign({
  logger: console,
  verbose: true,
  extensions: ['.js', '.json'],
  loggingType: 'info'
})
  .include('app/routes')
  .then('configs/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .then('app/constants')
  .then('app/helpers')
  .into(application);

application.use((request, response) => {
  let notFoundResource = {
    status: application.app.constants.httpStatus.NOT_FOUND,
    error: application.app.constants.error.NOT_FOUND_RESOURCE,
    message: application.app.constants.error.NOT_FOUND_MESSAGE
  };

  response
    .status(notFoundResource.status)
    .send(notFoundResource);
});

module.exports = application;
