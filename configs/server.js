const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const application = express();

application.use(express.static('./assets'));
application.use(express.static('./build'));
application.use(express.static('./'));

application.use(morgan('dev'));

application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

application.use(expressSession({
	secret: 'randomSecret',
	resave: false,
	saveUninitialized: false
}));

require('../app/routes/auth')(application);
require('../app/routes/home')(application);
let errorsConstants = require('../app/constants/error');
let httpStatus = require('../app/constants/httpStatus');

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
