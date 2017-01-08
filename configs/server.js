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

let errorsConstants = require('../app/constants/error');
let httpStatus = require('../app/constants/httpStatus');

application.all('/*', function(request, response, next) {
  // CORS headers
  response.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  response.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (request.method == 'OPTIONS') {
    response.status(httpStatus.SUCCESS).end();
  } else {
    next();
  }
});

application.all('/api/v1/*', [require('../app/middlewares/validateRequest')]);

require('../app/routes/auth')(application);
require('../app/routes/home')(application);

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
